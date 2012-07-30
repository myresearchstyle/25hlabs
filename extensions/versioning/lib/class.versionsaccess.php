<?php

require_once CORE . '/class.cacheable.php';
require_once CORE . '/class.datetimeobj.php';

class VersionsAccess extends Cacheable
{

    const STAGE_UNSTAGED = -1;
    const STAGE_STAGED = 0;
    const STATE_DRAFT = 0;
    const STATE_LIVE = 1;


    /**
     * __construct
     *
     * @param MySQL $Database
     * @access public
     * @return void
     */
    public function __construct(MySQL $Database)
    {
        $this->Database = $Database;
    }

    /**
     * createVersion
     *
     * @param Entry $entry
     * @param mixed $fields
     * @param mixed $deleted
     * @final
     * @access public
     * @return void
     */
    final public function createVersion(Entry &$entry, $deleted = false)
    {
        $entry_id = $entry->get('id');
        $unstate = "UPDATE `tbl_versions` SET `verstate` = '0' WHERE `entry_id` = {$entry_id} AND `verstate` = '1'";

        if ($deleted) {
            $this->Database->query($unstate);
            return $this->Database->query("UPDATE `tbl_versions` SET `deleted` = '1' WHERE `entry_id` = {$entry_id}");
        }

        $version = $this->Database->fetchRow(0,
            "SELECT SQL_NO_CACHE `version` FROM `tbl_versions` WHERE `entry_id` = {$entry_id} AND `deleted` = '0' ORDER BY `tstamp` DESC LIMIT 1"
        );

        $version = (int)$version['version'];
        $version++;
        $version = array(
            'hash'          => $this->getVersionsHash($entry),
            'entry_id'      => $entry_id,
            'section_id'    => $entry->get('section_id'),
            'author_id'     => $entry->get('author_id'),
            'blame'         => Symphony::Engine()->Author->get('id'),
            'version'       => $version,
            'revision'      => 0,
            'verstate'      => 1,
            'verstage'      => 0,
            'tstamp'        => strtotime($entry->get('creation_date')),
            'deleted'       => !$deleted ? 0 : 1
        );

        $this->Database->query($unstate);
        $this->Database->insert($version, 'tbl_versions');
        $data = array(
            'hash'         => $version['hash'],
            'data'         => $this->compressData(json_encode($entry->getData())),
        );
        $this->Database->insert($data, 'tbl_versions_data');
        return true;
    }

    /**
     * deleteVersion
     *
     * @param Entry $entry
     * @final
     * @access public
     * @return void
     */
    final public function deleteVersion(Entry &$entry)
    {
        return $this->createVersion($entry, true);
    }

    /**
     * postRestoreFromTrash
     *
     * @param Entry $entry
     * @param mixed $currentId
     * @param mixed $oldId
     * @access public
     * @return void
     */
    public function postRestoreFromTrash(Entry &$entry, $currentId, $oldId)
    {
        $fields = $entry->getData();
        $leftJoin = array();
        $set = array();
        $set[] = " SET `tbl_entries`.id = {$oldId}";

        foreach ($fields as $field_id => $f) {
            $dataTable = "`tbl_entries_data_{$field_id}`";
            $leftJoin[] = "LEFT JOIN {$dataTable} ON (`tbl_entries`.id = {$dataTable}.entry_id)";
            $set[] = "{$dataTable}.entry_id = {$oldId}";
        }

        try {
            $this->Database->query("UPDATE `tbl_entries` " . implode(' ', $leftJoin) . implode(', ', $set) . " WHERE `tbl_entries`.id = {$currentId}");
        } catch (Exception $e) {
            return false;
        }
        return true;
    }


    /**
     * restoreVersion
     *
     * @param mixed $hash
     * @param Entry $entry
     * @access public
     * @return void
     */
    public function restoreVersion($hash, Entry &$entry, $preview = false, $fromTrashes = false)
    {
        $version = $this->read($hash);

        $current_author = &Symphony::Engine()->Author;

        if (empty($version)) {
            return false;
        }

        if (isset($versions['blame']) && !$current_author->isDeveloper() && (int)$current_author->get('id') !== (int)$versions['blame']) {
            return false;
        }

        //!$preview && $entry->set('id', $version['entry_id']);
        //!$fromTrashes && $entry->set('id', $version['entry_id']);
        $entry->set('id', $version['entry_id']);
        $entry->set('author_id', $version['author_id']);
        $entry->set('section_id', $version['section_id']);
        $entry->set('creation_date', DateTimeObj::get('Y-m-d H:i:s', $version['tstamp']));
        $entry->set('creation_date_gmt', DateTimeObj::getGMT('Y-m-d H:i:s', $version['tstamp']));
        $entry->creationDate = DateTimeObj::get('c', $entry->get('creation_date'));
        $entry->findDefaultData();
        foreach($version['data'] as $field_id => $value) {
            if (!is_null($entry->getData($field_id))) {
                $entry->setData($field_id, $value);
            }
        }

        //$entry_id = (!$preview || $fromTrashes)? $entry->get('id') : $version['entry_id'];
        $entry_id = $version['entry_id'];
        if (!$preview && $fromTrashes) {
            $this->Database->query(
                "UPDATE `tbl_versions` SET `deleted` = 0 WHERE `entry_id` = {$entry_id}"
            );
        }

        if (!$preview) {
            $this->Database->query(
                "UPDATE `tbl_versions` SET `verstate` = 0 WHERE `entry_id` = {$entry_id} AND `verstate` = 1"
            );
            $this->Database->query(
                "UPDATE `tbl_versions` SET `verstate` = 1 WHERE `hash` = '{$hash}' LIMIT 1"
            );
        }
        return true;
    }

    /**
     * getLastVersion
     *
     * @param Entry $entry
     * @access public
     * @return void
     */
    public function getLastVersion(Entry $entry)
    {
        $entry_id = $entry->get('id');
    }

    public function getVersionsHash(Entry $entry)
    {
        return md5(strtotime($entry->get('creation_date')) . (string)$entry->get('id') . (string)$entry->get('author_id'));
    }

    public function write($hash, $data, $ttl = null)
    {

       // if(!Mutex::acquire($hash, 2, TMP)) return false;

       // $creation = time();
       // $expiry = null;

       // $ttl = intval($ttl);
       // if($ttl > 0) $expiry = $creation + ($ttl * 60);

       // if(!$data = $this->compressData($data)) return false;

       // $this->forceExpiry($hash);
       // $this->Database->insert(array('hash' => $hash, 'creation' => $creation, 'expiry' => $expiry, 'data' => $data), 'tbl_versions');

       // Mutex::release($hash, TMP);

        // return true;
        return false;
    }

    public function check($hash){

      //  if($c = $this->Database->fetchRow(0, "SELECT SQL_NO_CACHE * FROM `tbl_cache` WHERE `hash` = '$hash' AND (`expiry` IS NULL OR UNIX_TIMESTAMP() <= `expiry`) LIMIT 1")){
      //      if(!$c['data'] = $this->decompressData($c['data'])){
      //          $this->forceExpiry($hash);
      //          return false;
      //      }

      //      return $c;

      //  }

      //  $this->clean();
        return false;
    }

    public function read($hash, $index = false)
    {
        $leftJoin = !$index ? ", `vd`.data FROM `tbl_versions` AS `v` LEFT JOIN `tbl_versions_data` AS `vd` ON (v.hash = vd.hash) " : " FROM `tbl_versions` AS `v` ";
        $entry = $this->Database->fetchRow(0,
            "SELECT SQL_CACHE `v`.*{$leftJoin} WHERE `v`.hash = '{$hash}'"
        );
        if (!$index && isset($entry['data'])) {
            $entry['data'] = json_decode($this->decompressData($entry['data']), true);
        }
        return $entry;
    }

    /**
     * Given the hash of a cacheable object, remove it from `tbl_cache`
     * regardless of if it has expired or not.
     *
     * @param string $hash
     *  The hash of the Cached object, as defined by the user
     */
    public function forceExpiry($hash){
        return false;
    }

    /**
     * Removes all cache objects from `tbl_cache` that have expired.
     * After removing, the function uses the optimise function
     *
     * @see core.Cacheable#optimise()
     */
    public function clean($where = 'WHERE v.deleted = 1')
    {
        $this->Database->query("DELETE `v`.*, `vd`.* FROM `tbl_versions` AS v LEFT JOIN `tbl_versions_data` AS vd ON (v.hash = vd.hash) {$where}");
        $this->__optimise();

        return true;
    }

    /**
     * Runs a MySQL OPTIMIZE query on `tbl_cache`
     */
    private function __optimise(){
        $this->Database->query('OPTIMIZE TABLE `tbl_versions`, `tbl_versions_data`');
    }


    public function listVersions($section_id = null, $entry_id = null, $order = 'blame', $dir = 'DESC')
    {
        $select = "SELECT SQL_CACHE * FROM `tbl_versions`";
        $sort = " ORDER BY `{$order}` {$dir}";

        if (!is_null($section_id) && !is_null($entry_id)) {
            $where = " WHERE `section_id` = {$section_id} AND `entry_id` = {$entry_id} AND `deleted` = 0";
        } elseif (!is_null($section_id) && is_null($entry_id)) {
            $where = " WHERE `section_id` = {$section_id} AND `deleted` = 0";
        } elseif (is_null($section_id) && !is_null($entry_id)) {
            $where = " WHERE `entry_id` = {$entry_id} AND `deleted` = 0" ;
        } else {
            $where = " WHERE `deleted` = 0";
        }

        $data = $this->Database->fetch($select . $where . $sort);

        $table = $this->createDataList($data);
        unset($data);
        return $table;
    }

    public function listTrashes($section_id, $includedata = false, $by = 'entry_id', $dir = 'DESC')
    {
        $data = $this->Database->fetch(
            "SELECT SQL_CACHE v.*, vd.data FROM `tbl_versions` AS `v` " . (!$includedata ? '' :
            "LEFT JOIN `tbl_versions_data` AS `vd` ON (v.hash = vd.hash) " ) .
            "WHERE v.tstamp IN (SELECT MAX(tstamp) FROM sym_versions AS `vt` WHERE vt.deleted = 1 GROUP BY vt.entry_id) ORDER BY {$by} {$dir}"
        );
        $table = $this->createDataList($data);
        return $table;
    }


    private function createDataList(array &$data)
    {
        $table = array(
            'section' => array()
        );

        foreach($data as $version) {
            $eid = $version['entry_id'];
            $sid = $version['section_id'];

            $table['section'][$sid] = is_array($table['section'][$sid]) ? $table['section'][$sid] : array('entries' => array());
            $entries = &$table['section'][$sid]['entries'];
            $entries[$eid] = is_array($entries[$eid]) ? $entries[$eid] : array();

            if (isset($version['data'])) {
                $version['data'] = json_decode($this->decompressData($version['data']), true);
            }
            $entries[$eid][] = $version;
        }

        return $table;
    }
    private function createTrashesDataList(array &$data)
    {
        $table = array(
            'section' => array()
        );

        //var_dump($data);

        foreach($data as $version) {
            $eid = $version['entry_id'];
            $sid = $version['section_id'];

            $table['section'][$sid] = is_array($table['section'][$sid]) ? $table['section'][$sid] : array('entries' => array());
            $entries = &$table['section'][$sid]['entries'];
            $entries[$eid] = is_array($entries[$eid]) ? $entries[$eid] : array();
            $entries[$eid][] = $version;
        }

        return $table;
    }
}

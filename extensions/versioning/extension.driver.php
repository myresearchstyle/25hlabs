<?php
/*
vim: et:ts=4:sw=4:sts=4
*/
require_once EXTENSIONS . '/versioning/lib/class.versionsaccess.php';

/**
 * extension_versioning
 *
 * @uses Extension
 * @package Extension
 * @version 1
 * @author Thomas Appel <mail@thomas-appel.com>
 * @license GNU Public License {@link http://opensource.org/licenses/gpl-3.0.html}
 */
class extension_versioning extends Extension
{


    private function cantSetVersions($section_id = null)
    {
        $ms = null;
        if (class_exists('extension_Members')) {
            $ms = extension_Members::getMembersSection();
        }
        return (int)$ms == (int)$section_id;
    }

    public function __construct()
    {
        parent::__construct();
        $this->_driver = new VersionsAccess(Symphony::Database());
    }


    public function getSubscribedDelegates()
    {
        return array(
            array(
                'page' => '/publish/new/',
                'delegate' => 'EntryPostCreate',
                'callback' => 'createVersion'
            ),
            array(
                'page' => '/publish/edit/',
                'delegate' => 'EntryPostEdit',
                'callback' => 'createVersion'
            ),
            array(
                'page' => '/frontend/',
                'delegate' => 'EventPostSaveFilter',
                'callback' => 'createVersion'
            ),
            array(
                'page' => '/publish/',
                'delegate' => 'EntryPreDelete',
                'callback' => 'deleteVersion'
            ),
			array(
				'page' => '/backend/',
				'delegate' => 'AdminPagePreGenerate',
				'callback' => 'appendVersionDrawer'
            ),
			array(
				'page' => '/blueprints/sections/',
				'delegate' => 'SectionPreDelete',
				'callback' => 'deleteUnrecoveralbleVersions'
            )


        );
    }

    public function uninstall()
    {
        Symphony::Database()->query("DROP TABLE `tbl_versions`");
        Symphony::Database()->query("DROP TABLE `tbl_versions_data`");
    }

    public function install()
    {
        Symphony::Database()->query(
            "CREATE TABLE IF NOT EXISTS `tbl_versions` (
                `id` int(11) unsigned NOT NULL auto_increment,
                `hash` varchar(32) NOT NULL,
                `entry_id` int(11) NOT NULL,
                `section_id` int(11) NOT NULL,
                `author_id` int(11) NOT NULL,
                `blame` int(11) NOT NULL,
                `revision` int(11) NOT NULL,
                `version` int(11) NOT NULL,
                `verstate` int(11) NOT NULL default '-1',
                `verstage` int(11) NOT NULL default '0',
                `tstamp` int(14) NOT NULL,
                `deleted` tinyint(1) default '0',
                PRIMARY KEY (`id`),
                KEY `hash` (`hash`)
            ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"
        );
        Symphony::Database()->query(
            "CREATE TABLE IF NOT EXISTS `tbl_versions_data` (
                `id` int(11) unsigned NOT NULL auto_increment,
                `hash` varchar(32) NOT NULL,
                `data` longtext,
                PRIMARY KEY (`id`),
                KEY `hash` (`hash`)
            ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"
        );
        return true;
    }

    /**
     * createVersion
     *
     * @param mixed $context
     * @access public
     * @return void
     */
    public function createVersion(&$context)
    {
        $entry = &$context['entry'];
        $fields = $context['fields'];

        if ($this->cantSetVersions($entry->get('section_id'))) {
            return false;
        };
        $post = $_POST['action']['save'];
        if (is_array($post) && isset($post['createversion'])) {
            $this->_driver->createVersion($entry);
            return true;
        }
        return false;
    }

    /**
     * deleteVersion
     *
     * @param mixed $context
     * @access public
     * @return void
     */
    public function deleteVersion(&$context)
    {
        $ids = $context['entry_id'];

        foreach($ids as $entry_id) {
            $entry = EntryManager::fetch($entry_id);
            $entry = $entry[0];
            $this->_driver->deleteVersion($entry);
        }
    }

    /**
     * appendVersionDrawer
     *
     * @param mixed $context
     * @access public
     * @return void
     */
    public function appendVersionDrawer(&$context)
    {
        $callback = Symphony::Engine()->getPageCallback();

        if (($callback['driver'] == 'version' || $callback['driver'] == 'recycler')) {
            Symphony::Engine()->Page->addStylesheetToHead(URL . '/extensions/versioning/assets/css/symphony.versioning.css', 'screen', 100, false);
        }

        if (($callback['driver'] == 'publish' && $callback['context']['page'] != 'index' && $callback['context']['page'] != 'new')) {

            $section_id = SectionManager::fetchIDFromHandle($callback['context']['section_handle']);
            $entry_id = isset($callback['context']['entry_id']) ? $callback['context']['entry_id'] : null;

            $drawer = self::buildVersionsDrawer($this->_driver, $context['oPage'], $section_id, $entry_id);
        }
        if (($callback['driver'] == 'publish' && $callback['context']['page'] == 'index')) {
            $section_id = SectionManager::fetchIDFromHandle($callback['context']['section_handle']);
            $drawer = self::buildVersionsDrawer($this->_driver, $context['oPage'], $section_id, null, null, true);
        }

        if (($callback['driver'] == 'publish' && $callback['context']['page'] != 'index')) {
            $page = $context['oPage'];

            $save_and_createversion = Widget::Input('action[save][createversion]', __('Save And Create New Version'), 'submit', array());
            $div_action = $this->getChildrenWithClass($page->Form, 'div', 'actions');
            $div_action->appendChild($save_and_createversion);
        }

    }

    /**
     * buildVersionsDrawer
     *
     * @param VersionsAccess $driver
     * @param AdministrationPage $page
     * @param mixed $section_id
     * @param mixed $entry_id
     * @static
     * @access public
     * @return void
     */
    public static function buildVersionsDrawer(VersionsAccess &$driver, AdministrationPage &$page, $section_id = null, $entry_id = null, $preview = null, $trashes = false)
    {

        $sort = isset($_GET['versort']) ? $_GET['versort'] : 'version';
        $order = isset($_GET['verorder']) ? $_GET['verorder'] : 'DESC';

        $data = !$trashes ? $driver->listVersions($section_id, $entry_id, $sort, $order) : $driver->listTrashes($section_id, true, $sort, $order);
        $data = $data['section'][$section_id]['entries'];

        if (!$data) return false;

        $tableRows = !$trashes ?
            array('version' => 'version', 'date' => 'tstamp', 'author' => 'blame', 'state' => 'verstate') :
            array('entry' => 'entry_id', 'date' => 'tstamp', 'author' => 'blame', 'state' => 'deleted');

        $tableHeadContent = array();

        foreach ($tableRows as $key => $row) {
            if ($trashes && $key == 'state') {
                $anchor = ucfirst(__($key));
            } else {
                $anchor = Widget::Anchor('<span>' . ucfirst(__($key)) . '</span>', '?versort=' . $row . '&verorder=' . ($order == 'ASC' ? 'DESC' : 'ASC'), null, $sort == $row ? 'active' : null);
            }
            $tableHeadContent[] = array(
                $anchor, 'col', array('class' => 'field-input')
            );
        }

        $tableHeadContent[] = array(__('Actions'), 'col', array('class' => 'field-input'));
        $tableHead = Widget::TableHead($tableHeadContent);
        $tableData = new XMLElement('div');

        $tr = array();

        if ($trashes) {
            $field = self::getFirstFieldFromSectionId($section_id);
        }

        $preview_url = SYMPHONY_URL . '/extension/versioning/' . (!$trashes ? 'version' : 'recycler') . '/preview/%s/';

        $stateKey = !$trashes ? 'verstate' : 'deleted';
        foreach ($data as $d) {
            foreach ($d as $version) {
                $td = array();
                $td[] = new XMLElement('td', !$trashes ? $version['version'] : self::getEntryDisplayNameFromSectionId($version['section_id'], $version['data'][$field->get('id')], $field));
                $td[] = new XMLElement('td', DateTimeObj::get('d M Y - H:i:s (P) '));
                $td[] = new XMLElement('td', AuthorManager::fetchByID($version['blame'])->getFullName());
                $td[] = new XMLElement('td', __(self::getEntryState($version, $stateKey)));
                $td[] = new XMLElement('td', (int)$version['verstate'] == 0 ?
                    Widget::Anchor(__('preview'), sprintf($preview_url, $version['hash'])) : '---');

                $tRow = Widget::TableRow($td);

                if ($version['hash'] == (string)$preview) {
                    $tRow->addClass('previewed');
                }
                if ((int)$version['verstate'] == 1) {
                    $tRow->addClass('selected active');
                }
                $tr[] = $tRow;
            }
        }

        $table = Widget::Table($tableHead, Widget::TableBody($tr), $tableData);
        $drawer = Widget::Drawer('test', !$trashes ? __('Versions') : __('Deleted Entries'), $table);
        $page->insertDrawer($drawer, 'horizontal', 'append');
    }

    /**
     * getEntryState
     *
     * @param mixed $data
     * @param mixed $key
     * @static
     * @access private
     * @return void
     */
    private static function getEntryState($data, $key)
    {
        $state;
        switch ($key) {
        case 'deleted':
            $state = 'deleted';
           break;
        case 'verstate':
            switch ($data[$key]) {
            case 1: $state = 'active';
               break;
            case 0: $state = 'archived';
               break;
            }
        break;
        }
        return $state;
    }

    /**
     * getFirstFieldFromSectionId
     *
     * @param mixed $section_id
     * @static
     * @access public
     * @return void
     */
    public static function getFirstFieldFromSectionId($section_id)
    {
        $section = SectionManager::fetch($section_id);
        $fields = $section->fetchFields();
        $fid  = array_keys($fields);
        $field = $fields[$fid[0]];
        return $field;
    }

    /**
     * getEntryDisplayNameFromSectionId
     *
     * @param mixed $section_id
     * @param mixed $field_data
     * @param Field $field
     * @static
     * @access public
     * @return void
     */
    public static function getEntryDisplayNameFromSectionId($section_id, $field_data, Field &$field = null)
    {
        if (is_null($field)) {
            $field = self::getFirstFieldFromSectionId();
        }
        $name = $field->prepareTableValue($field_data);
        return $name;
    }

    /**
     * deleteUnrecoveralbleVersions
     *
     * @param mixed $context
     * @access public
     * @return void
     */
    public function deleteUnrecoveralbleVersions(&$context)
    {
        if (sizeof($context['section_ids']) > 1) {
            $where = 'WHERE ';
            $ands = array();
            foreach($context['section_ids'] as $section_id) {
                $ands[] = 'v.section_id =' . $section_id;
            }
            $where .= implode(' AND ', $ands);
        } else {
           $where = 'WHERE v.section_id = ' . $context['section_ids'][0];
        }
        return $this->_driver->clean($where);
    }

    /**
     * @see https://github.com/Solutions-Nitriques/save_and_return/blob/master/extension.driver.php#getChildrenWithClass()
     */
    private function getChildrenWithClass($rootElement, $tagName, $className) {
        if (! ($rootElement) instanceof XMLElement) {
            return NULL; // not and XMLElement
        }

        // contains the right css class and the right node name
        if (strpos($rootElement->getAttribute('class'), $className) > -1 && $rootElement->getName() == $tagName) {
            return $rootElement;
        }

        // recursive search in child elements
        foreach ($rootElement->getChildren() as $child) {
            $res = $this->getChildrenWithClass($child, $tagName, $className);

            if ($res != NULL) {
                return $res;
            }
        }

        return NULL;
    }
}

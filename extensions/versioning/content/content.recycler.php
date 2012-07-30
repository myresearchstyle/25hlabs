<?php
/*
vim: et:ts=4:sw=4:sts=4
*/
require_once EXTENSIONS . '/versioning/content/content.version.php';

/**
 * ContentExtensionVersioningRecycler
 *
 * @uses ContentExtensionVersioningVersion
 * @package Content
 * @version 1
 * @author Thomas Appel <mail@thomas-appel.com>
 * @license GNU Public License {@link http://opensource.org/licenses/gpl-3.0.html}
 */
class ContentExtensionVersioningRecycler extends ContentExtensionVersioningVersion
{

    const BASE_URL = '/extension/versioning/recycler/';

    public function __construct(){
        $this->_name = __('Recycler');
        parent::__construct();
    }


    /**
     * __actionDelete
     *
     * @access public
     * @return void
     */
    public function __actionDelete()
    {
        $this->setEntry(true);
        $hash = $this->_hash;
        $redirectURL = $this->getEntryUrl($this->_section);
        if ($this->_driver->_driver->clean("WHERE v.hash = '{$hash}' AND v.deleted = 1")) {
            $this->_state = self::DELETE_STATE_OK;
        } else {
            $this->_state = self::DELETE_STATE_ERROR;
        }

        if ($this->_state == self::DELETE_STATE_OK) {
            redirect($redirectURL);
        }
        if ($this->_state == self::DELETE_STATE_ERROR) {
            $this->pageAlert(sprintf(__('Error while deleting recycled entry %s'), $this->_hash), Alert::ERROR);
        }
    }

    public function __actionDeleteall()
    {
        $this->setEntry(true);
        $entry_id = $this->_entry->get('id');
        $section_id = $this->_section->get('id');
        $redirectURL = $this->getEntryUrl($this->_section);
        if ($this->_driver->_driver->clean("WHERE v.section_id = {$section_id} AND v.deleted = 1")) {
            $this->_state = self::DELETE_STATE_OK;
        } else {
            $this->_state = self::DELETE_STATE_ERROR;
        }

        if ($this->_state == self::DELETE_STATE_OK) {
            redirect($redirectURL);
        }
        if ($this->_state == self::DELETE_STATE_ERROR) {
            $this->pageAlert(sprintf(__('Error while deleting recycled entries form %s'), $section_id), Alert::ERROR);
        }
    }

    /**
     * __actionRestore
     *
     * @access public
     * @return void
     */
    public function __actionRestore()
    {
        if (isset($_POST['action']['delete'])) {
            return $this->__actionDelete();
        }
        if (isset($_POST['action']['deleteall'])) {
            return $this->__actionDeleteall();
        }

        $this->setEntry(false);
        $prev_entry_id = $this->_entry->get('id');
        $this->_entry->set('id', null);
        if (!$this->_entry->commit()) {
            $this->_entry->set('id', $prev_entry_id);
            $this->_state = self::RESTORE_STATE_ERROR;
        } else {
            if (!$this->_driver->_driver->postRestoreFromTrash($this->_entry, $this->_entry->get('id'), $prev_entry_id)) {
                $this->_state = self::RESTORE_STATE_ERROR;
            } else {
                $this->_state = self::RESTORE_STATE_OK;
            }
        }
        if ($this->_state == self::RESTORE_STATE_ERROR) {
            $this->pageAlert(sprintf(__('%s cannot be restored'), $this->_hash), Alert::ERROR);
        }
        if ($this->_state == self::RESTORE_STATE_OK) {
            $this->pageAlert(sprintf(__('deleted entry %s successfully restored'), $this->_hash), Alert::SUCCESS);
        }
    }
    public function __viewPreview()
    {
        parent::__viewPreview();
        $this->Form->setAttribute('action', SYMPHONY_URL . self::BASE_URL . 'restore/'. $this->_hash .'/');
    }

    /**
     * appendVersionsDrawer
     *
     * @access public
     * @return void
     */
    public function appendVersionsDrawer()
    {
        $this->_driver->buildVersionsDrawer($this->_driver->_driver, $this, $this->_entry->get('section_id'), $this->_entry->get('id'), $this->_hash, true);
    }

    /**
     * buildToPreviousViewButton
     *
     * @access public
     * @return void
     */
    public function buildToPreviousViewButton()
    {
       return Widget::Anchor(__('Back to Section'), SYMPHONY_URL . '/publish/' . $this->_section->get('handle'). '/', __('return to section'), 'button action-back');
    }

    /**
     * checkContextIsValid
     *
     * @access private
     * @return void
     */
    private function checkContextIsValid()
    {
        $context = $this->getContext();
        if (empty($context) || sizeof($context) < 2 || !self::isValidMd5($context[1]))
        {
           Administration::instance()->errorPageNotFound();
        }
        return true;
    }

    /**
     * getVersions
     *
     * @param mixed $section_id
     * @access public
     * @return void
     */
    public function getVersions($section_id)
    {
        return $this->_driver->_driver->listTrashes($section_id);
    }

    /**
     * getRestoredVersion
     *
     * @param mixed $preview
     * @access public
     * @return void
     */
    public function getRestoredVersion($preview)
    {
        return $this->_driver->_driver->restoreVersion($this->_hash, $this->_entry, $preview, true);
    }

    /**
     * getEntryUrl
     *
     * @param Section $section
     * @param Entry $entry
     * @access public
     * @return void
     */
    public function getEntryUrl(Section $section, Entry $entry = null)
    {
        $suffix = '';
        if (!is_null($entry)) {
           $suffix =  '/edit/' . $entry->get('id');
        }
        return SYMPHONY_URL . '/publish/' . $section->get('handle') . $suffix . '/';
    }

    public function buildDeleteButtons(&$divAction)
    {
        if ($this->_state == self::RESTORE_STATE_PREVIEW) {
            $divAction->appendChild(Widget::Input('action[restore]',__('Restore Version'), 'submit'));
            $divAction->appendChild(new XMLElement('button', __('Delete Entry'), array(
                'class' => 'button confirm delete',
                'type' => 'submit',
                'name' => 'action[delete]'
            )));

            $divAction->appendChild(new XMLElement('button', __('Delete All Entries'), array(
                'class' => 'button confirm delete all',
                'type' => 'submit',
                'name' => 'action[deleteall]'
            )));
        }
    }
}


<?php
/*
vim: et:ts=4:sw=4:sts=4
*/
require_once TOOLKIT . '/class.administrationpage.php';
require_once TOOLKIT . '/class.entrymanager.php';
require_once TOOLKIT . '/class.sectionmanager.php';
require_once TOOLKIT . '/class.fieldmanager.php';


/**
 * ContentExtensionVersioningVersion
 *
 * @uses AdministrationPage
 * @package Content
 * @version 1
 * @author Thomas Appel <mail@thomas-appel.com>
 * @license GNU Public License {@link http://opensource.org/licenses/gpl-3.0.html}
 */
class ContentExtensionVersioningVersion extends AdministrationPage
{

    /**
     * The relative URL of this page witout the hash identifyer
     * @var string
     */
    const BASE_URL = '/extension/versioning/version/';

    /**
     * The desired result when restoring an entry from versions cache
     * @var integer
     */
    const RESTORE_STATE_OK = 100;

    /**
     * The default value for previewing this entry without restoring
     * @var integer
     */
    const RESTORE_STATE_PREVIEW = 200;

    /**
     * Statevalue when there was an error restoring the enry
     * @var integer
     */
    const RESTORE_STATE_ERROR = 400;

    /**
     * The desired result when deleting an entry from versions cache
     * @var integer
     */
    const DELETE_STATE_OK = 150;

    /**
     * Statevalue when there was an error deleting an archived enry
     * @var integer
     */
    const DELETE_STATE_ERROR = 450;

    const HANDLE = 'version';

    const HANDLES = 'versions';

    /**
     * _uri
     *
     * the pages url without the hashidentifier
     *
     * @var String
     * @access protected
     */
    protected $_uri = null;

    /**
     * _hash
     *
     * the versions hash identifier
     *
     * @var String
     * @access protected
     */
    protected $_hash = null;

    /**
     * _driver
     *
     * Extension instance
     *
     * @var Extension object
     * @access protected
     */
    protected $_driver = null;

    /**
     * _name
     *
     * The basename for this page
     *
     * @var string
     * @access protected
     */
    protected $_name = null;

    /**
     * _entry
     *
     * the entry to be previewed/restoored
     *
     * @var Entry object
     * @access protected
     */
    /**
     * _entry
     *
     * @var mixed
     * @access protected
     */
    protected $_entry = null;

    /**
     * _entryData
     *
     * @var mixed
     * @access protected
     */
    protected $_entryData = null;

    /**
     * _section
     *
     * the entries' section
     *
     * @var Section object
     * @access protected
     */
    protected $_section = null;

    /**
     * _state
     *
     * the current restorestate;
     * @var mixed
     * @access protected
     */
    protected $_state = null;

    /**
     * __construct
     *
     * Class constructor
     *
     * sets _name and _driver properties and calls parent class constructor
     *
     * @access public
     * @return void
     */
    public function __construct(){
        $this->_name = __('Versioning');
        $this->_driver = Symphony::ExtensionManager()->create('versioning');
        parent::__construct();
    }

    /**
     * @see toolkit.AdministrationPage#build()
     */
    public function build($context)
    {
        $this->_context = $context;
        $this->checkContextIsValid();
        $this->_uri = self::BASE_URL . $this->_context[0] . '/';
        $this->_hash = !isset($_POST['fields']['hash']) ? $this->_context[1] : $_POST['fields']['hash'];
        $this->_state = self::RESTORE_STATE_PREVIEW;

        if (!isset($_POST['action'])) {
           $this->setEntry();
        }
        parent::build($context);
    }


    /**
     * __viewRestore
     *
     * @access public
     * @return void
     */
    public function __viewRestore()
    {
        return $this->__viewPreview();
    }

    /**
     * __viewPreview
     *
     * @access public
     * @return void
     */
    public function __viewPreview()
    {
        $this->checkContextIsValid();
        $this->setTitle(sprintf('Symphony &ndash; %s %s', $this->_name, $this->_context[1]));
        $this->setPageType('single');
        $this->_buildForm($this->Form, $this->_hash);

        $first_field_ids = array_keys($this->_entry->getData());
        $first_field = FieldManager::fetch($first_field_ids[0]);
        $display_name = sprintf($first_field->prepareTableValue($this->_entry->getData($first_field_ids[0])) . ' (%s)', $this->_context[1]);
        $this->insertBreadcrumbs(array(Widget::Anchor(__(ucfirst($this->_context[0])), SYMPHONY_URL . $this->_uri . $this->_hash . '/')));
        $this->appendSubheading($display_name, $this->buildToPreviousViewButton());
        $this->appendVersionsDrawer();

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
        $redirectURL = $this->getEntryUrl($this->_section, $this->_entry);

        Symphony::ExtensionManager()->notifyMembers('EntryVersionPreDelete', '/extension/versioning/', array('context' => &$this->_context, 'entry' => &$this->_entry));

        if ($this->_driver->_driver->clean("WHERE v.hash = '{$hash}'")) {
            Symphony::ExtensionManager()->notifyMembers('EntryVersionPostDelete', '/extension/versioning/', array('context' => &$this->_context, 'entry' => &$this->_entry));
            $this->_state = self::DELETE_STATE_OK;
            redirect($redirectURL);
        } else {
            $this->_state = self::DELETE_STATE_ERROR;
        }
        if ($this->_state == self::DELETE_STATE_ERROR) {
            $this->pageAlert(sprintf(__('Error while deleting archived entry version %s'), $this->_hash), Alert::ERROR);
        }
    }

    /**
     * __actionDeleteall
     *
     * @access public
     * @return void
     */
    public function __actionDeleteall()
    {
        $this->setEntry(true);
        Symphony::ExtensionManager()->notifyMembers('EntryVersionPreDeleteAll', '/extension/versioning/', array('context' => &$this->_context, 'entry' => &$this->_entry));
        $entry_id = $this->_entry->get('id');
        $redirectURL = $this->getEntryUrl($this->_section, $this->_entry);
        if ($this->_driver->_driver->clean('WHERE v.entry_id = ' . $entry_id)) {
            Symphony::ExtensionManager()->notifyMembers('EntryVersionPostDeleteAll', '/extension/versioning/', array('context' => &$this->_context, 'entry' => &$this->_entry));
            $this->_state = self::DELETE_STATE_OK;
        } else {
            $this->_state = self::DELETE_STATE_ERROR;
        }
        if ($this->_state == self::DELETE_STATE_OK) {
            redirect($redirectURL);
        }
        if ($this->_state == self::DELETE_STATE_ERROR) {
            $this->pageAlert(sprintf(__('Error while archived entry version %s'), $this->_entry->get('id')), Alert::ERROR);
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
        Symphony::ExtensionManager()->notifyMembers('EntryVersionPreRestore', '/extension/versioning/', array('context' => &$this->_context, 'entry' => &$this->_entry));
        if (!$this->_entry->commit()) {
            $this->_state = self::RESTORE_STATE_ERROR;
        } else {
            $this->_state = self::RESTORE_STATE_OK;
			Symphony::ExtensionManager()->notifyMembers('EntryVersionPostRestore', '/extension/versioning/', array('context' => &$this->_context, 'entry' => &$this->_entry));
        }

        if ($this->_state == self::RESTORE_STATE_OK) {
            $this->pageAlert(sprintf(__('Version %s successfully restored'), $this->_hash), Alert::SUCCESS);
        }

        if ($this->_state == self::RESTORE_STATE_ERROR) {
            $this->pageAlert(sprintf(__('Error while restoring %s'), $this->_hash), Alert::ERROR);
        }
    }

    /**
     * getEntryUrl
     *
     * @param Section $section
     * @param Entry $entry
     * @access public
     * @return void
     */
    public function getEntryUrl(Section $section, Entry $entry)
    {
        return SYMPHONY_URL . '/publish/' . $section->get('handle') . '/edit/' . $entry->get('id') . '/';
    }

    /**
     * appendVersionsDrawer
     *
     * @access public
     * @return void
     */
    public function appendVersionsDrawer()
    {
        $this->_driver->buildVersionsDrawer($this->_driver->_driver, $this, $this->_entry->get('section_id'), $this->_entry->get('id'), $this->_hash);
    }

    /**
     * buildToPreviousViewButton
     *
     * @access public
     * @return void
     */
    public function buildToPreviousViewButton()
    {
       return Widget::Anchor(__('Back to Entry'), $this->getEntryUrl($this->_section, $this->_entry), __('return to entry'), 'button action-back');
    }

    /**
     * _buildForm
     *
     * @param XMLElement $wrapper
     * @param mixed $hash
     * @access private
     * @return void
     */
    private function _buildForm(XMLElement &$wrapper, $hash)
    {
        $this->Form->addClass('two columns');
        $this->Form->setAttribute('action', SYMPHONY_URL . self::BASE_URL . 'restore/'. $hash .'/');

        $mainFields = array_keys($this->_section->fetchFields(null, 'main'));
        $sidebarFields = array_keys($this->_section->fetchFields(null, 'sidebar'));

        $fieldPrimaray = array();
        $fieldSeconday = array();

        $primary = sizeof($mainFields) > 0 ? new XMLElement('fieldset', null, array('class' => 'column primary')) : null;
        $sidebar = sizeof($sidebarFields) > 0 ? new XMLElement('fieldset', null, array('class' => 'column secondary')) : null;

        foreach($this->_entry->getData() as $field_id => $data) {
            $field = FieldManager::Fetch($field_id);

			$div = new XMLElement('div', NULL, array('id' => 'field-' . $field->get('id'), 'class' => 'field field-'.$field->handle().($field->get('required') == 'yes' ? ' required' : '')));
            $field->displayPublishPanel($div, $data, null, null, null, $field->get('id'));
            $input = $this->findInput($div);
            if ($input) {
                $input->setAttribute('readonly', 'readonly');
            }

            if (in_array($field->get('id'), $mainFields)) {
                $fieldPrimaray[] = $div;
            }

            if (in_array($field->get('id'), $sidebarFields)) {
                $fieldSeconday[] = $div;
            }
        }

        if ($primary) {
            $primary->appendChildArray($fieldPrimaray);
            $this->Form->appendChild($primary);
        }

        if ($sidebar) {
            $sidebar->appendChildArray($fieldSeconday);
            $this->Form->appendChild($sidebar);
        }

        $hashField = Widget::Input('fields[hash]', $hash, 'hidden');
        $divAction = new XMLElement('div', $hashField->generate(), array('class' => 'actions'));

        $this->buildDeleteButtons($divAction);

        $wrapper->appendChild($divAction);
    }

    public function buildDeleteButtons(&$divAction)
    {
        if ($this->_state == self::RESTORE_STATE_PREVIEW) {
            $divAction->appendChild(Widget::Input('action[restore]',__('Restore Version'), 'submit'));
            $divAction->appendChild(new XMLElement('button', __('Delete' . ucfirst(self::HANDLE)), array(
                'class' => 'button confirm delete',
                'type' => 'submit',
                'name' => 'action[delete]'
            )));

            $divAction->appendChild(new XMLElement('button', __('Delete All ' . ucfirst(self::HANDLES)), array(
                'class' => 'button confirm delete all',
                'type' => 'submit',
                'name' => 'action[deleteall]'
            )));
        }
    }

    /**
     * buildField
     *
     * @param Entry $entry
     * @param XMLElement $wraper
     * @access public
     * @return void
     */
    public function buildField(Entry $entry, XMLElement &$wraper)
    {

    }

    /**
     * isValidMd5
     *
     * @param mixed $md5
     * @static
     * @access public
     * @return void
     */
    public static function isValidMd5($md5)
    {
        return !empty($md5) && preg_match('/^[a-f0-9]{32}$/', $md5);
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
          // Administration::instance()->errorPageNotFound();
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
        return $this->_driver->_driver->listVersions();
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
        return $this->_driver->_driver->restoreVersion($this->_hash, $this->_entry, $preview);
    }

    /**
     * setEntry
     *
     * @param mixed $preview
     * @access private
     * @return void
     */
    protected function setEntry($preview = true)
    {
        $this->_entry = EntryManager::create();

        if (!$this->getRestoredVersion($preview)) {
            Administration::instance()->errorPageNotFound();
        }

        $this->_section = SectionManager::fetch($this->_entry->get('section_id'));
        $fields = $this->_section->fetchFields();
    }

    /**
     * findInput
     *
     * @param XMLElement $div
     * @param mixed $found
     * @access private
     * @return void
     */
    private function findInput(XMLElement &$div, &$found = null)
    {
        $children = $div->getChildren();
        foreach($children as $node) {
            if ($node->getName() == 'input' || $node->getName() == 'textarea' || $node->getName() == 'select') {
                $found = $node;
                break;
            } else {
                $node = $this->findInput($node, $found);
            }
        }
        return $found;
    }

}

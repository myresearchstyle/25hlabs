<?php

	Class extension_epiceditor extends Extension {
	
		public function getSubscribedDelegates() {
		
			return array(array('page'     => '/backend/',
			                   'delegate' => 'InitaliseAdminPageHead',
			                   'callback' => 'initaliseAdminPageHead'));
		}
		
		public function initaliseAdminPageHead($context) {
		
			$page = Administration::instance()->Page;
			
			// only on publish pages

			if ($page instanceOf contentPublish) {
			
				// which are showing new/edit form
				
				$callback = Administration::instance()->getPageCallback();
				
				if (in_array($callback['context']['page'], array('new', 'edit'))) {

					Administration::instance()->Page->addScriptToHead(URL . '/extensions/epiceditor/lib/EpicEditor/epiceditor.js', null, false);
					Administration::instance()->Page->addScriptToHead(URL . '/extensions/epiceditor/assets/epiceditor.publish.js', null, false);					
				}
			}
		}
	}
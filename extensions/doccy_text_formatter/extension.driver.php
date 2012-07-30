<?php

	/**
	 * @package doccy_text_formatter
	 */

	/**
	 * A text formatter for Doccy, the lightweight markup language for technical writing.
	 */
	class Extension_Doccy_Text_Formatter extends Extension {
		public function getSubscribedDelegates() {
			return array(
				array(
					'page' => '/backend/',
					'delegate' => 'InitaliseAdminPageHead',
					'callback' => 'initaliseAdminPageHead'
				)
			);
		}

		public function initaliseAdminPageHead($context) {
			$page = Administration::instance()->Page;
			$page->addScriptToHead(URL . '/extensions/doccy_text_formatter/snicked/assets/jquery.snicked.js');
			$page->addScriptToHead(URL . '/extensions/doccy_text_formatter/snicked/assets/snicked.doccy.js');
			$page->addScriptToHead(URL . '/extensions/doccy_text_formatter/assets/publish.js');
		}
	}
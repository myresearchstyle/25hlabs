<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcenavigation extends NavigationDatasource{

		public $dsParamROOTELEMENT = 'navigation';
		public $dsParamORDER = 'asc';
		public $dsParamREDIRECTONEMPTY = 'no';
		

		

		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Navigation',
				'author' => array(
					'name' => 'Ovidiu Spatacian-Tarnu',
					'website' => 'http://localhost/25hlabs',
					'email' => 'me@ovidiust.com'),
				'version' => 'Symphony 2.3',
				'release-date' => '2012-07-11T18:20:21+00:00'
			);
		}

		public function getSource(){
			return 'navigation';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

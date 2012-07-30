<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcekeywords extends SectionDatasource{

		public $dsParamROOTELEMENT = 'keywords';
		public $dsParamORDER = 'asc';
		public $dsParamPAGINATERESULTS = 'no';
		public $dsParamLIMIT = '20';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamSORT = 'keyword';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'yes';
		

		public $dsParamFILTERS = array(
				'59' => '{$category}',
		);
		

		public $dsParamINCLUDEDELEMENTS = array(
				'keyword',
				'category'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Keywords',
				'author' => array(
					'name' => 'Ovidiu Spatacian-Tarnu',
					'website' => 'http://localhost/25hlabs',
					'email' => 'me@ovidiust.com'),
				'version' => 'Symphony 2.3',
				'release-date' => '2012-07-11T13:57:01+00:00'
			);
		}

		public function getSource(){
			return '12';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

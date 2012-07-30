<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcecategory extends SectionDatasource{

		public $dsParamROOTELEMENT = 'category';
		public $dsParamORDER = 'desc';
		public $dsParamPAGINATERESULTS = 'yes';
		public $dsParamLIMIT = '1';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamREQUIREDPARAM = '$category';
		public $dsParamPARAMOUTPUT = array(
				'category'
		);
		public $dsParamSORT = 'system:id';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		public $dsParamFILTERS = array(
				'50' => '{$category}',
		);
		

		public $dsParamINCLUDEDELEMENTS = array(
				'category',
				'description: formatted'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Category',
				'author' => array(
					'name' => 'Ovidiu Spatacian-Tarnu',
					'website' => 'http://localhost/25hlabs',
					'email' => 'me@ovidiust.com'),
				'version' => 'Symphony 2.3',
				'release-date' => '2012-07-08T13:38:29+00:00'
			);
		}

		public function getSource(){
			return '11';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

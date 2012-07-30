<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcekeyword extends SectionDatasource{

		public $dsParamROOTELEMENT = 'keyword';
		public $dsParamORDER = 'desc';
		public $dsParamPAGINATERESULTS = 'no';
		public $dsParamLIMIT = '20';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamREQUIREDPARAM = '$filter';
		public $dsParamSORT = 'system:id';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		public $dsParamFILTERS = array(
				'56' => '{$filter}',
		);
		

		public $dsParamINCLUDEDELEMENTS = array(
				'keyword',
				'category',
				'definition: formatted'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Keyword',
				'author' => array(
					'name' => 'Ovidiu Spatacian-Tarnu',
					'website' => 'http://localhost/25hlabs',
					'email' => 'me@ovidiust.com'),
				'version' => 'Symphony 2.3',
				'release-date' => '2012-07-11T14:28:36+00:00'
			);
		}

		public function getSource(){
			return '12';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

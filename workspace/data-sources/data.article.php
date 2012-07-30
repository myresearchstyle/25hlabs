<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcearticle extends SectionDatasource{

		public $dsParamROOTELEMENT = 'article';
		public $dsParamORDER = 'desc';
		public $dsParamPAGINATERESULTS = 'yes';
		public $dsParamLIMIT = '1';
		public $dsParamSTARTPAGE = '1';
		public $dsParamREDIRECTONEMPTY = 'no';
		public $dsParamREQUIREDPARAM = '$filter';
		public $dsParamSORT = 'system:id';
		public $dsParamASSOCIATEDENTRYCOUNTS = 'no';
		

		public $dsParamFILTERS = array(
				'64' => '{$filter}',
				'54' => '{$category}',
		);
		

		public $dsParamINCLUDEDELEMENTS = array(
				'title: formatted',
				'body: formatted',
				'poster',
				'cropping-options',
				'date',
				'category',
				'keywords'
		);
		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'Article',
				'author' => array(
					'name' => 'Ovidiu Spatacian-Tarnu',
					'website' => 'http://localhost/25hlabs',
					'email' => 'me@ovidiust.com'),
				'version' => 'Symphony 2.3',
				'release-date' => '2012-07-30T08:52:57+00:00'
			);
		}

		public function getSource(){
			return '7';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

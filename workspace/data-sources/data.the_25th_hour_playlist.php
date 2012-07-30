<?php

	require_once(TOOLKIT . '/class.datasource.php');

	Class datasourcethe_25th_hour_playlist extends DynamicXMLDatasource{

		public $dsParamROOTELEMENT = 'the-25th-hour-playlist';
		public $dsParamURL = 'http://www.rdio.com/api/oembed/?format=xml&url=http://www.rdio.com/people/ovidiust/playlists/1037322/The_25th_Hour/';
		public $dsParamXPATH = '/';
		public $dsParamCACHE = '30';
		public $dsParamTIMEOUT = '6';
		

		

		

		public function __construct($env=NULL, $process_params=true){
			parent::__construct($env, $process_params);
			$this->_dependencies = array();
		}

		public function about(){
			return array(
				'name' => 'The 25th Hour Playlist',
				'author' => array(
					'name' => 'Ovidiu Spatacian-Tarnu',
					'website' => 'http://localhost/25hlabs',
					'email' => 'me@ovidiust.com'),
				'version' => 'Symphony 2.3',
				'release-date' => '2012-07-11T19:44:16+00:00'
			);
		}

		public function getSource(){
			return 'dynamic_xml';
		}

		public function allowEditorToParse(){
			return true;
		}

	}

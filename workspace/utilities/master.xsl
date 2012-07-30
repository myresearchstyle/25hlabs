<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="page-title.xsl"/>
<xsl:import href="navigation.xsl"/>
<xsl:import href="date-time.xsl"/>
<xsl:import href="typography.xsl"/>
<!--<xsl:import href="get-keywords.xsl"/>-->
<xsl:import href="get-categories.xsl"/>

<xsl:output method="xml"
	doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
	doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
	omit-xml-declaration="yes"
	encoding="UTF-8"
	indent="yes" />

<xsl:variable name="is-logged-in" select="/data/logged-in-author/author"/>

<xsl:template match="/">

<html>
	<head>
		<title>
			<xsl:call-template name="page-title"/>
		</title>
		<link rel="icon" type="images/png" href="{$workspace}/images/icons/bookmark.png" />
		<link rel="stylesheet" type="text/css" media="screen" href="{$workspace}/stylesheets/styles.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="{$workspace}/stylesheets/chosen.css" />
		<link rel="alternate" type="application/rss+xml" href="{$root}/rss/" />
		
		
	</head>
	<body>
		<section id="page">
			<header id="header" class="clearfix">
				<h1>The 25th Hour Labs</h1>
				<xsl:apply-templates select="data/navigation"/>
				<xsl:apply-templates select="data/categories"/>
				<xsl:apply-templates select="data/keywords"/>
			</header>
			
			
			<xsl:apply-templates />
		
			<footer id="footer">
				Copyright &#169; <xsl:value-of select="$this-year"/> Ovidiu Spatacian-Tarnu. All rights reserved.
			</footer>
		</section>
		<script type="text/javascript" src="http://use.typekit.com/kpv8jkn.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
		<script type="text/javascript" src="{$workspace}/javascripts/jquery.min.js"></script>
		<script type="text/javascript" src="{$workspace}/javascripts/jquery.transit.min.js"></script>
		<script type="text/javascript" src="{$workspace}/javascripts/jquery.chosen.min.js"></script>
		<script type="text/javascript" src="{$workspace}/javascripts/scripts.js"></script>
	</body>
</html>

</xsl:template>

</xsl:stylesheet>

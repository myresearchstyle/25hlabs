<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="../utilities/master.xsl"/>
<xsl:import href="../utilities/get-articles.xsl"/>
<xsl:import href="../utilities/get-keywords.xsl"/>

<xsl:template match="data">
	<section id="main-content">
		<div id="main-content-inner">
			<xsl:apply-templates select="home-articles"/>
		</div>
	</section>
	<aside id="sidebar">
		<div id="sidebar-inner">
		</div>
	</aside>	
</xsl:template>

</xsl:stylesheet>
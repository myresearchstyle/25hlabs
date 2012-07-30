<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="../utilities/master.xsl"/>
<xsl:import href="../utilities/get-articles.xsl"/>
<xsl:import href="../utilities/get-keywords.xsl"/>

<xsl:template match="data">
	<xsl:choose>
		<xsl:when test="$category and not($filter)">
			<xsl:apply-templates select="leading-article/entry"/>
			<section id="content" class="clearfix">
				<xsl:apply-templates select="featured-articles"/>
			</section>
		</xsl:when>
		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="article">
					<xsl:text>Check out this article</xsl:text>
				</xsl:when>
				<xsl:when test="articles-by-keyword">
					
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="keywords"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>	
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>
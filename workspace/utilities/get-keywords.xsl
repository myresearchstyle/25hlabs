<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="keywords">
	<ul id="keywords" class="clearfix">
		<xsl:for-each select="entry">
			<li articles="{@articles}">
				<xsl:if test="keyword/@handle = ../../keyword/entry/keyword/@handle">
					<xsl:attribute name="class">active</xsl:attribute>
				</xsl:if>
				<a href="{$root}/categories/{category/item/@handle}/{keyword/@handle}">
					<xsl:value-of select="keyword"/>
				</a>
			</li>
		</xsl:for-each>
	</ul>
</xsl:template>

</xsl:stylesheet>

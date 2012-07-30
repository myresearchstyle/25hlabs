<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="categories">
	<select id="categories" data-placeholder="Choose a category..." tabindex="1">
		<option value=""></option>
		<xsl:choose>
			<xsl:when test="$current-page = 'categories'">
				<xsl:for-each select="entry">
					<option value="{$root}/categories/{category/@handle}">
						<xsl:if test="category/@handle = ../../leading-article/entry/category/item/@handle">
							<xsl:attribute name="selected">selected</xsl:attribute>
						</xsl:if>
						<xsl:value-of select="category"/>
					</option>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="entry">
					<option value="{$root}/categories/{category/@handle}">
						<xsl:value-of select="category"/>
					</option>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
	</select>
</xsl:template>

</xsl:stylesheet>




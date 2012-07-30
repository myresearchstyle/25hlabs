<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="date-time.xsl"/>

<xsl:template match="featured-articles">
	<xsl:call-template name="articles"/>
</xsl:template>

<xsl:template match="leading-article/entry">
	<div id="leading-article">
		<div id="leading-article-poster" style="background-image: url({$root}/image/2/1280/500/5/{poster/@path}/{poster/filename});"></div>
		<div id="leading-article-content">
			<h2>
				<a href="{$root}/categories/{$category}/{title/@handle}">
					<xsl:apply-templates select="title/*" mode="html"/>
				</a>
			</h2>
			<div id="leading-article-summary">
				<xsl:value-of select="substring(body, 1, 199)"/>
				<xsl:text>...</xsl:text>
			</div>
		</div>
	</div>	
</xsl:template>

<xsl:template name="articles">
	<xsl:for-each select="entry">
		<article class="clearfix">
			<header>
				<h3>
					<a href="{$root}/categories/{$category}/{title/@handle}">
						<xsl:value-of select="title"/>
					</a>
				</h3>
			</header>
			<section>					
				<xsl:choose>
					<xsl:when test="substring(summary, 200,1) = ' '">
						<xsl:value-of select="substring(body, 1, 199)"/>
						<xsl:text>...</xsl:text>
					</xsl:when>
					<xsl:when test="substring(summary, 200,2) = '. '">
						<xsl:value-of select="substring(body, 1, 199)"/>
						<xsl:text>...</xsl:text>
					</xsl:when>
					<xsl:when test="substring(summary, 199,2) = '. '">
						<xsl:value-of select="substring(body, 1, 198)"/>
						<xsl:text>...</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="substring(body, 1, 200)"/>
						<xsl:text>...</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
				<div class="date">
					<xsl:text>Posted on: </xsl:text>
					<xsl:call-template name="format-date">
						<xsl:with-param name="date" select="date"/>
						<xsl:with-param name="format" select="'D M Y'"/>
					</xsl:call-template>
				</div>
				<ul class="keywords">
					<xsl:for-each select="keywords/item">
						<li>
							<a href="#">
								<xsl:value-of select="."/>
							</a>
						</li>
					</xsl:for-each>
				</ul>
			</section>
		</article>
		
	</xsl:for-each>
</xsl:template>

</xsl:stylesheet>

import { graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';

import '../scss/templates/article.scss';
import Author from '../components/ressources/blocArticle/author';
import Divider from '../components/ressources/blocArticle/divider';
import Titre from '../components/ressources/blocArticle/titre';
import Paragraphe from '../components/ressources/blocArticle/paragraphe';
import Galerie from '../components/ressources/blocArticle/galerie';
import Photos from '../components/ressources/blocArticle/photo';
import Chiffres from '../components/ressources/blocArticle/chiffres';
import Complex from '../components/ressources/blocArticle/complex';
import Icons from '../components/ressources/blocArticle/icons';

const ArticlesPage = ({pageContext}) => {
	const [metaLang, setMetaLang] = useState("");
	const [url, setUrl] = useState("");
	console.log(pageContext)
	useEffect(() => {
		function getLanguage() {
		  if (
			window.location.href.match("/fr$") ||
			window.location.href.match("/fr/")
		  ) {
			setUrl(
			  `${process.env.GATSBY_RECRUITMENT_FORM_FR}`
			);
			setMetaLang("fr");
		  } else if (
			window.location.href.match("/en$") ||
			window.location.href.match("/en/")
		  ) {
			setUrl(
			  `${process.env.GATSBY_RECRUITMENT_FORM_EN}`
			);
			setMetaLang("en");
		  }
		}
		getLanguage();
	  }, [url]);

	// fonction qui prend une chaine de caratère qui est un type de bloc render le bon bloc
	const renderBlock = (type, index, data) => {
		console.log(type);
		switch (type) {
			case 'Titre':
				return <Titre key={index} data={data.titres} />;
			case 'Paragraphe':
				return <Paragraphe key={index} data={data.paragraphe} />
			case 'Galerie':
				return <Galerie key={index} data={data.galeriePhoto} />
			case 'Photo':
				return <Photos key={index} data={data.photo}/>
			case 'Chiffre clés':
				return <Chiffres key={index} data={data.chiffre}/>
			case 'Icons':
				return <Icons key={index} data={data.icons}/>
			case 'Complexe':
					return <Complex key={index} data={data.complexe}/>
			case 'Divider':
				return <Divider key={index} />;
			default:
				return null;
		}
	}

	const rendersBlocks = () => {
		const blocks = [];
		for (let i = 1; i < 6; i++) {
			blocks.push(renderBlock(pageContext.dataArticle.articles[`typeBloc${i}`], i, pageContext.dataArticle.articles[`bloc${i}`]));
		}
		return blocks;
	}

	console.log(pageContext.dataArticle);
	return (
		<Layout>
			<Helmet>
			<meta charSet="utf-8" />
			<html lang={metaLang} />
			<title></title>
			</Helmet>
			<main className='article'>
				<section className='article-container'>
					<div className='heading'>
						<div className="content-container">
							<div className='header'>
								{pageContext.dataArticle.articles.tags?.map((tag, index) => (
									<span key={index} className='tag-article'>{tag.name}</span>
								))}
								<p className='time'>{pageContext.dataArticle.articles.duree} MIN</p>
							</div>
							<h1>{pageContext.dataArticle.articles.titre}</h1>
							<p>{pageContext.dataArticle.articles.sousTitre}</p>
						</div>
						<img src={pageContext.dataArticle.articles.photoMiseEnAvant?.sourceUrl} alt={pageContext.dataArticle.articles.photoMiseEnAvant?.altText}/>
					</div>
					{ rendersBlocks()}
					<Author author={pageContext.dataArticle.articles.auteur} />
				</section>
			</main>
		</Layout>
	);
};

export default ArticlesPage;
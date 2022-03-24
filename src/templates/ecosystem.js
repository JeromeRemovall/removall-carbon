import React, {useEffect, useState} from 'react'
import BlocHeader from "../components/blocHeader"

import "../scss/templates/ecosystem.scss"
import Layout from "../components/layout"

import Loader from "../components/loader"
import { graphql, useStaticQuery } from "gatsby";

import { Helmet } from "react-helmet"

const query = graphql`
	query{
		blocClients : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "clients"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
				logoClientOuPartenaires {
					logo {
						sourceUrl
						altText
					}
					lienVersSite
				}
			}
		}
		blocCustomers : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "customers"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
				logoClientOuPartenaires {
					logo {
						sourceUrl
						altText
					}
					lienVersSite
				}
			}
		}
		blocPartenaires : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "partenaires"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
				logoClientOuPartenaires {
					logo {
						sourceUrl
						altText
					}
					lienVersSite
				}
			}
		}
		blocPartners : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "partners"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
				logoClientOuPartenaires {
					logo {
						sourceUrl
						altText
					}
					lienVersSite
				}
			}
		}
	}
`

function Ecosystem({ pageContext }){
	const { dataEcosystem } = pageContext;
	const dataE = dataEcosystem.ecosysteme;

	const data = useStaticQuery(query);
	const [dataCustomers, setDataCustomers] = useState("");
	const [dataPartners, setDataPartners] = useState("");
	const [metaLang, setMetaLang] = useState("");

	useEffect(() => {
		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setDataCustomers(data.blocClients.nodes);
				setDataPartners(data.blocPartenaires.nodes);
				setMetaLang("fr");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setDataCustomers(data.blocCustomers.nodes);
				setDataPartners(data.blocPartners.nodes);
				setMetaLang("en");
			}
		}
		getLanguage();
	}, [data.blocClients.nodes, data.blocCustomers.nodes, data.blocPartenaires.nodes, data.blocPartners.nodes])

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataE.titreOngletDeLaPage}</title>
			</Helmet>
			{dataE ? 
				<main className="ecosystem">
					<BlocHeader title={dataE.titre} text={dataE.description} img={dataE.imageDeFond.sourceUrl} alt={dataE.imageDeFond.altText}/>
					{dataPartners.length === 0 && dataCustomers.length === 0 ? 
						<section className="bloc-content">
							<p>{dataE.phrasePageVide}</p>
						</section>
					:null}
					{dataPartners.length > 0 ?
						<section className="bloc-content">
							<h2>{dataE.bloc1Titre}</h2>
							<div dangerouslySetInnerHTML={ { __html: dataE.bloc1Texte} }></div>
								<div className="bloc-logo">
									{dataPartners.map((logo) => {
										return(
											<a href={logo.logoClientOuPartenaires.lienVersSite} target="_blank" rel="noreferrer" className="bloc-logo__image">
												<img key={logo} src={logo.logoClientOuPartenaires.logo.sourceUrl} alt={logo.logoClientOuPartenaires.logo.altText}/>
											</a>
										)
									})}
								</div>
						</section>
					:null}
					{dataCustomers.length > 0 ?
						<section className="bloc-content">
							<h2>{dataE.bloc2Titre}</h2>
							<div dangerouslySetInnerHTML={ { __html: dataE.bloc2Texte} }></div>
							<div className="bloc-logo">
								{dataCustomers.map((logo) => {
									return(
										<a href={logo.logoClientOuPartenaires.lienVersSite} target="_blank" rel="noreferrer" className="bloc-logo__image">
											<img key={logo} src={logo.logoClientOuPartenaires.logo.sourceUrl} alt={logo.logoClientOuPartenaires.logo.altText}/>
										</a>
									)
								})}
							</div>
						</section>
					:null }
				</main>
			: <Loader /> }
		</Layout>
	)
}

export default Ecosystem;
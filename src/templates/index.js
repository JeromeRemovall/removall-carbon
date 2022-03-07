import React, {useEffect, useState} from 'react'
import Slider from "../components/slider"
import Legend from "../components/legend"
import ButtonLink from "../components/buttonLink"
import CardList from "../components/cardList"
import Card from "../components/card"
import Description from "../components/description"
import Layout from "../components/layout"
import Loader from "../components/loader"

// global styles 
import "../reset.css"
import "../scss/templates/index.scss"

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
					visiblePageHome
					logo {
						sourceUrl
						altText
					}
				}
			}
		}
		blocCustomers : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "customers"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
				logoClientOuPartenaires {
					visiblePageHome
					logo {
						sourceUrl
						altText
					}
				}
			}
		}
		blocPartenaires : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "partenaires"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
		
				logoClientOuPartenaires {
					visiblePageHome
					logo {
						sourceUrl
						altText
					}
				}
		
			}
		}
		blocPartners : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "partners"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes {
				logoClientOuPartenaires {
					visiblePageHome
					logo {
						sourceUrl
						altText
					}
				}
			}
		}
		sliderFr : allWpPost(
			filter: {categories: {nodes: {elemMatch: {name: {eq: "carousel"}}}}}
			sort: {fields: date, order: ASC}
		){
			nodes{
				slider {
					image {
						sourceUrl
						altText
					}
					titre
					texte
				}
			}
		}
		sliderEn : allWpPost(
			filter: {categories: {nodes: {elemMatch: {name: {eq: "slider"}}}}}
			sort: {fields: date, order: ASC}
		){
			nodes{
				slider {
					image {
					sourceUrl
					altText
					}
					titre
					texte
				}
			}
		}
	}
`

function Home({ pageContext }){
	const { dataHome } = pageContext;
	const dataH = dataHome.home;

	const data = useStaticQuery(query);
	const [dataCustomers, setDataCustomers] = useState("");
	const [dataPartners, setDataPartners] = useState("");
	const [dataSlider, setDataSlider] = useState("");
	const [metaLang, setMetaLang] = useState("");
	const [metaDescription, setMetaDescription] = useState("");
	const logoCustomers = [];
	const logoPartners = [];


	const slides = []
	if(dataSlider){
		dataSlider.map((slide) => {
			return(
				slides.push(slide.slider)
			)
		})
	}

	if(dataCustomers){
		dataCustomers.map((item)=> {
			if(item.logoClientOuPartenaires.visiblePageHome === true){
				return(
					logoCustomers.push(item.logoClientOuPartenaires.logo)
				)
			}
		})
		console.log(logoCustomers)
	}

	if(dataPartners){
		dataPartners.map((item)=> {
			if(item.logoClientOuPartenaires.visiblePageHome === true){
				return(
					logoPartners.push(item.logoClientOuPartenaires.logo)
				)
			}
		})
		console.log(logoPartners)
	}

	useEffect(() => {
		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setDataCustomers(data.blocClients.nodes);
				setDataPartners(data.blocPartenaires.nodes);
				setDataSlider(data.sliderFr.nodes);
				setMetaLang("fr");
				setMetaDescription("Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone.");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setDataCustomers(data.blocCustomers.nodes);
				setDataPartners(data.blocPartners.nodes);
				setDataSlider(data.sliderEn.nodes);
				setMetaLang("en");
				setMetaDescription("Removall is specialized in designing carbon funds and developing carbon sequestration projects.");
			}
		}
		getLanguage();

	}, [data.blocClients.nodes, data.blocCustomers.nodes, data.blocPartenaires.nodes, data.blocPartners.nodes, data.sliderEn.nodes, data.sliderFr.nodes]) 
	
	return (
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataH.titreOngletDeLaPage}</title>
				<meta name="description" content={metaDescription} />
			</Helmet>
			{dataH && data && dataSlider ?   
				<main className="home">
					<section className="slider-home">
						<Slider slides={slides}/>
					</section>
					<section className="bloc-1">
						<Description title={dataH.bloc1Titre} text={dataH.bloc1Texte} button={dataH.bloc1Bouton} buttonVisible={true} buttonMobile={dataH.bloc1BoutonMobile} to={dataH.bloc1BoutonLien} />
					</section>
					<section className="bloc-2">
						<div className="bloc-2__image">
							<img src={dataH.bloc2Image.sourceUrl} alt={dataH.bloc2Image.altText} />
						</div>
						<div className="bloc-2__content">
							<h2>{dataH.bloc2Titre}</h2>
							<div dangerouslySetInnerHTML={ { __html: dataH.bloc2Texte} }></div>
							<ButtonLink label={dataH.bloc2Bouton} to={dataH.bloc2BoutonLien} labelMobile={dataH.bloc2BoutonMobile}/>
						</div>
					</section>
					<section className="bloc-3">
						<h2>{dataH.bloc3Titre}</h2>
						<CardList title={dataH.bloc3item1SousTitre} text={dataH.bloc3item1Texte} img={dataH.bloc3item1Image.sourceUrl} alt={dataH.bloc3item1Image.altText}/>
						<CardList title={dataH.bloc3item2SousTitre} text={dataH.bloc3item2Texte} img={dataH.bloc3item2Image.sourceUrl} alt={dataH.bloc3item2Image.altText}/>
						<CardList title={dataH.bloc3item3SousTitre} text={dataH.bloc3item3Texte} img={dataH.bloc3item3Image.sourceUrl} alt={dataH.bloc3item3Image.altText}/>
						<CardList title={dataH.bloc3item4SousTitre} text={dataH.bloc3item4Texte} img={dataH.bloc3item4Image.sourceUrl} alt={dataH.bloc3item4Image.altText}/>
						<ButtonLink label={dataH.bloc3Bouton} to={dataH.bloc3BoutonLien} labelMobile={dataH.bloc3BoutonMobile}/>
					</section>
					<section className="bloc-4">
						<div className="bloc-4__content">
						<Description title={dataH.bloc4Titre} text={dataH.bloc4Texte}/>
						</div>
						<div className="bloc-4__cards">
							<Card title={dataH.bloc4item1SousTitre} text={dataH.bloc4item1Texte} img={dataH.bloc4item1Image.sourceUrl} alt={dataH.bloc4item1Image.altText}/>
							<Card title={dataH.bloc4item2SousTitre} text={dataH.bloc4item2Texte} img={dataH.bloc4item2Image.sourceUrl} alt={dataH.bloc4item2Image.altText}/>
							<Card title={dataH.bloc4item3SousTitre} text={dataH.bloc4item3Texte} img={dataH.bloc4item3Image.sourceUrl} alt={dataH.bloc4item3Image.altText}/>
						</div>
						<ButtonLink label={dataH.bloc4Bouton} to={dataH.bloc4BoutonLien} labelMobile={dataH.bloc4BoutonMobile}/>
					</section>
					<section className="bloc-5">
						<h2>{dataH.bloc5Titre}</h2>
						<div dangerouslySetInnerHTML={ { __html: dataH.bloc5Texte} }></div>
						<ButtonLink label={dataH.bloc5Bouton} to={dataH.bloc5BoutonLien} labelMobile={dataH.bloc5BoutonMobile}/>
					</section>
					{logoCustomers.length > 0 || logoPartners.length > 0? 
						<section className="bloc-6">
							<h2>{dataH.bloc6Titre}</h2> 
							<div className="bloc-6__content">
								<div className="bloc-6__content__logo"> 
									{logoCustomers.length > 0 ? 
										<>
											<Legend text={dataH.bloc6item1SousTitre}/>
											<div className="bloc-6__content__logo--ligne">
												{logoCustomers.map((item)=> {
													return(
														<div className='bloc-6__content__logo--ligne__image'>
															<img src={item.sourceUrl} key={item} alt={item.altText}/>
														</div>
													)
												})}
											</div>
										</>
									:null}
									{logoPartners.length > 0 ? 
										<>
											<Legend text={dataH.bloc6item2SousTitre}/>
											<div className="bloc-6__content__logo--ligne">
												{logoPartners.map((item)=> {
													return(
														<div className='bloc-6__content__logo--ligne__image'>
															<img src={item.sourceUrl} key={item} alt={item.altText}/>
														</div>
													)
												})}
											</div>
										</>
									:null}
								</div>
							</div>
						</section>
					:null}
				</main>
			:
			<Loader /> 
			}
		</Layout>
	)
}

export default Home;
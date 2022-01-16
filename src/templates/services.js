import React, {useState, useEffect} from 'react'
import NavbarSmall from "../components/navbar-small"
import CardListFull from "../components/cardListFull"
import BlocHeader from "../components/blocHeader"
import Layout from "../components/layout"

import Loader from "../components/loader"

import "../scss/templates/services.scss"

import { Element} from 'react-scroll'
import { Helmet } from "react-helmet"

function Services({ pageContext }){
	const { dataServices } = pageContext;
	const dataS = dataServices.services;
	const [animation, setAnimation] = useState("");

	const [metaLang, setMetaLang] = useState("");
	const [metaDescription, setMetaDescription] = useState("");

	const animationContent = () => {
		setAnimation("animation");
		setTimeout(() => {
			setAnimation("");
		}, 1000);
	}


	useEffect(() => {
		function navBarTypeLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/") || window.localStorage.getItem("preferredLanguage") === "fr"){
				setMetaLang("fr");
				setMetaDescription("Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone.");
			}
			if(window.location.href.match("/en$") || window.location.href.match("/en/") ||  window.localStorage.getItem("preferredLanguage") === "en"){
				setMetaLang("en");
				setMetaDescription("Removall is specialized in designing carbon funds and developing carbon sequestration projects.");
			}
		}
		navBarTypeLanguage()
	}, [])

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataS.titreOngletDeLaPage}</title>
				{/* <meta name="description" content={metaDescription} /> */}
			</Helmet>
			{dataS ? 
				<main className="services">
					<BlocHeader title={dataS.titre} text={dataS.description} img={dataS.imageDeFond.sourceUrl} alt={dataS.imageDeFond.altText}/>
					<div className="navbar-container">
						<NavbarSmall 
							item1={dataS.itemMenu1} 
							item2={dataS.itemMenu2} 
							item3={dataS.itemMenu3} 
							item4={dataS.itemMenu4} 
							onClick={animationContent}
						/>
					</div>
					<Element className="services-container" id="containerElement">
						<Element  className={`services-container__sections ${animation}`} name="first">
							<CardListFull title={dataS.bloc1Titre} text={dataS.bloc1Texte}  img={dataS.bloc1Image.sourceUrl} alt={dataS.bloc1Image.altText}/>
						</Element>
						<Element  className={`services-container__sections ${animation}`} name="second">
							<CardListFull title={dataS.bloc2Titre} text={dataS.bloc2Texte}  img={dataS.bloc2Image.sourceUrl} alt={dataS.bloc2Image.altText}/>
						</Element>
						<Element  className={`services-container__sections ${animation}`} name="third">
							<CardListFull title={dataS.bloc3Titre} text={dataS.bloc3Texte}  img={dataS.bloc3Image.sourceUrl} alt={dataS.bloc3Image.altText}/>
						</Element>
						<Element  className={`services-container__sections ${animation}`} name="fourth">
							<CardListFull title={dataS.bloc4Titre} text={dataS.bloc4Texte}  img={dataS.bloc4Image.sourceUrl} alt={dataS.bloc4Image.altText}/>
						</Element>
					</Element>
					<section className="bloc-content__responsive">
						<CardListFull title={dataS.bloc1Titre} text={dataS.bloc1Texte}  img={dataS.bloc1Image.sourceUrl} alt={dataS.bloc1Image.altText}/>
						<CardListFull title={dataS.bloc2Titre} text={dataS.bloc2Texte}  img={dataS.bloc2Image.sourceUrl} alt={dataS.bloc2Image.altText}/>
						<CardListFull title={dataS.bloc3Titre} text={dataS.bloc3Texte}  img={dataS.bloc3Image.sourceUrl} alt={dataS.bloc3Image.altText}/>
						<CardListFull title={dataS.bloc4Titre} text={dataS.bloc4Texte}  img={dataS.bloc4Image.sourceUrl} alt={dataS.bloc4Image.altText}/>
					</section>
				</main>
			: <Loader /> }
		</Layout>
	)
}

export default Services;
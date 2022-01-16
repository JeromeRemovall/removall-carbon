import React, {useState, useEffect} from "react"
import BlocHeader from "../components/blocHeader";
import Layout from "../components/layout";
import "../scss/templates/conditionsOfUse.scss";

import Loader from "../components/loader"
import { Helmet } from "react-helmet"

function LegalNotice({ pageContext }){
	const { dataLegalNotice } = pageContext;
	const dataL = dataLegalNotice.conditionsMentions;

	const [metaLang, setMetaLang] = useState("");
	const [metaDescription, setMetaDescription] = useState("");


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
				<title>{dataL.titreOngletDeLaPage}</title>
				{/* <meta name="description" content={metaDescription} /> */}
			</Helmet>
			{dataL ?
				<main className="legal-notice">
					<BlocHeader title={dataL.titre} img={dataL.imageDeFond.sourceUrl} alt={dataL.imageDeFond.altText}/>
					<section className="block-1">
					<div dangerouslySetInnerHTML={{ __html: dataL.texte}}></div>
					</section>
				</main>
			: <Loader /> }
		</Layout>
	)
}

export default LegalNotice;
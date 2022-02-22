import Layout from "../components/layout"
import React, { useState, useEffect } from "react"

import BlocHeader from "../components/blocHeader2";
import "../scss/templates/offers.scss"
import { graphql, useStaticQuery } from "gatsby";

import { Helmet } from "react-helmet"

function Offers({pageContext}){

	const { dataOffers } = pageContext;
	const dataO = dataOffers.offres;

	const [metaLang, setMetaLang] = useState("");

	useEffect(() => {
		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setMetaLang("fr");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setMetaLang("en");
			}
		}
		getLanguage();
	}, [])

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title></title>
				{/* <meta name="description" content={metaDescription} /> */}
			</Helmet>
			<BlocHeader title={dataO.titre} subtitle={dataO.sousTitre} label={dataO.bouton}/>
			<main className="offers">
				<section className="offers__content">
					<div dangerouslySetInnerHTML={{ __html: dataO.texte}}></div>
				</section>
				<section className="offers__content-form">
					<h2>Soumettre votre candidature :</h2>
					<form className="form" method="post" action="#" onSubmit="#">
						<div className="group-input">
							<input type="text" id="surname" name="surname" placeholder="Nom" />
							<p className="form-message__error"></p>
						</div>
						<div className="group-input">
							<input type="text" id="firstname" name="firstname" placeholder="Prénom" />
							<p className="form-message__error"></p>
						</div>
						<div className="group-input">
							<input type="text" id="email" name="email" placeholder="Adresse email" />
							<p className="form-message__error"></p>
						</div>
						<div className="group-input">
							<input type="text" id="tel" name="tel" placeholder="Téléphone" />
							<p className="form-message__error"></p>
						</div>
						<div className="group-input">
							<input type="text" id="linkedin" name="linkedin" placeholder="Linkedin" />
							<p className="form-message__error"></p>
						</div>
						<div className="group-input">
							<input type="file" id="surname" name="surname" placeholder="Ajoute un CV" />
							<p className="form-message__error"></p>
						</div>
						<div className="group-input">
							<input type="file" id="letter" name="letter" placeholder="Lettre de motivation" />
							<p className="form-message__error"></p>
						</div>
						<button type="submit" className="button">
							<hr />
							{/* {dataForm.bouton} */}
						</button>
					</form>
				</section>
			</main>
		</Layout>
	)
}

export default Offers;
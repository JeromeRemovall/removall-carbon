import Layout from "../components/layout"
import React, { useState, useEffect } from "react"

import BlocHeader from "../components/blocHeader2";
import "../scss/templates/offers.scss"
import { graphql, useStaticQuery } from "gatsby";

import { Helmet } from "react-helmet"

function Offers({pageContext}){

	// const { dataOffers } = pageContext;
	// const dataO = dataOffers.offres;
	// console.log(dataO);

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
			{/* <BlocHeader title={dataO.titre} subtitle={dataO.sousTitre} label={dataO.bouton}/> */}
			<main className="offers">
				<section className="offers__content">
					{/* <div dangerouslySetInnerHTML={{ __html: dataO.texte}}></div> */}
					<div>
						<h3>
							<li>Descriptif de la société :</li>
						</h3>
						Removall est la première société entièrement spécialisée dans le montage de fonds carbone et le développement de projets de séquestration carbone. Nous accompagnons les entreprises et les organisations dans leur ambition climatique en développant et structurant des fonds carbone mutualisés ou sur mesure, ou en mettant en place des démarches de compensation carbone
						rigoureuses et ambitieuses. 

						Acteur engagé en faveur de l’objectif net zéro, Removall investis en priorité dans des projets de séquestration, notamment dans des projets de régénération des écosystèmes naturels (afforestation et reforestation, mangrove, gestion des sols, ...) à fort impact positif pour les populations locales. 

						Mobilisant une double expertise unique sur le marché, basée sur une connaissance fine des
						mécanismes et projets de compensation carbone, ainsi qu’une expérience forte dans le financement de projets de transition écologique, nous agissons au quotidien pour le climat. 

						Si vous souhaitez rejoindre une équipe jeune et dynamique, engagée pour le climat, et au cœur d’une aventure entrepreneuriale ambitieuse, ce poste est fait pour vous.
						<h4>Sourcing et due diligence :</h4>
						<li>Descriptif de la société :</li>
						<li>Descriptif de la société :</li>
						<li>Descriptif de la société :</li>
						<li>Descriptif de la société :</li>
						<li>Descriptif de la société :</li>
						<li>Descriptif de la société :</li>
					</div>
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
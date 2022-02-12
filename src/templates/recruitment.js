import React from 'react'
import BlocHeader from "../components/blocHeader"
import Layout from "../components/layout"
import Description from "../components/description"
import Video from "../components/video"
import MinCard from "../components/minCard"

import { Helmet } from "react-helmet"

import "../scss/templates/recruitment.scss" ;

function Recruitment({ pageContext }){

	const { dataRecruitment } = pageContext;
	const dataR = dataRecruitment.recruitment;

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang="" />
				<title>{dataR.titreOngletDeLaPage}</title>
			</Helmet>
			<main className="recruitment">
				<BlocHeader title={dataR.titre} img={dataR.imageDeFond.sourceUrl} alt={dataR.imageDeFond.altText}/>
				<section className="bloc-1">
					<Description title={dataR.bloc1Titre} text={dataR.bloc1Texte} />
				</section>
				<section className="bloc-2">
					<Video src={dataR.bloc2Video.mediaItemUrl} />
				</section>
				<section className="bloc-3">
					<h2>{dataR.bloc3Titre}</h2>
					<MinCard />
				</section>
				<section className="bloc-4">
					<h2>{dataR.bloc4Titre}</h2>
				</section>
			</main>
		</Layout>
	)
}

export default Recruitment;
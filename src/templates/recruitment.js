import React, {useState, useEffect} from 'react'
import BlocHeader from "../components/blocHeader"
import Layout from "../components/layout"
import Description from "../components/description"
import Video from "../components/video"
import MinCard from "../components/minCard"

import { Helmet } from "react-helmet"

import "../scss/templates/recruitment.scss" ;

import SwiperSlider from "../components/swiper"

import { Clock } from 'react-feather';
import { graphql, useStaticQuery } from "gatsby";

const query = graphql `
	query{
		recruitment : allWpPage(filter: {category: {name: {eq: "recrutement"}}}){
			nodes{
				slug
				language {
					slug
				}
			}
		}
		offersFr : allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "offres"}}}}}) {
			nodes {
				offres {
					bouton
					categorie
					lieu
					sousTitre
					texte
					titre
					typeDeContrat
				}
				id
			}
		}
		offersEn : allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "offers"}}}}}) {
			nodes {
				offres {
					bouton
					categorie
					lieu
					sousTitre
					texte
					titre
					typeDeContrat
				}
				id
			}
		}
	}
`;

function Recruitment({ pageContext }){

	const data = useStaticQuery(query);
	const [dataO, setDataO] = useState("");

	const { dataRecruitment } = pageContext;
	const dataR = dataRecruitment.recruitment;

	const [metaLang, setMetaLang] = useState("");

	const [arrayfilters, setArrayFilters] = useState([]);
	const [selected,setSelected] = useState("Équipe");

	const imgs = [
		"https://picsum.photos/500/300?random=1",
		"https://picsum.photos/500/300?random=2",
		"https://picsum.photos/500/300?random=3",
		"https://picsum.photos/500/300?random=4",
		"https://picsum.photos/500/300?random=5",
		"https://picsum.photos/500/300?random=6"
	]

	useEffect(() => {
		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setDataO(data.offersFr.nodes);
				setMetaLang("fr");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setDataO(data.offersEn.nodes);
				setMetaLang("en");
			}
		}
		getLanguage();
	}, [dataO])

	function setFilters(){
		if(dataO){
			dataO.map((items)=> {
				items.offres.categorie.map((item)=> {
					if(arrayfilters.indexOf(item) === -1){
						arrayfilters.push(item)
					}
				})
				
			})
		}
	}
	setFilters()

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang="" />
				<title>{dataR.titreOngletDeLaPage}</title>
			</Helmet>
			{dataO ?
			<main className="recruitment">
				<BlocHeader title={dataR.titre} img={dataR.imageDeFond.sourceUrl} alt={dataR.imageDeFond.altText}/>
				<section className="bloc-1">
					<Description title={dataR.bloc1Titre} text={dataR.bloc1Texte} />
				</section>
				<section className="bloc-2">
					<Video src={dataR.bloc2Video.mediaItemUrl} thumbnail={dataR.miniatureVideo.sourceUrl}/>
				</section>
				<section className="bloc-3">
					<div className="bloc-3__header">
						<h2>{dataR.bloc3Titre}</h2>
						<div className="bloc-3__header-filter">
							<select name="team" id="team" value={selected} onChange={(e)=> setSelected(e.target.value)}>
								<option value="Équipe">Équipe</option>
								{arrayfilters.map((item)=> {
									return(
										<option value={item}>{item}</option>
									)
								})}
							</select>
							<select name="localisation" id="localisation">
								<option value="">Localisation</option>
							</select>
						</div>
					</div>
					<div className="bloc-3__grid">
						{dataO.map((item)=> {
							return(
								<>
									{selected === "Équipe" || item.offres.categorie.indexOf(selected) !== -1 ? 
										<MinCard link={item.id} title={item.offres.titre} tag={item.offres.categorie} place={item.offres.lieu} time={item.offres.typeDeContrat}/>
									: null}
								</>
							)
						})}
					</div>
				</section>
				<section className="bloc-4">
					<div className="bloc-4__carousel">
						<h2>{dataR.bloc4Titre}</h2>
						<SwiperSlider slides={imgs} alt="" thumbnail={dataR.miniatureVideo.sourceUrl}/>
					</div>
				</section>
			</main>
			:null}
		</Layout>
	)
}

export default Recruitment;
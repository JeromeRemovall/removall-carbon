import React, {useState, useEffect} from 'react'
import BlocHeader from "../components/blocHeader"
import Layout from "../components/layout"
import Description from "../components/description"
import Video from "../components/video"
import MinCard from "../components/minCard"

import { Helmet } from "react-helmet"

import "../scss/templates/recruitment.scss" ;

import SwiperSlider from "../components/swiper"

import { Sliders } from 'react-feather';
import { graphql, useStaticQuery } from "gatsby";

import Button from "../components/buttonAction";

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
		imagesSliderFr: allWpPost(
			filter: {categories: {nodes: {elemMatch: {name: {eq: "carousel page recrutement"}}}}}
		) {
			nodes {
				id
				carouselImage {
					image {
						sourceUrl
						altText
					}
				}
			}
		}
		imagesSliderEn: allWpPost(
			filter: {categories: {nodes: {elemMatch: {name: {eq: "slider page recruitment"}}}}}
		) {
			nodes {
				id
				carouselImage {
					image {
						sourceUrl
						altText
					}
				}
			}
		}
	}
`;

function Recruitment({ pageContext }){

	const data = useStaticQuery(query);
	const [dataO, setDataO] = useState("");
	const [dataSlider, setDataSlider] = useState("");

	const { dataRecruitment } = pageContext;
	const dataR = dataRecruitment.recruitment;

	const [metaLang, setMetaLang] = useState("");

	const [arrayfilters1, setArrayFilters1] = useState([]);
	const [arrayfilters2, setArrayFilters2] = useState([]);

	const [selectedTeam,setSelectedTeam] = useState(dataR.nomDuPremierFiltre);
	const [selectedLocation,setSelectedLocation] = useState(dataR.nomDuDeuxiemeFiltre);

	const [open, setOpen] = useState(false);

	const imgs = [
		"https://picsum.photos/500/300?random=1",
		"https://picsum.photos/500/300?random=2",
		"https://picsum.photos/500/300?random=3",
		"https://picsum.photos/500/300?random=4",
		"https://picsum.photos/500/300?random=5",
		"https://picsum.photos/500/300?random=6"
	]

	const slides = []
	if(dataSlider){
		dataSlider.map((slide) => {
			return(
				slides.push(slide.carouselImage)
			)
		})
	}

	console.log(dataSlider)

	useEffect(() => {
		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setDataO(data.offersFr.nodes);
				setDataSlider(data.imagesSliderFr.nodes)
				setMetaLang("fr");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setDataO(data.offersEn.nodes);
				setDataSlider(data.imagesSliderEn.nodes)
				setMetaLang("en");
			}
		}
		getLanguage();
	}, [dataO, dataSlider])

	function setFilters(){
		if(dataO){
			dataO.map((items)=> {
				items.offres.categorie.map((item)=> {
					if(arrayfilters1.indexOf(item) === -1){
						arrayfilters1.push(item)
					}
				})
			})

			dataO.map((items)=> {
				if(arrayfilters2.indexOf(items.offres.lieu) === -1){
					arrayfilters2.push(items.offres.lieu)
				}
			})
		}
	}
	setFilters()

	function openOffers(){
		setOpen(!open);
	}

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang="" />
				<title>{dataR.titreOngletDeLaPage}</title>
			</Helmet>
			{dataO && dataR ?
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
							<select name="team" id="team" value={selectedTeam} onChange={(e)=> setSelectedTeam(e.target.value)}>
								<option value={dataR.nomDuPremierFiltre}>{dataR.nomDuPremierFiltre}</option>
								{arrayfilters1.map((item)=> {
									return(
										<option value={item}>{item}</option>
									)
								})}
							</select>
							<select name="localisation" id="localisation" value={selectedLocation} onChange={(e)=> setSelectedLocation(e.target.value)}>
								<option value={dataR.nomDuDeuxiemeFiltre}>{dataR.nomDuDeuxiemeFiltre}</option>
								{arrayfilters2.map((item)=> {
									return(
										<option value={item}>{item}</option>
									)
								})}
							</select>
							<button className="bloc-3__header-filter--mobile">
								<Sliders />
							</button>
							<div className="bloc-3__filter_panel">
								<h3>Filtres</h3>
								<div className="bloc-3__filter_panel--option">
									<p></p>
								</div>
							</div>
						</div>
					</div>
					<div className={open ? "bloc-3__grid open" : "bloc-3__grid"}>
						{dataO.map((item)=> {
							return(
								<>
									{(selectedTeam === dataR.nomDuPremierFiltre && selectedLocation === dataR.nomDuDeuxiemeFiltre) || (item.offres.categorie.indexOf(selectedTeam) !== -1 && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedTeam === dataR.nomDuPremierFiltre && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedLocation === dataR.nomDuDeuxiemeFiltre && item.offres.categorie.indexOf(selectedTeam) !== -1)? 
										<MinCard link={item.id} title={item.offres.titre} tag={item.offres.categorie} place={item.offres.lieu} time={item.offres.typeDeContrat}/>
									: null}
									{(selectedTeam === dataR.nomDuPremierFiltre && selectedLocation === dataR.nomDuDeuxiemeFiltre) || (item.offres.categorie.indexOf(selectedTeam) !== -1 && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedTeam === dataR.nomDuPremierFiltre && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedLocation === dataR.nomDuDeuxiemeFiltre && item.offres.categorie.indexOf(selectedTeam) !== -1)? 
										<MinCard link={item.id} title={item.offres.titre} tag={item.offres.categorie} place={item.offres.lieu} time={item.offres.typeDeContrat}/>
									: null}
									{(selectedTeam === dataR.nomDuPremierFiltre && selectedLocation === dataR.nomDuDeuxiemeFiltre) || (item.offres.categorie.indexOf(selectedTeam) !== -1 && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedTeam === dataR.nomDuPremierFiltre && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedLocation === dataR.nomDuDeuxiemeFiltre && item.offres.categorie.indexOf(selectedTeam) !== -1)? 
										<MinCard link={item.id} title={item.offres.titre} tag={item.offres.categorie} place={item.offres.lieu} time={item.offres.typeDeContrat}/>
									: null}
									{(selectedTeam === dataR.nomDuPremierFiltre && selectedLocation === dataR.nomDuDeuxiemeFiltre) || (item.offres.categorie.indexOf(selectedTeam) !== -1 && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedTeam === dataR.nomDuPremierFiltre && item.offres.lieu.indexOf(selectedLocation) !== -1) || (selectedLocation === dataR.nomDuDeuxiemeFiltre && item.offres.categorie.indexOf(selectedTeam) !== -1)? 
										<MinCard link={item.id} title={item.offres.titre} tag={item.offres.categorie} place={item.offres.lieu} time={item.offres.typeDeContrat}/>
									: null}
								</>
							)
						})}
					</div>
					{dataO.length > 1 && open === false ? <Button label={dataR.bloc3BoutonOuvrir} labelMobile={dataR.bloc3BoutonOuvrirMobile} onClick={openOffers} /> : null}
					{dataO.length > 1 && open === true ? <Button label={dataR.bloc3BoutonFermer} labelMobile={dataR.bloc3BoutonFermerMobile} onClick={openOffers} /> : null}
				</section>
				<section className="bloc-4">
					<div className="bloc-4__carousel">
						<h2>{dataR.bloc4Titre}</h2>
						<SwiperSlider slides={slides} />
					</div>
				</section>
			</main>
			:null}
		</Layout>
	)
}

export default Recruitment;
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
import { ChevronDown } from 'react-feather';
import { Check } from 'react-feather';

import Button from "../components/buttonAction";

import Loader from "../components/loader"

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
		offersFr : allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "offres"}}}}}
		sort: {fields: offres___typeDeContrat, order: ASC}
		){
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
		offersEn : allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "offers"}}}}}
		sort: {fields: offres___typeDeContrat, order: ASC}
		){
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
	const [arrayfilters3, setArrayFilters3] = useState([]);

	const [selectedTeam,setSelectedTeam] = useState(dataR.nomDuPremierFiltre);
	const [selectedTypeOfContract, setSelectedTypeOfContract] = useState(dataR.nomDuDeuxiemeFiltre);
	const [selectedLocation, setSelectedLocation] = useState(dataR.nomDuTroisiemeFiltre);
	const [selectedDefault, setSelectedDefault] = useState(true);

	//Open filters
	const [openFilters1, setOpenFilters1] = useState(false)
	const [openFilters2, setOpenFilters2] = useState(false)
	const [openFilters3, setOpenFilters3] = useState(false)

	const [open, setOpen] = useState(false);
	const [openPanelFilters, setOpenPanelFilters] = useState(false);

	const slides = []
	if(dataSlider){
		dataSlider.map((slide) => {
			return(
				slides.push(slide.carouselImage)
			)
		})
	}

	useEffect(() => {

		if(openPanelFilters){
			document.querySelector('body').classList.add("stop-scroll");
		}else{
			document.querySelector('body').classList.remove("stop-scroll");
		}

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
	}, [dataO, dataSlider, openPanelFilters])

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
				if(arrayfilters2.indexOf(items.offres.typeDeContrat) === -1){
					arrayfilters2.push(items.offres.typeDeContrat)
				}
			})

			dataO.map((items)=> {
				if(arrayfilters3.indexOf(items.offres.lieu) === -1){
					arrayfilters3.push(items.offres.lieu)
				}
			})
		}
	}
	setFilters()

	function openOffers(){
		setOpen(!open);
	}

	function defaultFilter(){
		setSelectedTeam(dataR.nomDuPremierFiltre);
		setSelectedTypeOfContract(dataR.nomDuDeuxiemeFiltre);
		setSelectedLocation(dataR.nomDuTroisiemeFiltre)
	}

	console.log(slides.length > 0)

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataR.titreOngletDeLaPage}</title>
			</Helmet>
			{dataO && dataR ?
			<main className="recruitment">
				<BlocHeader title={dataR.titre} img={dataR.imageDeFond.sourceUrl} alt={dataR.imageDeFond.altText}/>
				<section className="bloc-1">
					<Description title={dataR.bloc1Titre} text={dataR.bloc1Texte} />
				</section>
				{dataR.bloc2Video !== null? 
					<section className="bloc-2">
						<Video src={dataR.bloc2Video.mediaItemUrl} thumbnail={dataR.miniatureVideo.sourceUrl}/>
					</section>
				:null}
				<section className="bloc-3">
					<div className="bloc-3__header">
						<h2>{dataR.bloc3Titre}</h2>
						<div className="bloc-3__header-filter">
							<select name="team" id="team" value={selectedTeam} onChange={(e)=> setSelectedTeam(e.target.value)}>
								<option class="optionDefault" value={dataR.nomDuPremierFiltre} selected disabled>{dataR.nomDuPremierFiltre}</option>
								{arrayfilters1.map((item)=> {
									return(
										<option value={item}>{item}</option>
									)
								})}
							</select>
							<select name="typeOfContract" id="typeOfContract" value={selectedTypeOfContract} onChange={(e)=> setSelectedTypeOfContract(e.target.value)}>
								<option value={dataR.nomDuDeuxiemeFiltre} selected disabled>{dataR.nomDuDeuxiemeFiltre}</option>
								{arrayfilters2.map((item)=> {
									return(
										<option value={item}>{item}</option>
									)
								})}
							</select>
							<select name="location" id="location" value={selectedLocation} onChange={(e)=> setSelectedLocation(e.target.value)}>
								<option value={dataR.nomDuTroisiemeFiltre} selected disabled>{dataR.nomDuTroisiemeFiltre}</option>
								{arrayfilters3.map((item)=> {
									return(
										<option value={item}>{item}</option>
									)
								})}
							</select>
							<button className="bloc-3__header-filter--mobile" onClick={()=> setOpenPanelFilters(true)}>
								<Sliders />
							</button>
							{openPanelFilters ? 
								<div className="bloc-3__filter_panel">
									<h3>Filtres</h3>
									<div className="bloc-3__filter_panel--option">
										<ul>
											<li className="select">
												<div className="select-content" onClick={()=> defaultFilter()}>
													<p>Par défaut</p>
													<div className="selected">
														{selectedTeam === dataR.nomDuPremierFiltre && selectedTypeOfContract === dataR.nomDuDeuxiemeFiltre && selectedLocation === dataR.nomDuTroisiemeFiltre ? <Check /> : null}
													</div>
												</div>
											</li>
											<li className={openFilters1 ? "select" : "select close"}>
												<div className="select-content" onClick={()=> setOpenFilters1(!openFilters1)}>
													<p>{dataR.nomDuPremierFiltre}</p>
													<div className="chevron">
														<ChevronDown />
													</div>
												</div>
												{arrayfilters1.map((item)=> {
													return(
														<>
															<ul className="select-content-option" onClick={()=> {setSelectedTeam(item)}}>
																<li value={item}>{item}</li>
																<div className="selected">{selectedTeam === item ? <Check /> : null}</div>
															</ul>
														</>
													)
												})}
											</li>
											<li className={openFilters2 ? "select" : "select close"}>
												<div className="select-content" onClick={()=> setOpenFilters2(!openFilters2)}>
													<p>{dataR.nomDuDeuxiemeFiltre}</p>
													<div className="chevron">
														<ChevronDown />
													</div>
												</div>
												{arrayfilters2.map((item)=> {
													return(
														<ul className="select-content-option" onClick={()=> {setSelectedTypeOfContract(item)}}>
															<li value={item}>{item}</li>
															<div className="selected">{selectedTypeOfContract === item ? <Check /> : null}</div>
														</ul>
													)
												})}
												{/* <Check /> */}
											</li>
											<li className={openFilters3 ? "select" : "select close"}>
												<div className="select-content" onClick={()=> setOpenFilters3(!openFilters3)}>
													<p>{dataR.nomDuTroisiemeFiltre}</p>
													<div className="chevron">
														<ChevronDown />
													</div>
												</div>
												{arrayfilters3.map((item)=> {
													return(
														<ul className="select-content-option" onClick={()=> {setSelectedLocation(item)}}>
															<li value={item}>{item}</li>
															<div className="selected">{selectedLocation === item ? <Check /> : null}</div>
														</ul>
													)
												})}
												{/* <Check /> */}
											</li>
										</ul>
									</div>
									<Button label="Enregistrer" labelMobile="Enregistrer" onClick={()=> setOpenPanelFilters(false)}/>
								</div>
							:null}
						</div>
					</div>
					<div className={open ? "bloc-3__grid open" : "bloc-3__grid"}>
						{dataO.map((item)=> {
							return(
								<>
									
									{
										(selectedTeam === dataR.nomDuPremierFiltre && selectedTypeOfContract === dataR.nomDuDeuxiemeFiltre && selectedLocation === dataR.nomDuTroisiemeFiltre) || 
										(item.offres.categorie.indexOf(selectedTeam) !== -1 && item.offres.lieu.indexOf(selectedLocation) !== -1 && item.offres.typeDeContrat.indexOf(selectedTypeOfContract) !== -1) ||
										(item.offres.categorie.indexOf(selectedTeam) !== -1 && selectedTypeOfContract === dataR.nomDuDeuxiemeFiltre && selectedLocation === dataR.nomDuTroisiemeFiltre) ||
										(selectedTeam === dataR.nomDuPremierFiltre && item.offres.typeDeContrat.indexOf(selectedTypeOfContract) !== -1 && item.offres.lieu.indexOf(selectedLocation)) ||
										(selectedTeam === dataR.nomDuPremierFiltre && selectedTypeOfContract === dataR.nomDuDeuxiemeFiltre && item.offres.lieu.indexOf(selectedLocation) !== -1) || 
										(item.offres.categorie.indexOf(selectedTeam) !== -1 && item.offres.typeDeContrat.indexOf(selectedTypeOfContract) !== -1 && item.offres.lieu.indexOf(selectedLocation)) ||
										(item.offres.categorie.indexOf(selectedTeam) !== -1 && selectedTypeOfContract === dataR.nomDuDeuxiemeFiltre && item.offres.lieu.indexOf(selectedLocation) !== -1) ||
										(selectedTeam === dataR.nomDuPremierFiltre && item.offres.typeDeContrat.indexOf(selectedTypeOfContract) !== -1 && item.offres.lieu.indexOf(selectedLocation) !== -1) ?

										<MinCard link={item.id} title={item.offres.titre} tag={item.offres.categorie} place={item.offres.lieu} time={item.offres.typeDeContrat}/>
										
									: null}
								</>
							)
						})}
					</div>
					{dataO.length > 6 && open === false ? <Button label={dataR.bloc3BoutonOuvrir} labelMobile={dataR.bloc3BoutonOuvrirMobile} onClick={openOffers} /> : null}
					{dataO.length > 6 && open === true ? <Button label={dataR.bloc3BoutonFermer} labelMobile={dataR.bloc3BoutonFermerMobile} onClick={openOffers} /> : null}
				</section>
				{slides.length > 0 ? 
				<section className="bloc-4">
					<div className="bloc-4__carousel">
						<h2>{dataR.bloc4Titre}</h2>
						<SwiperSlider slides={slides} />
					</div>
				</section>
				:null}
			</main>
			: <Loader /> }
		</Layout>
	)
}

export default Recruitment;
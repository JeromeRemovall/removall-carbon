import React, {useState, useEffect} from "react"
import { graphql, useStaticQuery } from "gatsby";
import "../scss/templates/aPropos.scss"

import BlocHeader from "../components/blocHeader"
import Description from "../components/description"
import CardList from "../components/cardList"
import CardNumber from "../components/cardNumber"
import CardListIcon from "../components/cardListIcon"
import CardProfil from "../components/profilCard"
import Layout from "../components/layout"
import PopInProfil from "../components/popInProfil"

import Loader from "../components/loader"

import { Helmet } from "react-helmet"

const query = graphql`
	query{
		fr : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "équipe"}}}}}
				sort: {fields: equipe___nom, order: ASC}
			){
			nodes{
                equipe {
					poste
					prenom
					nom
					image{
						sourceUrl
						altText
					}
					logo1 {
						sourceUrl
						altText
					}
					lien1
					logo2 {
						sourceUrl
						altText
					}
					lien2
					description
                }
            }
		}
		en : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "team"}}}}}
				sort: {fields: equipe___nom, order: ASC}
			){
			nodes{
                equipe {
					poste
					prenom
					nom
					image{
						sourceUrl
						altText
					}
					logo1 {
						sourceUrl
						altText
					}
					lien1
					logo2 {
						sourceUrl
						altText
					}
					lien2
					description
                }
            }
		}
	}
`;

function APropos({ pageContext }){
	const equipe = useStaticQuery(query);

	const { dataAPropos } = pageContext;
	const dataA = dataAPropos.APropos;
	const [dataE, setDataE] = useState("");
	const [language, setLanguage] = useState("");

	const [openPopIn, setOpenPopIn] = useState(false);

	const [metaLang, setMetaLang] = useState("");
	const [metaDescription, setMetaDescription] = useState("");

	const [dataPopIn, setDataPopIn] = useState({});

	useEffect(() => {

		if(openPopIn){
			document.querySelector('body').classList.add("stop-scroll");
		}else{
			document.querySelector('body').classList.remove("stop-scroll");
		}

		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setDataE(equipe.fr.nodes);
				setLanguage("fr")
				setMetaLang("fr");
				setMetaDescription("Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone.");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setDataE(equipe.en.nodes);
				setLanguage("en")
				setMetaLang("en");
				setMetaDescription("Removall is specialized in designing carbon funds and developing carbon sequestration projects.");
			}
		}
		getLanguage();

		function scrollTo(){
			let url = (document.location.href).split('#')[1];
			if(url && document.getElementById(url)){
				document.getElementById(url).scrollIntoView()
			}
		}
		scrollTo()   
	}, [dataE, equipe.en.nodes, equipe.fr.nodes, dataPopIn, openPopIn])

	function addDataPopIn(i){
		if(dataA && dataE){
			if(i === 1){
				setDataPopIn({
					firstname: dataA.bloc7Item1Titre,
					job: dataA.bloc7Item1Texte,
					img: dataA.bloc7Item1Image.sourceUrl,
					icon1: dataA.bloc7Item1Icon1.sourceUrl,
					link1: dataA.bloc7Item1Lien1,
					icon2: dataA.bloc7Item1Icon2.sourceUrl,
					link2: dataA.bloc7Item1Lien2,
					alt: dataA.bloc7Item1Image.altText,
					altIcon1: dataA.bloc7Item1Icon1.altText,
					altIcon2: dataA.bloc7Item1Icon2.altText,
					description: dataA.bloc7Item1Description,
				})
			}else if(i === 2){
				setDataPopIn({
					firstname: dataA.bloc7Item2Titre,
					job: dataA.bloc7Item2Texte,
					img: dataA.bloc7Item2Image.sourceUrl,
					icon1: dataA.bloc7Item2Icon1.sourceUrl,
					link1: dataA.bloc7Item2Lien1,
					icon2: dataA.bloc7Item2Icon2.sourceUrl,
					link2: dataA.bloc7Item2Lien2,
					alt: dataA.bloc7Item1Image.altText,
					altIcon1: dataA.bloc7Item2Icon1.altText,
					altIcon2: dataA.bloc7Item2Icon2.altText,
					description: dataA.bloc7Item2Description,
				})
			}else{
				setDataPopIn({
					firstname: i.prenom,
					lastname: i.nom,
					job: i.poste,
					img: i.image.sourceUrl,
					icon1: i.logo1.sourceUrl,
					link1: i.lien1,
					icon2: i.logo2.sourceUrl,
					link2: i.lien2,
					alt: i.image.altText,
					altIcon1: i.logo1.altText,
					altIcon2: i.logo2.altText,
					description: i.description,
				})
			}
			setOpenPopIn(true)
		}
	}

	function clickOverlay(e) {
		if(e.target.className === "pop-in__profil__overlay"){
			setOpenPopIn(false)
		}
	}

	console.log(dataA.bloc8Visible);

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataA.titreOngletDeLaPage}</title>
				{/* <meta name="description" content={metaDescription} /> */}
			</Helmet>
			{dataA && dataE ?
			<main className="a-propos">
				{openPopIn ? <PopInProfil onOverlay={(e)=> clickOverlay(e)} onClose={()=> setOpenPopIn(false)} text={dataPopIn.description} firstname={dataPopIn.firstname} lastname={dataPopIn.lastname} job={dataPopIn.job} img={dataPopIn.img} icon1={dataPopIn.icon1} icon2={dataPopIn.icon2} link1={dataPopIn.link1} link2={dataPopIn.link2} alt={dataPopIn.alt} altIcon1={dataPopIn.altIcon1} altIcon2={dataPopIn.altIcon2} /> : null }
				<BlocHeader title={dataA.titre} text={dataA.description} img={dataA.imageDeFond.sourceUrl} alt={dataA.imageDeFond.altText}/>
				<section className="bloc-1" id={language === "fr" ? "a-propos" : "about"}>
					<Description title={dataA.bloc1Titre} text={dataA.bloc1Texte}/>
				</section>
				<section className="bloc-2">
					<div className="bloc-2__image">
						<img src={dataA.bloc2Image.sourceUrl} alt={dataA.bloc2Image.altText}/>
					</div>
					<div className="bloc-2__content">
						<h2>{dataA.bloc2Titre1}</h2>
						<div dangerouslySetInnerHTML={{ __html: dataA.bloc2Texte1}}></div>
						<h2>{dataA.bloc2Titre2}</h2>
						<div dangerouslySetInnerHTML={{ __html: dataA.bloc2Texte2}}></div>
					</div>
				</section>
				<section className="bloc-3" id={language === "fr" ? "notre-vision" : "our-vision"}>
					<div className="bloc-3__image">
						<img src={dataA.bloc3Image.sourceUrl} alt={dataA.bloc3Image.altText} />
						<div className="bloc-3__background-mobile"></div>
					</div>
					<div className="bloc-3__content">
						<h2>{dataA.bloc3Titre}</h2>
						<div dangerouslySetInnerHTML={{ __html: dataA.bloc3Texte}}></div>
					</div>
				</section>
				<section className="bloc-4" id={language === "fr" ? "notre-role" : "our-role"}>
					<Description title={dataA.bloc4Titre} text={dataA.bloc4Texte}/>
					<div className="bloc-4__content">
						<CardList title={dataA.bloc4Item1Titre} text={dataA.bloc4Item1Texte}  img={dataA.bloc4Item1Image.sourceUrl} alt={dataA.bloc4Item1Image.altText}/>
						<CardList  title={dataA.bloc4Item2Titre} text={dataA.bloc4Item2Texte} img={dataA.bloc4Item2Image.sourceUrl} alt={dataA.bloc4Item2Image.altText}/>
						<CardList title={dataA.bloc4Item3Titre} text={dataA.bloc4Item3Texte} img={dataA.bloc4Item3Image.sourceUrl} alt={dataA.bloc4Item3Image.altText}/>
					</div>
				</section>
				<section className="bloc-5" id={language === "fr" ? "notre-methodologie" : "our-methodology"}>
					<h2>{dataA.bloc5Titre}</h2>
					<div dangerouslySetInnerHTML={{ __html: dataA.bloc5Texte}}></div>
					<div className="bloc-5__content">
						<CardNumber number={dataA.bloc5Carte1Number} text={dataA.bloc5Carte1Titre} />
						<CardNumber number={dataA.bloc5Carte2Number}  text={dataA.bloc5Carte2Titre} />
						<CardNumber number={dataA.bloc5Carte3Number}  text={dataA.bloc5Carte3Titre} />
						<CardNumber number={dataA.bloc5Carte4Number}  text={dataA.bloc5Carte4Titre} />
					</div>
				</section>
				<section className="bloc-6" id={language === "fr" ? "nos-valeurs" : "our-values"}>
					<h2>{dataA.bloc6Titre}</h2>
					<div className="bloc-6__content">
						<CardListIcon title={dataA.bloc6Item1Titre} text={dataA.bloc6Item1Texte} icon={dataA.bloc6Item1Icon.sourceUrl} alt={dataA.bloc6Item1Icon.altText}/>
						<CardListIcon title={dataA.bloc6Item2Titre} text={dataA.bloc6Item2Texte} icon={dataA.bloc6Item2Icon.sourceUrl} alt={dataA.bloc6Item2Icon.altText}/>
						<CardListIcon title={dataA.bloc6Item3Titre} text={dataA.bloc6Item3Texte} icon={dataA.bloc6Item3Icon.sourceUrl} alt={dataA.bloc6Item3Icon.altText}/>
						<CardListIcon title={dataA.bloc6Item4Titre} text={dataA.bloc6Item4Texte} icon={dataA.bloc6Item4Icon.sourceUrl} alt={dataA.bloc6Item4Icon.altText}/>
					</div>
				</section>
				<section className="bloc-7" id={language === "fr" ? "notre-equipe" : "our-team"}>
					<h2>{dataA.bloc7Titre}</h2>
					<div dangerouslySetInnerHTML={{ __html: dataA.bloc7Texte}}></div>
					<div className="bloc-7__content">
						<CardProfil onClick={()=> addDataPopIn(1)} img={dataA.bloc7Item1Image.sourceUrl} firstname={dataA.bloc7Item1Titre} text={dataA.bloc7Item1Texte} icon1={dataA.bloc7Item1Icon1.sourceUrl} icon2={dataA.bloc7Item1Icon2.sourceUrl} alt={dataA.bloc7Item1Image.altText} altIcon1={dataA.bloc7Item1Icon1.altText} altIcon2={dataA.bloc7Item1Icon2.altText} link1={dataA.bloc7Item1Lien1} link2={dataA.bloc7Item1Lien2}/>
						<CardProfil onClick={()=> addDataPopIn(2)} img={dataA.bloc7Item2Image.sourceUrl} firstname={dataA.bloc7Item2Titre} text={dataA.bloc7Item2Texte} icon1={dataA.bloc7Item2Icon1.sourceUrl} icon2={dataA.bloc7Item2Icon2.sourceUrl} alt={dataA.bloc7Item2Image.altText} altIcon1={dataA.bloc7Item2Icon1.altText} altIcon2={dataA.bloc7Item2Icon2.altText} link1={dataA.bloc7Item2Lien1} link2={dataA.bloc7Item2Lien2}/>
					</div>
				</section>
				{dataE.length > 0 && dataA.bloc8Visible === true ?
					<section className="bloc-8">
						<div className="bloc-8_container">
							<Description title={dataA.bloc8Titre} text={dataA.bloc8Texte}/>
							<div className="bloc-8__content">
								{dataE.map((item)=> {
									return(
										<>
											<CardProfil onClick={()=> addDataPopIn(item.equipe)} img={item.equipe.image.sourceUrl} firstname={item.equipe.prenom} lastname={item.equipe.nom} text={item.equipe.poste} icon1={item.equipe.logo1.sourceUrl} icon2={item.equipe.logo2.sourceUrl} key={item} alt={item.equipe.image.altText} altIcon1={item.equipe.logo1.altText} altIcon2={item.equipe.logo2.altText} link1={item.equipe.lien1} link2={item.equipe.lien2} />
										</>
									)
								})}
							</div>	
						</div>	
					</section>
				:null}
			</main>
			: <Loader /> }
		</Layout>
	)
}

export default APropos;
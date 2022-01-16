import React, {useEffect, useState} from "react"
import { graphql, useStaticQuery } from "gatsby";
import "../scss/templates/project.scss"
import Masonry from 'react-masonry-css'

import BlocHeader from "../components/blocHeader"
import Description from "../components/description"
import Layout from "../components/layout"
import CardFull from "../components/cardFull"

import Loader from "../components/loader"
import { Helmet } from "react-helmet"

const query = graphql`
	query{
		frCategory1 :
		 	allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "séquestration carbonne"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes{
				projects{
					texte
					titre
					image {
						sourceUrl
						altText
					}
				}
			}
		}
		frCategory2 : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "réduction d’émission"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes{
				projects{
					texte
					titre
					image {
						sourceUrl
						altText
					}
				}
			}
		}
		enCategory1 : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "carbon sequestration"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes{
				projects{
					texte
					titre
					image {
						sourceUrl
						altText
					}
				}
			}
		}
		enCategory2 : allWpPost(
				filter: {categories: {nodes: {elemMatch: {name: {eq: "emission reduction"}}}}}
				sort: {fields: date, order: ASC}
			){
			nodes{
				projects{
					texte
					titre
					image {
						sourceUrl
						altText
					}
				}
			}
		}
	}
`

function Project({ pageContext }){
	const { dataProject } = pageContext;
	const dataP = dataProject.project;

	const projects = useStaticQuery(query);
	const [dataCP1, setDataCategory1]  = useState("");
	const [dataCP2, setDataCategory2]  = useState("");

	const [metaLang, setMetaLang] = useState("");
	const [metaDescription, setMetaDescription] = useState("");

	useEffect(() => {
		function getLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setDataCategory1(projects.frCategory1.nodes);
				setDataCategory2(projects.frCategory2.nodes);
				setMetaLang("fr");
				setMetaDescription("Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone.");
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setDataCategory1(projects.enCategory1.nodes);
				setDataCategory2(projects.enCategory2.nodes);
				setMetaLang("en");
				setMetaDescription("Removall is specialized in designing carbon funds and developing carbon sequestration projects.");
			}
		}
		getLanguage();
	}, [dataCP1, dataCP2, projects.enCategory1.nodes, projects.enCategory2.nodes, projects.frCategory1.nodes, projects.frCategory2.nodes])

	return(
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataP.titreOngletDeLaPage}</title>
				{/* <meta name="description" content={metaDescription} /> */}
			</Helmet>
			{dataP ?
				<main className="project">
					<BlocHeader title={dataP.titre} img={dataP.image.sourceUrl} text={dataP.description} alt={dataP.image.altText}/>
					<section className="bloc-1">
						<Description title={dataP.bloc1Titre} text={dataP.bloc1Texte}/>
						<div className="bloc-1__content">
						{dataCP1 !== "" ? 
							<>
							<Masonry
								breakpointCols={2}
								className="my-masonry-grid"
								columnClassName="my-masonry-grid_column">
								{dataCP1.map((item)=> {
									return(
										<CardFull img={item.projects.image.sourceUrl} title={item.projects.titre} text={item.projects.texte} key={item} alt={item.projects.image.altText}/>
									)
								})}
							</Masonry>
							<Masonry
								breakpointCols={1}
								className="my-masonry-grid-mobile"
								columnClassName="my-masonry-grid_column">
								{dataCP1.map((item)=> {
									return(
										<CardFull img={item.projects.image.sourceUrl} title={item.projects.titre} text={item.projects.texte} key={item} alt={item.projects.image.altText}/>
									)
								})}
							</Masonry>
							</>
						: null}
						</div>
					</section>
					<section className="bloc-2">
						<Description title={dataP.bloc2Titre} text={dataP.bloc2Texte}/>
						<div className="bloc-2__content">
							{dataCP2 !== "" ? 
								<>
								<Masonry
								breakpointCols={2}
								className="my-masonry-grid"
								columnClassName="my-masonry-grid_column">
								{dataCP2.map((item)=> {
									return(
										<CardFull img={item.projects.image.sourceUrl} title={item.projects.titre} text={item.projects.texte} key={item} alt={item.projects.image.altText}/>
									)
								})}
								</Masonry>
								<Masonry
								breakpointCols={1}
								className="my-masonry-grid-mobile"
								columnClassName="my-masonry-grid_column">
								{dataCP2.map((item)=> {
									return(
										<CardFull img={item.projects.image.sourceUrl} title={item.projects.titre} text={item.projects.texte} key={item} alt={item.projects.image.altText}/>
									)
								})}
								</Masonry>
								</>
							: null}
						</div>
					</section>
				</main>
			: <Loader /> }
		</Layout>
	)
}

export default Project;
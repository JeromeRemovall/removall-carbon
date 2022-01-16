import React, {useState, useEffect} from "react"
import ButtonLink from "../components/buttonLink"
import { graphql, useStaticQuery } from "gatsby";
import "../scss/pages/404.scss"
import NavBar from "../components/navbar"

const query = graphql`
  query{
    fr : allWpPage(filter: {category: {name: {eq: "404"}}, language: {code: {}, slug: {eq: "fr"}}}){
      nodes{
        error {
          titre
          titreOngletDeLaPage
          texte
          bouton
          boutonMobile
        }
        slug
        language {
            slug
        }
      }
    }
    en : allWpPage(filter: {category: {name: {eq: "404"}}, language: {code: {}, slug: {eq: "en"}}}){
      nodes{
        error {
          titre
          titreOngletDeLaPage
          texte
          bouton
          boutonMobile
        }
        slug
        language {
            slug
        }
      }
    }
  }
`


const NotFoundPage = () => {
  const error = useStaticQuery(query);
  const [data404, setData404] = useState("");
  const [path, setPath] = useState("")

  useEffect(() => {
    function getLanguage(){
      if(window.localStorage.getItem("preferredLanguage") === "fr" || ! window.localStorage.getItem("preferredLanguage")){
        setData404(error.fr.nodes[0].error);
        setPath("fr");
      }else if(window.localStorage.getItem("preferredLanguage") === "en"){
        setData404(error.en.nodes[0].error);
        setPath("en");
      }
    }
		getLanguage();
	}, [data404, error.en.nodes, error.fr.nodes])

  return (
    <>
      <NavBar />
      <main className="error-404">
        <h2>{data404.titre}</h2>
        <p>{data404.texte}</p>
        <ButtonLink label={data404.bouton} labelMobile={data404.boutonMobile} to={`/${path}`} />
      </main>
    </>
  )
}

export default NotFoundPage

import React, {
  useEffect,
  useState,
} from "react";
import { graphql, useStaticQuery } from "gatsby";

import Navbar from "../components/ressources/navbar";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

import "../scss/templates/actuality.scss";
import Header from "../components/ressources/header";
import ContainerCard from "../components/ressources/containerCard";
import { merge } from "d3";


function Actuality({ pageContext }) {
  const { dataResource } = pageContext;
  const [metaLang, setMetaLang] = useState("");
  const [actuality, setActuality] = useState(null);
  const dataR = dataResource.ressource;
  const data = useStaticQuery(query);

  useEffect(() => {
    console.log(data)
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        let mergedData = mergeOldDataObject(data.frNews);
        mergedData = mergedData.concat(mergeNewDataObject(data.enNewNews));
        setActuality(mergedData);
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        let mergedData = mergeOldDataObject(data.enNews);
        mergedData = mergedData.concat(mergeNewDataObject(data.enNewNews));
        setActuality(mergedData);
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [data]);

  console.log(dataR);

  const mergeOldDataObject = (data) => {
    return data.nodes.map((item, index) => {
      return {
        ...item.news,
        texte: item.news.texteActualite,
        fichier: {mediaItemUrl: item.news.boutonLien},
        date: data.edges[index].node.date,
      };
    });
  };

  const mergeNewDataObject = (data) => {
    return data.edges.map((item, index) => {
      console.log(item)
      return {
        ...item.node.articles,
        image: item.node.articles.photoMiseEnAvant,
        texte: item.node.articles.sousTitre,
        date: item.node.date,
        slug: item.node.slug,
      };
    });
  }


  return (
    <Layout>
      {dataR && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <html lang={metaLang} />
            <title>{dataR?.bloc1Titre}</title>
          </Helmet>
          <main className="actuality">
            <Navbar data={dataR} lang={metaLang} active={dataR?.bloc1Titre} />
            <section>
              <Header title={dataR.bloc1Titre} description={dataR.bloc1Texte} />
              {actuality && (
                <ContainerCard items={actuality} lang={metaLang}/>
              )}
            </section>
          </main>
        </>
      )}
    </Layout>
  );
}

export default Actuality;


const query = graphql`
  query {
    frNews: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "actualités" }
            }
          }
        }
      }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          date
        }
      }
      nodes {
        news {
          texteActualite
          titre
          legende
          image {
            sourceUrl
            altText
          }
          bouton
          boutonMobile
          boutonLien
        }
        date
      }
    }
    enNews: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "news" } }
          }
        }
      }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          date
        }
      }
      nodes {
        news {
          texteActualite
          titre
          legende
          image {
            sourceUrl
            altText
          }
          bouton
          boutonMobile
          boutonLien
        }
      }
    }
    enNewNews: allWpPost(
    filter: {categories: {nodes: {elemMatch: {name: {eq: "Uncategorized"}}}}, title: {eq: "Article test, non visible"}}
  ) {
    edges {
      node {
        id
        articles {
          titre
          sousTitre
          duree
          photoMiseEnAvant {
            altText
            sourceUrl
          }
          tags {
            name
          }
          auteur {
            name
          }
        }
        date
        slug
      }
    }
    }
  }
`;
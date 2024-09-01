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
  const [filtre, setFiltre] = useState(null);
  const dataR = dataResource.ressource;
  const data = useStaticQuery(query);


  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const filtre = queryParameters.get("filtre")
    setFiltre(filtre)
    
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        const oldData = mergeOldDataObject(data.frNews);
        const newData = mergeNewDataObject(data.frNewNews);
        const mergedData = merge(oldData, newData);
        setActuality(mergedData);
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        const oldData = mergeOldDataObject(data.enNews);
        const newData = mergeNewDataObject(data.enNewNews);
        const mergedData = merge(oldData, newData);
        setActuality(mergedData);
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [data]);


  const merge = (oldData, newData) => {
    console.log(oldData, newData)
    newData.map((item, index) => {
      const i = oldData.findIndex((element) => {
        return element.id === item.id;
      })
      if (i !== -1 && item.auteur !== null) {
        oldData[i] = item;
      } else if (i === -1) {
        oldData.push(item);
      }
    });
    return oldData;
  }

  const mergeOldDataObject = (data) => {
    return data.nodes.map((item, index) => {
      return {
        ...item.news,
        texte: item.news.texteActualite,
        fichier: {mediaItemUrl: item.news.boutonLien},
        date: data.edges[index].node.date,
        id: item.id,
      };
    });
  };

  const mergeNewDataObject = (data) => {
    return data.edges.map((item, index) => {
      return {
        ...item.node.articles,
        image: item.node.articles.photoMiseEnAvant,
        texte: item.node.articles.sousTitre,
        date: item.node.date,
        slug: item.node.slug,
        id: item.node.id,
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
                <ContainerCard items={actuality} lang={metaLang} filtre={filtre ? filtre : ""}/>
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
        id
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
        id
      }
    }
    enNewNews: allWpPost(
    filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}}
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
        id
      }
    }
  }
  frNewNews: allWpPost(
    filter: {categories: {nodes: {elemMatch: {name: {eq: "actualités"}}}}}
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
        id
      }
    }
    }
  }
`;
import React, {
  useEffect,
  useState,
} from "react";
import { graphql, useStaticQuery } from "gatsby";

import Navbar from "../components/ressources/navbar";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

import "../scss/templates/resources.scss";
import Header from "../components/ressources/header";
import ContainerCard from "../components/ressources/containerCard";

const query = graphql`
  query {
    frResources: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: {
                eq: "ressources et publications"
              }
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
        resources {
          image {
            sourceUrl
            altText
          }
          titre
          texteRessource
          bouton
          boutonMobile
          fichier {
            mediaItemUrl
            title
          }
          tags {
            name
          }
        }
      }
    }
    enResources: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: {
                eq: "resources and publications"
              }
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
        resources {
          image {
            sourceUrl
            altText
          }
          titre
          texteRessource
          bouton
          boutonMobile
          fichier {
            mediaItemUrl
            title
          }
          tags {
            name
          }
        }
      }
    }
  }
`;

function Resource({ pageContext }) {
  const { dataResource } = pageContext;
  const [metaLang, setMetaLang] = useState("");
  const [ressource, setRessource] = useState(null);
  const dataR = dataResource.ressource;
  const data = useStaticQuery(query);

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setMetaLang("fr");
        const mergedData = mergeObject(data.frResources);
        setRessource(mergedData);
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setMetaLang("en");
        const mergedData = mergeObject(data.enResources);
        setRessource(mergedData);
      }
    }
    getLanguage();
  }, [data]);
  

  const mergeObject = (data) => {
    return data.nodes.map((item, index) => {
      return {
        ...item.resources,
        texte: item.resources.texteRessource,
        date: data.edges[index].node.date,
      };
    });
  };

  return (
    <Layout>
      {dataR && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <html lang={metaLang} />
            <title>{dataR?.bloc2Titre}</title>
          </Helmet>
          <main className="resources">
            <Navbar data={dataR} lang={metaLang} active={dataR?.bloc2Titre} />
            <section>
              <Header title={dataR.bloc2Titre} description={dataR.bloc2Texte} />
              {ressource && (
                <ContainerCard items={ressource} lang={metaLang} type="ressource"/>
              )}
            </section>
          </main>
        </>
      )}
    </Layout>
  );
}

export default Resource;

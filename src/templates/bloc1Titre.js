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
        }
      }
    }
    frEvents: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "évènements" }
            }
          }
        }
      }
    ) {
      nodes {
        events {
          jour
          mois
          heures
          adresse
          image {
            sourceUrl
            altText
          }
          texte
          dateDeLevenement
          speaker
        }
      }
    }
    enEvents: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "events" } }
          }
        }
      }
    ) {
      nodes {
        events {
          jour
          mois
          heures
          adresse
          image {
            sourceUrl
            altText
          }
          texte
          speaker
          dateDeLevenement
        }
      }
    }
  }
`;

function Actuality({ pageContext }) {
  const { dataResource } = pageContext;
  const [metaLang, setMetaLang] = useState("");
  const dataR = dataResource.ressource;
  const data = useStaticQuery(query);

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [data]);

  console.log(dataR);

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
            </section>
          </main>
        </>
      )}
    </Layout>
  );
}

export default Actuality;

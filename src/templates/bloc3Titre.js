import React, {
  useEffect,
  useState,
} from "react";
import { graphql, useStaticQuery } from "gatsby";

import Navbar from "../components/ressources/navbar";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

import "../scss/templates/events.scss";
import Header from "../components/ressources/header";
import Events from "../components/events";
import { set } from "d3";
import ContainerCard from "../components/ressources/containerCard";

const query = graphql`
  query {
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
            node {
              altText
              sourceUrl
            }
          }
          texte
          dateDeLevenement
          speaker
          lienCliquable
          enLigne
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
            node {
              altText
              sourceUrl
            }
          }
          texte
          speaker
          dateDeLevenement
          lienCliquable
          enLigne
        }
      }
    }
  }
`;

function Event({ pageContext }) {
  const { dataResource } = pageContext;
  const [metaLang, setMetaLang] = useState("");
  const [events, setEvents] = useState([]);
  const dataR = dataResource.ressource;
  const data = useStaticQuery(query);

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        data.frEvents.nodes.sort(function (a, b) {
          return (
            new Date(
              b.events.dateDeLevenement?.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$2/$1/$3"
              )
            ) -
            new Date(
              a.events.dateDeLevenement?.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$2/$1/$3"
              )
            )
          );
        });
        setEvents(data.frEvents.nodes);
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        data.enEvents.nodes.sort(function (a, b) {
          return (
            new Date(
              b.events.dateDeLevenement?.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$2/$1/$3"
              )
            ) -
            new Date(
              a.events.dateDeLevenement?.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$2/$1/$3"
              )
            )
          );
        });
        setEvents(data.enEvents.nodes);
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [data]);

  console.log(data.frEvents.nodes);
  return (
    <Layout>
      {dataR && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <html lang={metaLang} />
            <title>{dataR?.bloc3Titre}</title>
          </Helmet>
          <main className="events">
            <Navbar
              data={dataR}
              lang={metaLang}
              active={dataR?.bloc3Titre}
            />
            <section>
              <Header
                title={dataR.bloc3Titre}
                description={dataR.bloc3Texte}
              />
              {events && (
                <ContainerCard
                  items={events}
                  lang={metaLang}
                  type="events"
                />
              )}
            </section>
          </main>
        </>
      )}
    </Layout>
  );
}

export default Event;

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

function Event({ pageContext }) {
  const { dataResource } = pageContext;
  const [metaLang, setMetaLang] = useState("");
  const [events, setEvents] = useState([]);
  const dataR = dataResource.ressource;
  const data = useStaticQuery(query);
  console.log(data)
  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setEvents(data.frEvents.nodes);
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setEvents(data.enEvents.nodes);
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [data]);


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
            <Navbar data={dataR} lang={metaLang} active={dataR?.bloc3Titre} />
            <section>
              <Header title={dataR.bloc3Titre} description={dataR.bloc3Texte} />
              <div className="grid">
                {events?.map((event, index) => (
                  <Events
                    img={event.events.image.sourceUrl}
                    day={event.events.jour}
                    month={event.events.mois}
                    text={event.events.texte}
                    hours={event.events.heures}
                    adress={event.events.adresse}
                    alt={event.events.image.altText}
                    isSpeaker={event.events.speaker}
                    lang={metaLang}
                    key={index}
                   />
                )
                )}
              </div>
            </section>
          </main>
        </>
      )}
    </Layout>
  );
}

export default Event;

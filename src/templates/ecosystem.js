import React, {
  useEffect,
  useState,
} from "react";
import BlocHeader from "../components/blocHeader";

import "../scss/templates/ecosystem.scss";
import Layout from "../components/layout";

import Loader from "../components/loader";
import { graphql, useStaticQuery } from "gatsby";

import { Helmet } from "react-helmet";

// import Swiper and modules styles
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { isMobile } from "../utils/global";

const query = graphql`
  query {
    blocClients: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "clients" } }
          }
        }
      }
    ) {
      nodes {
        logoClientOuPartenaires {
          logo {
            node {
              sourceUrl
              altText
            }
          }
          lienVersSite
        }
      }
    }
    blocCustomers: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "customers" }
            }
          }
        }
      }
    ) {
      nodes {
        logoClientOuPartenaires {
          logo {
            node {
              sourceUrl
              altText
            }
          }
          lienVersSite
        }
      }
    }
    blocPartenaires: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "partenaires" }
            }
          }
        }
      }
      sort: { title: ASC }
    ) {
      edges {
        node {
          logoClientOuPartenaires {
            logo {
              node {
                altText
                sourceUrl
              }
            }
            lienVersSite
          }
          title
        }
      }
    }
    blocPartners: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "partners" }
            }
          }
        }
      }
      sort: { title: ASC }
    ) {
      edges {
        node {
          logoClientOuPartenaires {
            logo {
              node {
                altText
                sourceUrl
              }
            }
            lienVersSite
          }
          title
        }
      }
    }
    verbatimsFR: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              slug: { eq: "verbatims" }
            }
          }
        }
      }
      sort: { verbatims: { ordre: ASC } }
    ) {
      edges {
        node {
          verbatims {
            fonctionDeLauteur
            nomDeLauteur
            ordre
            verbatim
            photoDeLauteur {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    verbatimsEN: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              slug: { eq: "verbatims-en" }
            }
          }
        }
      }
      sort: {
        fields: verbatims___ordre
        order: ASC
      }
    ) {
      edges {
        node {
          verbatims {
            fonctionDeLauteur
            nomDeLauteur
            ordre
            verbatim
            photoDeLauteur {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

function Ecosystem({ pageContext }) {
  const { dataEcosystem } = pageContext;
  const dataE = dataEcosystem.ecosysteme;

  const data = useStaticQuery(query);
  const [dataVerbatims, setDataVerbatims] =
    useState("");
  const [dataCustomers, setDataCustomers] =
    useState("");
  const [dataPartners, setDataPartners] =
    useState("");
  const [metaLang, setMetaLang] = useState("");
  const [space, setSpace] = useState(0);

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setDataCustomers(data.blocClients.nodes);
        setDataPartners(
          data.blocPartenaires.edges
        );
        // setDataVerbatims(data.verbatimsFR.edges);
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setDataCustomers(
          data.blocCustomers.nodes
        );
        setDataPartners(data.blocPartners.edges);
        // setDataVerbatims(data.verbatimsEN.edges);
        setMetaLang("en");
      }
    }
    getLanguage();
    if (!isMobile()) {
      setSpace(-(window.innerWidth / 2.8));
    }
  }, [
    data.blocClients.nodes,
    data.blocCustomers.nodes,
    data.blocPartenaires.edges,
    data.blocPartners.edges,
  ]);
  console.log(data);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataE.titreOngletDeLaPage}</title>
      </Helmet>
      {dataE ? (
        <main className="ecosystem">
          <BlocHeader
            title={dataE.titre}
            text={dataE.description}
            img={dataE.imageDeFond.node.sourceUrl}
            alt={dataE.imageDeFond.node.altText}
          />
          {dataPartners.length === 0 &&
          dataCustomers.length === 0 ? (
            <section className="bloc-content">
              <p>{dataE.phrasePageVide}</p>
            </section>
          ) : null}
          {dataPartners.length > 0 ? (
            <section className="bloc-content">
              <h2>{dataE.bloc1Titre}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataE.bloc1Texte,
                }}
              ></div>
              <div className="bloc-logo">
                {dataPartners.map(
                  (logo, index) => {
                    return (
                      <a
                        key={`link-${index}`}
                        href={
                          logo.node
                            .logoClientOuPartenaires
                            .lienVersSite
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="bloc-logo__image"
                      >
                        <img
                          key={`logo-${index}`}
                          src={
                            logo.node
                              .logoClientOuPartenaires
                              ?.logo?.node
                              .sourceUrl
                          }
                          alt={
                            logo.node
                              .logoClientOuPartenaires
                              ?.logo?.node.altText
                          }
                        />
                      </a>
                    );
                  }
                )}
              </div>
            </section>
          ) : null}
          {dataCustomers.length > 0 ? (
            <section className="bloc-content">
              <h2>{dataE.bloc2Titre}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataE.bloc2Texte,
                }}
              ></div>
              <div className="bloc-logo">
                {dataCustomers.map((logo) => {
                  return (
                    <a
                      href={
                        logo
                          .logoClientOuPartenaires
                          .lienVersSite
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="bloc-logo__image"
                    >
                      <img
                        key={logo}
                        src={
                          logo
                            .logoClientOuPartenaires
                            .logo.node.sourceUrl
                        }
                        alt={
                          logo
                            .logoClientOuPartenaires
                            .logo.node.altText
                        }
                      />
                    </a>
                  );
                })}
              </div>
            </section>
          ) : null}
          <section className="verba_bloc">
            {dataVerbatims.length > 0 ? (
              <>
                <h2>{dataE.bloc2Titre}</h2>
                <div className="container_verba">
                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                      Autoplay,
                    ]}
                    spaceBetween={space}
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    className="swiper_verbatims"
                    autoplay={{
                      delay: 2500,
                      pauseOnMouseEnter: true,
                    }}
                  >
                    {dataVerbatims.map(
                      (verbatim, index) => (
                        <SwiperSlide>
                          <div className="content_slide">
                            <p>
                              "
                              {
                                verbatim.node
                                  .verbatims
                                  .verbatim
                              }
                              "
                            </p>
                            <div className="slide_info">
                              {verbatim.node
                                .verbatims
                                .photoDeLauteur ? (
                                <img
                                  src={
                                    verbatim.node
                                      .verbatims
                                      .photoDeLauteur
                                      .node
                                      .mediaItemUrl
                                  }
                                  alt=""
                                />
                              ) : null}
                              <p className="auteur">
                                {
                                  verbatim.node
                                    .verbatims
                                    .nomDeLauteur
                                }
                              </p>
                              <p className="fonction">
                                {
                                  verbatim.node
                                    .verbatims
                                    .fonctionDeLauteur
                                }
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    )}
                  </Swiper>
                </div>
              </>
            ) : null}
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Ecosystem;

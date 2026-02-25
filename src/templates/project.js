import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../scss/templates/project.scss";
import Masonry from "react-masonry-css";
import { geo } from "d3";
import DataMap from "datamaps";

import BlocHeader from "../components/blocHeader";
import Description from "../components/description";
import Layout from "../components/layout";
import CardFull from "../components/cardFull";

import Loader from "../components/loader";
import { Helmet } from "react-helmet";
import Maps from "../utils/maps";
import { isMobile } from "../utils/global";

const query = graphql`
  query {
    frCategory1: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: {
                eq: "séquestration carbonne"
              }
            }
          }
        }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        projects {
          texte
          titre
          image {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
    frCategory2: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "réduction d’émission" }
            }
          }
        }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        projects {
          texte
          titre
          image {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
    enCategory1: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "carbon sequestration" }
            }
          }
        }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        projects {
          texte
          titre
          image {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
    enCategory2: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "emission reduction" }
            }
          }
        }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        projects {
          texte
          titre
          image {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
    projectsMap: allWpAllPays(
      filter: {
        posts: {
          nodes: {
            elemMatch: {
              categories: {
                nodes: {
                  elemMatch: {
                    name: { in: "carte" }
                  }
                }
              }
            }
          }
        }
      }
    ) {
      edges {
        node {
          posts {
            nodes {
              projetsMap {
                nomDuProjet
                nomDuProjetEn
                imageDuProjet {
                  node {
                    mediaItemUrl
                  }
                }
              }
              title
            }
          }
          slug
          name
          paysTax {
            capitale
            code
            nomDuPays
          }
        }
      }
    }
  }
`;

function Project({ pageContext }) {
  const { dataProject } = pageContext;
  const dataP = dataProject.project;

  const projects = useStaticQuery(query);
  const [dataCP1, setDataCategory1] =
    useState("");
  const [dataCP2, setDataCategory2] =
    useState("");

  const [metaLang, setMetaLang] = useState("");
  const mapsRef = useRef(null);

  const zoomIn = () => mapsRef.current?.zoomIn();
  const zoomOut = () => mapsRef.current?.zoomOut();

  let projectionMobile = function (element) {
    var projection = geo
      .equirectangular()
      .center([-18, -25])
      .rotate([0, 0])
      .scale(140)
      .translate([
        element.offsetWidth / 2,
        element.offsetHeight / 2,
      ]);
    var path = geo.path().projection(projection);

    return { path: path, projection: projection };
  };

  useEffect(() => {
    if (!isMobile()) {
      projectionMobile = null;
    }
    let lang;
    if (
      window.location.href.match("/fr$") ||
      window.location.href.match("/fr/")
    ) {
      lang = "fr";
    } else if (
      window.location.href.match("/en$") ||
      window.location.href.match("/en/")
    ) {
      lang = "en";
    }

    const maps = new Maps(null);
    mapsRef.current = maps;
    maps.clearData(projects.projectsMap.edges, lang);

    var map = new DataMap(
      {
        element: document.querySelector("#map"),
        setProjection: projectionMobile,
        fills: {
          defaultFill: "#EBF2FF",
          project: "#B7CBFF",
        },
        data: maps.data,
        responsive: true,
        geographyConfig: {
          borderWidth: 1,
          highlightOnHover: false,
          popupOnHover: false,
          borderOpacity: 1,
          borderColor: "#C6CFE7",
        },
      },
      []
    );

    // Zoom + drag : initialiser Maps avec le SVG (après création du DataMap)
    maps.setMapElement(document.querySelector("#map svg"));
    maps.initControls();

    // Tooltip custom indépendant de la logique interne de Datamaps
    const mapElement = document.querySelector("#map");
    if (!mapElement) {
      return;
    }

    const tooltip = document.createElement("div");
    tooltip.className = "map_custom_tooltip";
    mapElement.appendChild(tooltip);

    const paths = mapElement.querySelectorAll("svg .datamaps-subunit");

    const updateTooltipPosition = (event) => {
      const rect = mapElement.getBoundingClientRect();
      tooltip.style.left = `${event.clientX - rect.left + 10}px`;
      tooltip.style.top = `${event.clientY - rect.top + 10}px`;
    };

    const showTooltip = (event) => {
      const path = event.currentTarget;
      const dataInfo = path.getAttribute("data-info");
      if (!dataInfo) return;

      let data;
      try {
        data = JSON.parse(dataInfo);
      } catch {
        return;
      }

      const classes = path.getAttribute("class")?.split(" ") || [];
      const id = classes[1];

      const html = maps.templatePopIn({ id }, data);
      if (!html) return;

      tooltip.innerHTML = html;
      updateTooltipPosition(event);
      tooltip.style.display = "block";
    };

    const hideTooltip = () => {
      tooltip.style.display = "none";
      maps.resetHoverState();
    };

    paths.forEach((path) => {
      path.addEventListener("mouseenter", showTooltip);
      path.addEventListener("mousemove", updateTooltipPosition);
      path.addEventListener("mouseleave", hideTooltip);
    });

    const handleResize = () => {
      map.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      paths.forEach((path) => {
        path.removeEventListener("mouseenter", showTooltip);
        path.removeEventListener("mousemove", updateTooltipPosition);
        path.removeEventListener("mouseleave", hideTooltip);
      });
      if (tooltip.parentNode === mapElement) {
        mapElement.removeChild(tooltip);
      }
    };
  }, []);

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setDataCategory1(
          projects.frCategory1.nodes
        );
        setDataCategory2(
          projects.frCategory2.nodes
        );
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setDataCategory1(
          projects.enCategory1.nodes
        );
        setDataCategory2(
          projects.enCategory2.nodes
        );
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [
    dataCP1,
    dataCP2,
    projects.enCategory1.nodes,
    projects.enCategory2.nodes,
    projects.frCategory1.nodes,
    projects.frCategory2.nodes,
  ]);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataP.titreOngletDeLaPage}</title>
      </Helmet>
      {dataP ? (
        <main className="project">
          <BlocHeader
            title={dataP.titre}
            img={dataP.image.node.sourceUrl}
            text={dataP.description}
            alt={dataP.image.node.altText}
          />
          <section className="map_project">
            {/* <div className="map_title">
              <Description
                title={dataP.bloc1Titre}
                text={dataP.bloc1Texte}
              />
            </div> */}
            <div className="map_interactive">
              <div className="map_container">
                <div className="controls_container">
                  <button
                    type="button"
                    className="btn_map minus_btn"
                    onClick={zoomIn}
                    aria-label="Zoom avant"
                  />
                  <div className="divider" />
                  <button
                    type="button"
                    className="btn_map plus_btn"
                    onClick={zoomOut}
                    aria-label="Zoom arrière"
                  />
                </div>
                <div id="map"></div>
              </div>
              {/* <div className="info_container">
                <div id="maps_mobile"></div>
              </div> */}
            </div>
          </section>
          <section className="bloc-1">
            <Description
              title={dataP.bloc1Titre}
              text={dataP.bloc1Texte}
            />
            <div className="bloc-1__content">
              {dataCP1 !== "" ? (
                <>
                  <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {dataCP1.map((item) => {
                      return (
                        <CardFull
                          img={
                            item.projects.image
                              .node.sourceUrl
                          }
                          title={
                            item.projects.titre
                          }
                          text={
                            item.projects.texte
                          }
                          key={item}
                          alt={
                            item.projects.image
                              .node.altText
                          }
                        />
                      );
                    })}
                  </Masonry>
                  <Masonry
                    breakpointCols={1}
                    className="my-masonry-grid-mobile"
                    columnClassName="my-masonry-grid_column"
                  >
                    {dataCP1.map((item) => {
                      return (
                        <CardFull
                          img={
                            item.projects.image
                              .node.sourceUrl
                          }
                          title={
                            item.projects.titre
                          }
                          text={
                            item.projects.texte
                          }
                          key={item}
                          alt={
                            item.projects.image
                              .node.altText
                          }
                        />
                      );
                    })}
                  </Masonry>
                </>
              ) : null}
            </div>
          </section>
          <section className="bloc-2">
            <Description
              title={dataP.bloc2Titre}
              text={dataP.bloc2Texte}
            />
            <div className="bloc-2__content">
              {dataCP2 !== "" ? (
                <>
                  <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {dataCP2.map((item) => {
                      return (
                        <CardFull
                          img={
                            item.projects.image
                              .node.sourceUrl
                          }
                          title={
                            item.projects.titre
                          }
                          text={
                            item.projects.texte
                          }
                          key={item}
                          alt={
                            item.projects.image
                              .node.altText
                          }
                        />
                      );
                    })}
                  </Masonry>
                  <Masonry
                    breakpointCols={1}
                    className="my-masonry-grid-mobile"
                    columnClassName="my-masonry-grid_column"
                  >
                    {dataCP2.map((item) => {
                      return (
                        <CardFull
                          img={
                            item.projects.image
                              .node.sourceUrl
                          }
                          title={
                            item.projects.titre
                          }
                          text={
                            item.projects.texte
                          }
                          key={item}
                          alt={
                            item.projects.image
                              .node.altText
                          }
                        />
                      );
                    })}
                  </Masonry>
                </>
              ) : null}
            </div>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Project;

import React, {
  useEffect,
  useState,
} from "react";
import BlocHeader from "../components/blocHeader";

import "../scss/templates/plasticBiodiv.scss";
import { Helmet } from "react-helmet";
import Loader from "../components/loader";
import Layout from "../components/layout";
import { graphql, useStaticQuery } from "gatsby";
import {
  Autoplay,
  Navigation,
} from "swiper/modules";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";
const query = graphql`
  query {
    allProjects: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: {
                in: ["projects", "projets"]
                nin: [
                  "map"
                  "carte"
                  "emission reduction"
                  "carbon sequestration"
                  "séquestration carbonne"
                  "réduction d’émission"
                ]
              }
            }
          }
        }
      }
    ) {
      nodes {
        projetsPB {
          descriptionFr
          descriptionEn
          titleEn
          titleFr
          plastiqueOuBiodiversite
          image {
            altText
            sourceUrl
          }
          paysSearch {
            paysTax {
              capitale
              nomDuPays
            }
          }
        }
      }
    }
  }
`;

function PlaticBiodiv({ pageContext }) {
  const allProjects = useStaticQuery(query);
  const { dataPB } = pageContext;
  const dataPage = dataPB.PlasticBiodiv;
  const [metaLang, setMetaLang] = useState("");

  const [currentPage, setCurrentPage] =
    useState("plastic");
  const [dataLoad, setDataLoad] = useState(false);
  const [logoPage, setLogoPage] = useState();
  const [dataBloc1, setdataBloc1] = useState();
  const [dataBloc2, setdataBloc2] = useState();
  const [dataBloc3, setdataBloc3] = useState();
  const [dataBloc4, setdataBloc4] = useState();
  const [dataBloc5, setdataBloc5] = useState();
  const [dataBloc5Project, setdataBloc5Project] =
    useState();
  const [dataBloc6, setdataBloc6] = useState();
  const [dataBloc7, setdataBloc7] = useState();

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
    setProjects();
    updateData("plastic");
  }, [dataPage, allProjects]);

  useEffect(() => {
    updateData(currentPage);
    setProjects();
  }, [currentPage]);

  const updateData = (page) => {
    if (page == "plastic") {
      setLogoPage(dataPage.logoPlastic);
      setdataBloc1(dataPage.groupePlastics1);
      setdataBloc2(dataPage.groupePlastics2);
      setdataBloc3(dataPage.groupePlastics3);
      setdataBloc4(dataPage.groupePlastics4);
      setdataBloc5(dataPage.groupePlastics5);
      setdataBloc6(dataPage.groupePlastics6);
      setdataBloc7(dataPage.groupePlastics7);
    } else {
      setLogoPage(dataPage.logoCarbon);
      setdataBloc1(dataPage.groupeCarbon1);
      setdataBloc2(dataPage.groupeCarbon2);
      setdataBloc3(dataPage.groupeCarbon3);
      setdataBloc4(dataPage.groupeCarbon4);
      setdataBloc5(dataPage.groupeCarbon5);
      setdataBloc6(dataPage.groupeCarbon6);
      setdataBloc7(dataPage.groupeCarbon7);
    }
    setDataLoad(true);
  };

  const setProjects = () => {
    const plastique = [];
    const biodiv = [];

    allProjects?.allProjects?.nodes.map(
      (project) => {
        if (
          project.projetsPB
            .plastiqueOuBiodiversite ==
          "Biodiversité"
        ) {
          biodiv.push(
            ...biodiv,
            project.projetsPB
          );
        } else if (
          project.projetsPB
            .plastiqueOuBiodiversite ==
          "Plastique"
        ) {
          plastique.push(
            ...plastique,
            project.projetsPB
          );
        }
      }
    );
    if (currentPage == "plastic") {
      setdataBloc5Project(plastique);
    } else {
      setdataBloc5Project(biodiv);
    }
  };
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataPage.titrePage}</title>
      </Helmet>
      {dataPage ? (
        <main className="plastic_biodiv">
          <BlocHeader
            title={dataPage.titrePage}
            text={
              "<p>" +
              dataPage.descriptionPage +
              "</p>"
            }
            img={
              dataPage.backgroundTitrePage
                .sourceUrl
            }
            alt={
              dataPage.backgroundTitrePage.altText
            }
          />
          <div className="navbar-container-secondary">
            <nav className="navbar-small">
              <ul>
                <li
                  onClick={() =>
                    setCurrentPage("plastic")
                  }
                >
                  <a
                    href=""
                    className={
                      currentPage == "plastic"
                        ? "active"
                        : null
                    }
                  >
                    {" "}
                    {metaLang == "fr"
                      ? "Plastique"
                      : "Plastic"}
                  </a>
                </li>
                <li
                  onClick={() =>
                    setCurrentPage("biodiv")
                  }
                >
                  <a
                    href=""
                    className={
                      currentPage == "biodiv"
                        ? "active"
                        : null
                    }
                  >
                    {" "}
                    {metaLang == "fr"
                      ? "Biodiversité"
                      : "Biodiversity"}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {dataLoad ? (
            <div
              className="section_container"
              data-type={currentPage}
            >
              <div className="logo">
                <img
                  src={logoPage.sourceUrl}
                  alt={logoPage.altText}
                />
              </div>
              <div className="container">
                <section className="bloc_1">
                  <h2>{dataBloc1.titre}</h2>
                  <div className="items_container">
                    <div className="items">
                      <div class="item">
                        <div class="illu">
                          <img
                            src={
                              dataBloc1
                                .imageArgument1
                                .sourceUrl
                            }
                            alt={
                              dataBloc1
                                .imageArgument1
                                .altText
                            }
                            className="icon"
                          />
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              dataBloc1.texteArgument1,
                          }}
                        ></div>
                      </div>
                      <div class="item">
                        <div class="illu">
                          <img
                            src={
                              dataBloc1
                                .imageArgument2
                                .sourceUrl
                            }
                            alt={
                              dataBloc1
                                .imageArgument2
                                .altText
                            }
                            className="icon"
                          />
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              dataBloc1.texteArgument2,
                          }}
                        ></div>
                      </div>
                      <div class="item">
                        <div class="illu">
                          <img
                            src={
                              dataBloc1
                                .imageArgument3
                                .sourceUrl
                            }
                            alt={
                              dataBloc1
                                .imageArgument3
                                .altText
                            }
                            className="icon"
                          />
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              dataBloc1.texteArgument3,
                          }}
                        ></div>
                      </div>
                      <div class="item">
                        <div class="illu">
                          <img
                            src={
                              dataBloc1
                                .imageArgument4
                                .sourceUrl
                            }
                            alt={
                              dataBloc1
                                .imageArgument4
                                .altText
                            }
                            className="icon"
                          />
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              dataBloc1.texteArgument4,
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="source">
                      {dataBloc1.source}
                    </p>
                  </div>
                  <p className="subtitle">
                    {dataBloc1.subtitle}
                  </p>
                </section>
                <section className="bloc_2">
                  <h2>{dataBloc2.titre}</h2>
                  <div className="item">
                    <p>{dataBloc2.texte1}</p>
                    <div className="illu">
                      <img
                        className="img"
                        src={
                          dataBloc2.image1
                            .sourceUrl
                        }
                        alt={
                          dataBloc2.image1.altText
                        }
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="content">
                      {dataBloc2.icon2 ? (
                        <img
                          src={
                            dataBloc2.icon2
                              .sourceUrl
                          }
                          alt={
                            dataBloc2.icon2
                              .altText
                          }
                          className="icon"
                        />
                      ) : null}
                      <p>{dataBloc2.texte2}</p>
                    </div>
                    <div className="illu">
                      <img
                        className="img"
                        src={
                          dataBloc2.image2
                            .sourceUrl
                        }
                        alt={
                          dataBloc2.image2.altText
                        }
                      />
                    </div>
                  </div>
                </section>
                <section className="bloc_3">
                  <h2>{dataBloc3.titre}</h2>
                  <div className="credit_container">
                    <div
                      className="credit"
                      dangerouslySetInnerHTML={{
                        __html: dataBloc3.credit,
                      }}
                    ></div>
                    <div
                      className="list_credit"
                      dangerouslySetInnerHTML={{
                        __html:
                          dataBloc3.listeCredit,
                      }}
                    ></div>
                  </div>
                  <p className="description">
                    {dataBloc3.description}
                  </p>
                  <div className="schema_container">
                    <div class="item_step">
                      <img
                        src={
                          dataBloc3.imageStep1
                            .sourceUrl
                        }
                        alt={
                          dataBloc3.imageStep1
                            .altText
                        }
                      />
                      <p>{dataBloc3.step1}</p>
                    </div>
                    <div class="item_arrow">
                      <div className="arrow_container">
                        <p>
                          {dataBloc3.step1ToStep2}
                        </p>
                        <div className="arrow">
                          <svg
                            className="desktop"
                            xmlns="http://www.w3.org/2000/svg"
                            width="132"
                            height="8"
                            viewBox="0 0 132 8"
                            fill="none"
                          >
                            <path
                              d="M131.354 4.35355C131.549 4.15829 131.549 3.84171 131.354 3.64645L128.172 0.464466C127.976 0.269204 127.66 0.269204 127.464 0.464466C127.269 0.659728 127.269 0.976311 127.464 1.17157L130.293 4L127.464 6.82843C127.269 7.02369 127.269 7.34027 127.464 7.53553C127.66 7.7308 127.976 7.7308 128.172 7.53553L131.354 4.35355ZM0 4.5H131V3.5H0V4.5Z"
                              fill="#333333"
                            />
                          </svg>
                          <svg
                            className="mobile"
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                          >
                            <path
                              d="M4.5 0.998535C4.5 0.722393 4.27614 0.498535 4 0.498535C3.72386 0.498535 3.5 0.722393 3.5 0.998535H4.5ZM3.64645 11.3521C3.84171 11.5474 4.15829 11.5474 4.35355 11.3521L7.53553 8.17011C7.7308 7.97485 7.7308 7.65826 7.53553 7.463C7.34027 7.26774 7.02369 7.26774 6.82843 7.463L4 10.2914L1.17157 7.463C0.976311 7.26774 0.659728 7.26774 0.464466 7.463C0.269204 7.65826 0.269204 7.97485 0.464466 8.17011L3.64645 11.3521ZM3.5 0.998535L3.5 10.9985H4.5L4.5 0.998535H3.5Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="arrow_container">
                        <p>
                          {dataBloc3.step2ToStep1}
                        </p>
                        <div className="arrow">
                          <svg
                            className="desktop"
                            xmlns="http://www.w3.org/2000/svg"
                            width="132"
                            height="8"
                            viewBox="0 0 132 8"
                            fill="none"
                          >
                            <path
                              d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H132V3.5H1V4.5Z"
                              fill="#333333"
                            />
                          </svg>
                          <svg
                            className="mobile"
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                          >
                            <path
                              d="M4.35355 0.644982C4.15829 0.44972 3.84171 0.44972 3.64645 0.644982L0.464466 3.82696C0.269204 4.02222 0.269204 4.33881 0.464466 4.53407C0.659728 4.72933 0.976311 4.72933 1.17157 4.53407L4 1.70564L6.82843 4.53407C7.02369 4.72933 7.34027 4.72933 7.53553 4.53407C7.7308 4.33881 7.7308 4.02222 7.53553 3.82696L4.35355 0.644982ZM3.5 10.9985C3.5 11.2747 3.72386 11.4985 4 11.4985C4.27614 11.4985 4.5 11.2747 4.5 10.9985H3.5ZM3.5 0.998535L3.5 10.9985H4.5L4.5 0.998535H3.5Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="item_step">
                      <img
                        src={
                          dataBloc3.imageStep2
                            .sourceUrl
                        }
                        alt={
                          dataBloc3.imageStep2
                            .altText
                        }
                      />
                      <p>{dataBloc3.step2}</p>
                    </div>
                    <div class="item_arrow">
                      <div className="arrow_container">
                        <p>
                          {dataBloc3.step2ToStep3}
                        </p>
                        <div className="arrow">
                          <svg
                            className="desktop"
                            xmlns="http://www.w3.org/2000/svg"
                            width="132"
                            height="8"
                            viewBox="0 0 132 8"
                            fill="none"
                          >
                            <path
                              d="M131.354 4.35355C131.549 4.15829 131.549 3.84171 131.354 3.64645L128.172 0.464466C127.976 0.269204 127.66 0.269204 127.464 0.464466C127.269 0.659728 127.269 0.976311 127.464 1.17157L130.293 4L127.464 6.82843C127.269 7.02369 127.269 7.34027 127.464 7.53553C127.66 7.7308 127.976 7.7308 128.172 7.53553L131.354 4.35355ZM0 4.5H131V3.5H0V4.5Z"
                              fill="#333333"
                            />
                          </svg>
                          <svg
                            className="mobile"
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                          >
                            <path
                              d="M4.5 0.998535C4.5 0.722393 4.27614 0.498535 4 0.498535C3.72386 0.498535 3.5 0.722393 3.5 0.998535H4.5ZM3.64645 11.3521C3.84171 11.5474 4.15829 11.5474 4.35355 11.3521L7.53553 8.17011C7.7308 7.97485 7.7308 7.65826 7.53553 7.463C7.34027 7.26774 7.02369 7.26774 6.82843 7.463L4 10.2914L1.17157 7.463C0.976311 7.26774 0.659728 7.26774 0.464466 7.463C0.269204 7.65826 0.269204 7.97485 0.464466 8.17011L3.64645 11.3521ZM3.5 0.998535L3.5 10.9985H4.5L4.5 0.998535H3.5Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="arrow_container">
                        <p>
                          {dataBloc3.step3ToStep2}
                        </p>
                        <div className="arrow">
                          <svg
                            className="desktop"
                            xmlns="http://www.w3.org/2000/svg"
                            width="132"
                            height="8"
                            viewBox="0 0 132 8"
                            fill="none"
                          >
                            <path
                              d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H132V3.5H1V4.5Z"
                              fill="#333333"
                            />
                          </svg>
                          <svg
                            className="mobile"
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                          >
                            <path
                              d="M4.35355 0.644982C4.15829 0.44972 3.84171 0.44972 3.64645 0.644982L0.464466 3.82696C0.269204 4.02222 0.269204 4.33881 0.464466 4.53407C0.659728 4.72933 0.976311 4.72933 1.17157 4.53407L4 1.70564L6.82843 4.53407C7.02369 4.72933 7.34027 4.72933 7.53553 4.53407C7.7308 4.33881 7.7308 4.02222 7.53553 3.82696L4.35355 0.644982ZM3.5 10.9985C3.5 11.2747 3.72386 11.4985 4 11.4985C4.27614 11.4985 4.5 11.2747 4.5 10.9985H3.5ZM3.5 0.998535L3.5 10.9985H4.5L4.5 0.998535H3.5Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="item_step">
                      <img
                        src={
                          dataBloc3.imageStep3
                            .sourceUrl
                        }
                        alt={
                          dataBloc3.imageStep3
                            .altText
                        }
                      />
                      <p>{dataBloc3.step3}</p>
                    </div>
                  </div>
                </section>
                <section className="bloc_4">
                  <h2>{dataBloc4.titre}</h2>
                  <div className="items_container">
                    <div className="item">
                      <h3>
                        {dataBloc4.titreService1}
                      </h3>
                      <p>
                        {
                          dataBloc4.descriptionService1
                        }
                      </p>
                    </div>
                    <div className="item">
                      <h3>
                        {dataBloc4.titreService2}
                      </h3>
                      <p>
                        {
                          dataBloc4.descriptionService1
                        }
                      </p>
                    </div>
                  </div>
                </section>
                <section className="bloc_5">
                  <div className="header">
                    <h2>{dataBloc5.titre}</h2>
                    <p>{dataBloc5.description}</p>
                  </div>
                  {dataBloc5Project.length > 2 ? (
                    <div className="arrow_container">
                      <div className="arrow left">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 8H1M1 8L8 15M1 8L8 1"
                            stroke="#5F89F4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="arrow right">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 8H15M15 8L8 1M15 8L8 15"
                            stroke="#5F89F4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : null}
                  {dataBloc5Project ? (
                    <Swiper
                      modules={[
                        Navigation,
                        Autoplay,
                      ]}
                      navigation={{
                        nextEl: ".arrow.right",
                        prevEl: ".arrow.left",
                      }}
                      spaceBetween="32"
                      slidesPerView="auto"
                      pagination={{
                        clickable: true,
                      }}
                      className="swiper_project"
                      autoplay={{
                        delay: 2500,
                        pauseOnMouseEnter: true,
                      }}
                    >
                      {dataBloc5Project.map(
                        (project) => (
                          <SwiperSlide>
                            <div className="content_container">
                              <div>
                                <h3>
                                  {metaLang ==
                                  "fr"
                                    ? project.titleFr
                                    : project.titleEn}
                                </h3>
                                <p className="description">
                                  {metaLang ==
                                  "fr"
                                    ? project.descriptionFr
                                    : project.descriptionEn}
                                </p>
                              </div>
                              <p className="place">
                                {
                                  project
                                    .paysSearch
                                    .paysTax
                                    .nomDuPays
                                }
                                , 
                                {
                                  project
                                    .paysSearch
                                    .paysTax
                                    .capitale
                                }
                              </p>
                            </div>
                            <div className="illu_container">
                              <img
                                src={
                                  project.image
                                    .sourceUrl
                                }
                                alt={
                                  project.image
                                    .altText
                                }
                              />
                            </div>
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  ) : null}
                </section>
                <section className="bloc_6">
                  <div className="illu">
                    <img
                      src={
                        dataBloc6.image.sourceUrl
                      }
                      alt={
                        dataBloc6.image.altText
                      }
                    />
                  </div>
                  <div className="content">
                    <h2>{dataBloc6.titre}</h2>
                    <div className="items_container">
                      <div className="item">
                        <img
                          src={
                            dataBloc6.icon1
                              .sourceUrl
                          }
                          alt={
                            dataBloc6.icon1
                              .altText
                          }
                          className="icon"
                        />
                        <p>{dataBloc6.texte1}</p>
                      </div>
                      <div className="item">
                        <img
                          src={
                            dataBloc6.icon2
                              .sourceUrl
                          }
                          alt={
                            dataBloc6.icon2
                              .altText
                          }
                          className="icon"
                        />
                        <p>{dataBloc6.texte2}</p>
                      </div>
                      <div className="item">
                        <img
                          src={
                            dataBloc6.icon3
                              .sourceUrl
                          }
                          alt={
                            dataBloc6.icon3
                              .altText
                          }
                          className="icon"
                        />
                        <p>{dataBloc6.texte3}</p>
                      </div>
                    </div>
                    <p className="contactP">
                      {dataBloc6.texteContact}
                    </p>
                    <div>
                      <a className="btn" href="">
                        {dataBloc6.boutonContact}
                      </a>
                    </div>
                  </div>
                </section>
                <section className="bloc_7">
                  <h2>{dataBloc7.titre}</h2>
                  <p>{dataBloc7.description}</p>
                  <div className="logo_container">
                    {dataBloc7.partenaires?.map(
                      (partenaire) => (
                        <a
                          href={
                            partenaire
                              .logoClientOuPartenaires
                              .lienVersSite
                          }
                          className="logo_item"
                        >
                          <img
                            src={
                              partenaire
                                .logoClientOuPartenaires
                                .logo.sourceUrl
                            }
                            alt={
                              partenaire
                                .logoClientOuPartenaires
                                .logo.altText
                            }
                          />
                        </a>
                      )
                    )}
                  </div>
                </section>
              </div>
              <section className="contact">
                <h3 className="subtitle">
                  {dataPage.texteContact}
                </h3>
                <a
                  className="btn"
                  href={dataPage.lienContactUs}
                >
                  {dataPage.texteBoutonContact}
                </a>
              </section>
            </div>
          ) : null}
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default PlaticBiodiv;

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "../components/slider";
import Legend from "../components/legend";
import ButtonLink from "../components/buttonLink";
import CardList from "../components/cardList";
import Card from "../components/card";
import Description from "../components/description";
import Layout from "../components/layout";
import Loader from "../components/loader";

// global styles
import "../reset.css";
import "../scss/templates/index.scss";

import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Odometer from "../components/odometre";

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
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        logoClientOuPartenaires {
          visiblePageHome
          logo {
            sourceUrl
            altText
          }
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
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        logoClientOuPartenaires {
          visiblePageHome
          logo {
            sourceUrl
            altText
          }
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
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        logoClientOuPartenaires {
          visiblePageHome
          logo {
            sourceUrl
            altText
          }
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
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        logoClientOuPartenaires {
          visiblePageHome
          logo {
            sourceUrl
            altText
          }
        }
      }
    }
    sliderFr: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "carousel" }
            }
          }
        }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        slider {
          image {
            sourceUrl
            altText
          }
          titre
          texte
        }
      }
    }
    sliderEn: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "slider" } }
          }
        }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        slider {
          image {
            sourceUrl
            altText
          }
          titre
          texte
        }
      }
    }
  }
`;

function Home({ pageContext }) {
  const { dataHome } = pageContext;
  const dataH = dataHome.home;

  const data = useStaticQuery(query);
  const [dataCustomers, setDataCustomers] =
    useState("");
  const [dataPartners, setDataPartners] =
    useState("");
  const [dataSlider, setDataSlider] =
    useState("");
  const [metaLang, setMetaLang] = useState("");
  const [metaDescription, setMetaDescription] =
    useState("");
  const [dataKeyNumber, setDataKeyNumber] =
    useState([]);
  const logoCustomers = [];
  const logoPartners = [];

  const slides = [];
  if (dataSlider) {
    dataSlider.map((slide) => {
      return slides.push(slide.slider);
    });
    slides[0].titre = dataH?.titre;
    slides[0].texte = dataH?.description;
  }

  if (dataCustomers) {
    dataCustomers.map((item) => {
      if (
        item.logoClientOuPartenaires
          .visiblePageHome === true
      ) {
        return logoCustomers.push(
          item.logoClientOuPartenaires.logo
        );
      }
    });
  }

  if (dataPartners) {
    dataPartners.map((item) => {
      if (
        item.logoClientOuPartenaires
          .visiblePageHome === true
      ) {
        return logoPartners.push(
          item.logoClientOuPartenaires.logo
        );
      }
    });
  }

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setDataCustomers(data.blocClients.nodes);
        setDataPartners(
          data.blocPartenaires.nodes
        );
        setDataSlider(data.sliderFr.nodes);
        setMetaLang("fr");
        setMetaDescription(
          "Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone."
        );
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setDataCustomers(
          data.blocCustomers.nodes
        );
        setDataPartners(data.blocPartners.nodes);
        setDataSlider(data.sliderEn.nodes);
        setMetaLang("en");
        setMetaDescription(
          "Removall is specialized in designing carbon funds and developing carbon sequestration projects."
        );
      }
    }
    const formateDataKeyNumber = () => {
      setDataKeyNumber([
        {
          ...dataH.chiffre1,
          pr_direction: dataH.chiffre1.prDirection
            ? "left"
            : "right",
          style: "blue",
        },
        {
          ...dataH.chiffre2,
          pr_direction: dataH.chiffre2.prDirection
            ? "left"
            : "right",
          style: "blue",
        },
        {
          ...dataH.chiffre3,
          pr_direction: dataH.chiffre3.prDirection
            ? "left"
            : "right",
          style: "blue",
        },
        {
          ...dataH.chiffre4,
          pr_direction: dataH.chiffre4.prDirection
            ? "left"
            : "right",
          style: "grey",
        },
        {
          ...dataH.chiffre5,
          pr_direction: dataH.chiffre5.prDirection
            ? "left"
            : "right",
          style: "grey",
        },
        {
          ...dataH.chiffre6,
          pr_direction: dataH.chiffre6.prDirection
            ? "left"
            : "right",
          style: "grey",
        },
        {
          ...dataH.chiffre7,
          pr_direction: dataH.chiffre7.prDirection
            ? "left"
            : "right",
          style: "grey",
        },
      ]);
    };
    formateDataKeyNumber();
    getLanguage();
  }, [
    data.blocClients.nodes,
    data.blocCustomers.nodes,
    data.blocPartenaires.nodes,
    data.blocPartners.nodes,
    data.sliderEn.nodes,
    data.sliderFr.nodes,
  ]);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataH.titreOngletDeLaPage}</title>
        <meta
          name="description"
          content={metaDescription}
        />
      </Helmet>
      {dataH && data && dataSlider ? (
        <main className="home">
          <section className="slider-home">
            <Slider slides={slides} />
          </section>
          <section className="bloc-1">
            <Description
              title={dataH.bloc1Titre}
              text={dataH.bloc1Texte}
              button={dataH.bloc1Bouton}
              buttonVisible={true}
              buttonMobile={
                dataH.bloc1BoutonMobile
              }
              to={dataH.bloc1BoutonLien}
            />
          </section>
          <section className="bloc-2">
            <div className="bloc-2__image">
              <img
                src={dataH.bloc2Image.sourceUrl}
                alt={dataH.bloc2Image.altText}
              />
            </div>
            <div className="bloc-2__content">
              <h2>{dataH.bloc2Titre}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataH.bloc2Texte,
                }}
              ></div>
              <ButtonLink
                label={dataH.bloc2Bouton}
                to={dataH.bloc2BoutonLien}
                labelMobile={
                  dataH.bloc2BoutonMobile
                }
              />
            </div>
          </section>
          <section className="key-numbers">
            <h2>{dataH.titreChiffresCles}</h2>
            <p>{dataH.descriptionChiffresCles}</p>
            <div className="key-numbers__content">
              <div
                key="0"
                className={`key-numbers__content__item  ${dataKeyNumber[0].style}`}
              >
                <div
                  className={`key-numbers__content__item__number  ${
                    dataKeyNumber[0]
                      .pr_direction ?? ""
                  }`}
                >
                  <span
                    className={`key-numbers__content__item__number__prefixe`}
                  >
                    {dataKeyNumber[0].prefixe}
                  </span>
                  <Odometer
                    value={dataKeyNumber[0].value}
                  />
                </div>
                <p>{dataKeyNumber[0].text}</p>
              </div>
              <div
                key="1"
                className={`key-numbers__content__item  ${dataKeyNumber[1].style}`}
              >
                <div
                  className={`key-numbers__content__item__number  ${
                    dataKeyNumber[1]
                      .pr_direction ?? ""
                  }`}
                >
                  <span
                    className={`key-numbers__content__item__number__prefixe`}
                  >
                    {dataKeyNumber[1].prefixe}
                  </span>
                  <Odometer
                    value={dataKeyNumber[1].value}
                  />
                </div>
                <p>{dataKeyNumber[1].text}</p>
              </div>
              <div
                key="2"
                className={`key-numbers__content__item  ${dataKeyNumber[2].style}`}
              >
                <div
                  className={`key-numbers__content__item__number  ${
                    dataKeyNumber[2]
                      .pr_direction ?? ""
                  }`}
                >
                  <span
                    className={`key-numbers__content__item__number__prefixe`}
                  >
                    {dataKeyNumber[2].prefixe}
                  </span>
                  <Odometer
                    value={dataKeyNumber[2].value}
                  />
                </div>
                <p>{dataKeyNumber[2].text}</p>
                <div className="key__number_little">
                  <div>
                    <div
                      key="3"
                      className={`key-numbers__content__item  ${dataKeyNumber[3].style}`}
                    >
                      <div
                        className={`key-numbers__content__item__number  ${
                          dataKeyNumber[3]
                            .pr_direction ?? ""
                        }`}
                      >
                        <span
                          className={`key-numbers__content__item__number__prefixe`}
                        >
                          {
                            dataKeyNumber[3]
                              .prefixe
                          }
                        </span>
                        <Odometer
                          value={
                            dataKeyNumber[3].value
                          }
                        />
                      </div>
                      <p>
                        {dataKeyNumber[3].text}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      key="4"
                      className={`key-numbers__content__item  ${dataKeyNumber[4].style}`}
                    >
                      <div
                        className={`key-numbers__content__item__number  ${
                          dataKeyNumber[4]
                            .pr_direction ?? ""
                        }`}
                      >
                        <span
                          className={`key-numbers__content__item__number__prefixe`}
                        >
                          {
                            dataKeyNumber[4]
                              .prefixe
                          }
                        </span>
                        <Odometer
                          value={
                            dataKeyNumber[4].value
                          }
                        />
                      </div>
                      <p>
                        {dataKeyNumber[4].text}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      key="5"
                      className={`key-numbers__content__item  ${dataKeyNumber[5].style}`}
                    >
                      <div
                        className={`key-numbers__content__item__number  ${
                          dataKeyNumber[5]
                            .pr_direction ?? ""
                        }`}
                      >
                        <span
                          className={`key-numbers__content__item__number__prefixe`}
                        >
                          {
                            dataKeyNumber[5]
                              .prefixe
                          }
                        </span>
                        <Odometer
                          value={
                            dataKeyNumber[5].value
                          }
                        />
                      </div>
                      <p>
                        {dataKeyNumber[5].text}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      key="6"
                      className={`key-numbers__content__item  ${dataKeyNumber[6].style}`}
                    >
                      <div
                        className={`key-numbers__content__item__number  ${
                          dataKeyNumber[6]
                            .pr_direction ?? ""
                        }`}
                      >
                        <span
                          className={`key-numbers__content__item__number__prefixe`}
                        >
                          {
                            dataKeyNumber[6]
                              .prefixe
                          }
                        </span>
                        <Odometer
                          value={
                            dataKeyNumber[6].value
                          }
                        />
                      </div>
                      <p>
                        {dataKeyNumber[6].text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bloc-3">
            <h2>{dataH.bloc3Titre}</h2>
            <CardList
              title={dataH.bloc3item1SousTitre}
              text={dataH.bloc3item1Texte}
              img={
                dataH.bloc3item1Image.sourceUrl
              }
              alt={dataH.bloc3item1Image.altText}
            />
            <CardList
              title={dataH.bloc3item2SousTitre}
              text={dataH.bloc3item2Texte}
              img={
                dataH.bloc3item2Image.sourceUrl
              }
              alt={dataH.bloc3item2Image.altText}
            />
            <CardList
              title={dataH.bloc3item3SousTitre}
              text={dataH.bloc3item3Texte}
              img={
                dataH.bloc3item3Image.sourceUrl
              }
              alt={dataH.bloc3item3Image.altText}
            />
            {dataH.bloc3item4Texte ? (
              <CardList
                title={dataH.bloc3item4SousTitre}
                text={dataH.bloc3item4Texte}
                img={
                  dataH.bloc3item4Image.sourceUrl
                }
                alt={
                  dataH.bloc3item4Image.altText
                }
              />
            ) : null}{" "}
            <ButtonLink
              label={dataH.bloc3Bouton}
              to={dataH.bloc3BoutonLien}
              labelMobile={
                dataH.bloc3BoutonMobile
              }
            />
          </section>
          <section className="bloc-4">
            <div className="bloc-4__content">
              <Description
                title={dataH.bloc4Titre}
                text={dataH.bloc4Texte}
              />
            </div>
            <div className="bloc-4__cards">
              <Card
                title={dataH.bloc4item1SousTitre}
                text={dataH.bloc4item1Texte}
                img={
                  dataH.bloc4item1Image.sourceUrl
                }
                alt={
                  dataH.bloc4item1Image.altText
                }
              />
              <Card
                title={dataH.bloc4item2SousTitre}
                text={dataH.bloc4item2Texte}
                img={
                  dataH.bloc4item2Image.sourceUrl
                }
                alt={
                  dataH.bloc4item2Image.altText
                }
              />
              <Card
                title={dataH.bloc4item3SousTitre}
                text={dataH.bloc4item3Texte}
                img={
                  dataH.bloc4item3Image.sourceUrl
                }
                alt={
                  dataH.bloc4item3Image.altText
                }
              />
            </div>
            <ButtonLink
              label={dataH.bloc4Bouton}
              to={dataH.bloc4BoutonLien}
              labelMobile={
                dataH.bloc4BoutonMobile
              }
            />
          </section>
          <section className="bloc-5">
            <h2>{dataH.bloc5Titre}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: dataH.bloc5Texte,
              }}
            ></div>
            <ButtonLink
              label={dataH.bloc5Bouton}
              to={dataH.bloc5BoutonLien}
              labelMobile={
                dataH.bloc5BoutonMobile
              }
            />
          </section>
          {logoCustomers.length > 0 ||
          logoPartners.length > 0 ? (
            <section className="bloc-6">
              <h2>{dataH.bloc6Titre}</h2>
              <div className="bloc-6__content">
                <div className="bloc-6__content__logo">
                  {logoCustomers.length > 0 ? (
                    <>
                      <Legend
                        text={
                          dataH.bloc6item1SousTitre
                        }
                      />
                      <div className="bloc-6__content__logo--ligne">
                        {logoCustomers.map(
                          (item) => {
                            return (
                              <div className="bloc-6__content__logo--ligne__image">
                                <img
                                  src={
                                    item.sourceUrl
                                  }
                                  key={item}
                                  alt={
                                    item.altText
                                  }
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </>
                  ) : null}
                  {logoPartners.length > 0 ? (
                    <>
                      <Legend
                        text={
                          dataH.bloc6item2SousTitre
                        }
                      />
                      <div className="bloc-6__content__logo--ligne">
                        {logoPartners.map(
                          (item) => {
                            return (
                              <div className="bloc-6__content__logo--ligne__image">
                                <img
                                  src={
                                    item.sourceUrl
                                  }
                                  key={item}
                                  alt={
                                    item.altText
                                  }
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}
          {/* <aside className='linkedin_container'>
						<div className='linkedin_posts'>
							<div className='posts_header'>
								<h3 className='title_mobile'>Nos dernières publications</h3>
								<h3 className='title_desktop'>Nos dernières publications Linkedin</h3>
								<div className='btn_close'></div>
							</div>
							<div>
								<div class='sk-ww-linkedin-page-post' data-embed-id='224960'></div>
							</div>
						</div>
						<p className='linkedin_tooltip'>Nos dernières<br/>publications</p>
					</aside> */}
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Home;

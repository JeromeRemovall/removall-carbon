import React, {
  useEffect,
  useState,
} from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../scss/templates/resources.scss";

import Description from "../components/description";
import Layout from "../components/layout";
import CardFull from "../components/cardFull";
import Card from "../components/card";
import Events from "../components/events";
import PopInForm from "../components/popInForm";

import Loader from "../components/loader";
import Masonry from "react-masonry-css";

import { Helmet } from "react-helmet";
import { isInViewport } from "../utils/global";

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

function Resources({ pageContext }) {
  const { dataResource } = pageContext;
  const dataR = dataResource.ressource;
  const dataForm = dataResource.popInFormulaire;

  const data = useStaticQuery(query);
  const [dataNews, setDataNews] = useState("");
  const [dataResources, setDataResources] =
    useState("");
  const [dataEvents, setDataEvents] =
    useState("");

  //Form
  const [popIn, setPopIn] = useState(false);
  const [filePath, setFilePath] = useState("");
  // const [fileTitle, setFileTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const [messageEmail, setMessageEmail] =
    useState("");
  const [messageCheckbox, setMessageCheckbox] =
    useState("");
  const [messageSurname, setMessageSurname] =
    useState("");
  const [messageFirstname, setMessageFirstname] =
    useState("");
  const [
    messageOrganization,
    setMessageOrganization,
  ] = useState("");

  const [metaLang, setMetaLang] = useState("");

  const [news, setNews] = useState([]);
  const [newsIndex, setNewsIndex] = useState(0);

  const [itemNavSelected, setItemNavSelected] =
    useState("bloc_1");

  useEffect(() => {
    if (popIn) {
      document
        .querySelector("body")
        .classList.add("stop-scroll");
    } else {
      document
        .querySelector("body")
        .classList.remove("stop-scroll");
    }

    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setDataResources(data.frResources.nodes);
        const newsFilter = [...data.frNews.nodes.filter(item => item.news.image !== null)]
        setDataNews(newsFilter)
        console.log(newsFilter) 
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
        setDataEvents(data.frEvents.nodes);
        setUrl(
          `${process.env.GATSBY_RESOURCES_FORM_FR}`
        );
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        const newsFilter = [...data.enNews.nodes.filter(item => item.news.image !== null)]
        setDataNews(newsFilter)
        setDataResources(data.enResources.nodes);
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
        setDataEvents(data.enEvents.nodes);
        setUrl(
          `${process.env.GATSBY_RESOURCES_FORM_EN}`
        );
        setMetaLang("en");
      }
    }
    getLanguage();
    addNews();

    if (popIn === false) {
      setMessage("");
    }
  }, [
    data.enEvents.nodes,
    data.enNews.nodes,
    data.enResources.nodes,
    data.frEvents.nodes,
    data.frNews.nodes,
    data.frResources.nodes,
    url,
    popIn,
  ]);

  function downloadFile(path, title) {
    setPopIn(true);
    setFilePath(path);
    // setFileTitle(title);
  }

  const myStateRef = React.useRef(
    itemNavSelected
  );
  const setMyState = (data) => {
    myStateRef.current = data;
    setItemNavSelected(data);
  };

  const listener = () => {
    const blocOneDOM =
      document.querySelector("#bloc_1");
    const blocTwoDOM =
      document.querySelector("#bloc_2");
    const blocThreeDOM =
      document.querySelector("#bloc_3");

    document.addEventListener("scroll", () => {
      if (isInViewport(blocOneDOM)) {
        selectItemNav("bloc_1");
      }
      if (blocTwoDOM !== null) {
        if (isInViewport(blocTwoDOM)) {
          selectItemNav("bloc_2");
        }
      }
      if (isInViewport(blocThreeDOM)) {
        selectItemNav("bloc_3");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
  }, []);

  function selectItemNav(newItem) {
    if (newItem !== myStateRef.current) {
      const oldDom = document.querySelector(
        `[data-item=${myStateRef.current}]`
      );
      oldDom?.classList.remove("active");
      const newDOM = document.querySelector(
        `[data-item=${newItem}]`
      );
      newDOM?.classList.add("active");
      setMyState(newItem);
    }
  }
  function addNews() {
    if (dataNews.length > 0) {
      let newNews = news;
      for (
        let i = newsIndex;
        (i < dataNews.length) &
        (i < newsIndex + 6);
        i++
      ) {
        newNews.push(dataNews[i]);
      }
      setNewsIndex(newsIndex + 6);
      setNews([...newNews]);
    }
  }

  function download() {
    if (popIn) {
      let link = document.createElement("a");
      link.href = filePath;
      link.classList.add("mmm");
      let container = document.querySelector(
        "form.pop-in-form__fields"
      );
      container.appendChild(link);
      link.click();
    }
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const formElement = event.target,
      { action, method } = formElement,
      body = new FormData(formElement);

    fetch(action, {
      method,
      body,
    })
      .then((response) => response.json())
      .then((response) => {
        setMessageEmail("");
        setMessageCheckbox("");
        setMessage("");
        setMessageSurname("");
        setMessageFirstname("");
        setMessageOrganization("");
        setError("");

        if (
          response.status === "validation_failed"
        ) {
          for (
            let i = 0;
            i < response.invalid_fields.length;
            i++
          ) {
            if (
              response.invalid_fields[i]
                .error_id === "-ve-checkbox"
            ) {
              setMessageCheckbox(
                response.invalid_fields[i].message
              );
            }

            if (
              response.invalid_fields[i]
                .error_id === "-ve-email"
            ) {
              setMessageEmail(
                response.invalid_fields[i].message
              );
            }

            if (
              response.invalid_fields[i]
                .error_id === "-ve-surname"
            ) {
              setMessageSurname(
                response.invalid_fields[i].message
              );
            }

            if (
              response.invalid_fields[i]
                .error_id === "-ve-firstname"
            ) {
              setMessageFirstname(
                response.invalid_fields[i].message
              );
            }

            if (
              response.invalid_fields[i]
                .error_id === "-ve-organization"
            ) {
              setMessageOrganization(
                response.invalid_fields[i].message
              );
            }
          }
        } else if (
          response.status === "mail_sent"
        ) {
          setMessage(response.message);
          download();
        }
      })
      .catch((error) => {
        if (
          window.location.href.match("/fr$") ||
          window.location.href.match("/fr/")
        ) {
          setError("Une erreur est survenue");
        } else if (
          window.location.href.match("/en$") ||
          window.location.href.match("/en/")
        ) {
          setError("An error has occurred");
        }
      });
  };

  function closePopInOverlay(e) {
    if (
      e.target.className === "pop-in__container"
    ) {
      setPopIn(false);
    }
  }
  console.log(news)
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataR.titreOngletDeLaPage}</title>
      </Helmet>
      {dataR ? (
        <>
          {popIn === true ? (
            <PopInForm
              onClick={() => setPopIn(false)}
              title={dataForm.titre}
              text={dataForm.texte}
              firstname={dataForm.prenom}
              organization={dataForm.organisation}
              email={dataForm.email}
              label={dataForm.bouton}
              labelMobile={dataForm.boutonMobile}
              name={dataForm.nom}
              file={filePath}
              action={url}
              onSubmit={formSubmissionHandler}
              message={message}
              error={error}
              phraseRgpd={dataForm.phraseRgpd}
              messageSurname={messageSurname}
              messageFirstname={messageFirstname}
              messageOrganization={
                messageOrganization
              }
              messageEmail={messageEmail}
              messageCheckbox={messageCheckbox}
              onClickOverlay={closePopInOverlay}
            />
          ) : null}
          <main className="resources">
            <div className="navbar-container-secondary">
              <nav className="navbar-small">
                <ul>
                  <li>
                    <a
                      href="#bloc_1"
                      onClick={() =>
                        selectItemNav("bloc_1")
                      }
                      data-item="bloc_1"
                      className="active"
                    >
                      {dataR.bloc1Titre}
                    </a>
                  </li>
                  {dataResources.length > 0 ? (
                    <li>
                      <a
                        href="#bloc_2"
                        onClick={() =>
                          selectItemNav("bloc_2")
                        }
                        data-item="bloc_2"
                        className=""
                      >
                        {dataR.bloc2Titre}
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <a
                      href="#bloc_3"
                      onClick={() =>
                        selectItemNav("bloc_3")
                      }
                      data-item="bloc_3"
                      className=""
                    >
                      {dataR.bloc3Titre}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <section
              className="bloc-1"
              id="bloc_1"
            >
              <div className="bloc-1__container">
                <h1>{dataR.bloc1Titre}</h1>
                {/* {filePath ? <a href={filePath} download>download cat.png</a> :null} */}
                <div className="bloc-1__content">
                  {news.length > 0 ? (
                    <>
                      <Masonry
                        breakpointCols={2}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {news.map((item) => {
                          return (
                            <CardFull
                              img={
                                item.news.image
                                  .sourceUrl
                              }
                              alt={
                                item.news.image
                                  .altText
                              }
                              title={
                                item.news.titre
                              }
                              text={
                                item.news.texteActualite
                              }
                              key={item}
                              legendVisible={true}
                              legend={
                                item.news.legende
                              }
                              label={
                                item.news.bouton
                              }
                              href={
                                item.news
                                  .boutonLien
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
                        {news.map((item) => {
                          return (
                            <CardFull
                              img={
                                item.news.image
                                  .sourceUrl
                              }
                              alt={
                                item.news.image
                                  .altText
                              }
                              title={
                                item.news.titre
                              }
                              text={
                                item.news.texteActualite
                              }
                              key={item}
                              legendVisible={true}
                              legend={
                                item.news.legende
                              }
                              labelMobile={
                                item.news
                                  .boutonMobile
                              }
                              href={
                                item.news
                                  .boutonLien
                              }
                            />
                          );
                        })}
                      </Masonry>
                    </>
                  ) : null}
                </div>
                {newsIndex <= dataNews.length ? (
                  <div className="container_more">
                    {metaLang == "fr" ? (
                      <button
                        className="btn_more"
                        onClick={addNews}
                      >
                        Afficher plus d’articles
                      </button>
                    ) : (
                      <button
                        className="btn_more"
                        onClick={addNews}
                      >
                        View more articles
                      </button>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
            {dataResources.length > 0 ? (
              <section
                className="bloc-2"
                id="bloc_2"
              >
                <div className="bloc-2__container">
                  <Description
                    title={dataR.bloc2Titre}
                    text={dataR.bloc2Texte}
                  />
                  <div className="bloc-2__content">
                    {dataResources.length > 0 ? (
                      <>
                        {dataResources.map(
                          (item) => {
                            return (
                              <Card
                                img={
                                  item.resources
                                    .image
                                    .sourceUrl
                                }
                                alt={
                                  item.resources
                                    .image.altText
                                }
                                title={
                                  item.resources
                                    .titre
                                }
                                text={
                                  item.resources
                                    .texteRessource
                                }
                                buttonVisible={
                                  true
                                }
                                button={
                                  item.resources
                                    .bouton
                                }
                                buttonMobile={
                                  item.resources
                                    .boutonMobile
                                }
                                key={item}
                                onClick={() =>
                                  downloadFile(
                                    item.resources
                                      .fichier
                                      .mediaItemUrl,
                                    item.resources
                                      .fichier
                                      .title
                                  )
                                }
                              />
                            );
                          }
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </section>
            ) : null}
            <section
              className="bloc-3"
              id="bloc_3"
            >
              <div className="bloc-3__container">
                <h2>{dataR.bloc3Titre}</h2>
                <p className="bloc-3__text">
                  {dataR.bloc3Texte}
                </p>
                <div className="bloc-3__content">
                  {dataEvents.length > 0 ? (
                    <>
                      {dataEvents.map((item) => {
                        return (
                          <Events
                            img={
                              item.events.image
                                .sourceUrl
                            }
                            alt={
                              item.events.image
                                .altText
                            }
                            day={item.events.jour}
                            month={
                              item.events.mois
                            }
                            text={
                              item.events.texte
                            }
                            hours={
                              item.events.heures
                            }
                            adress={
                              item.events.adresse
                            }
                            isSpeaker={
                              item.events.speaker
                            }
                            lang={metaLang}
                            key={item}
                          />
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Resources;

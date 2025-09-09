import React, {
  useState,
  useEffect,
} from "react";
import {
  Link,
  graphql,
  useStaticQuery,
} from "gatsby";
import "../scss/templates/aPropos.scss";

import BlocHeader from "../components/blocHeader";
import Description from "../components/description";
import CardList from "../components/cardList";
import CardNumber from "../components/cardNumber";
import CardListIcon from "../components/cardListIcon";
import CardProfil from "../components/profilCard";
import Layout from "../components/layout";
import PopInProfil from "../components/popInProfil";

import Loader from "../components/loader";

import { Helmet } from "react-helmet";
import { isInViewport } from "../utils/global";

const query = graphql`
  query {
    fr: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "équipe" } }
          }
        }
      }
      sort: { fields: equipe___nom, order: ASC }
    ) {
      nodes {
        equipe {
          poste
          prenom
          nom
          image {
            node {
              altText
              sourceUrl
            }
          }
          logo1 {
            node {
              altText
              sourceUrl
            }
          }
          lien1
          logo2 {
            node {
              altText
              sourceUrl
            }
          }
          lien2
          description
        }
      }
    }
    en: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "team" } }
          }
        }
      }
      sort: { fields: equipe___nom, order: ASC }
    ) {
      nodes {
        equipe {
          poste
          prenom
          nom
          image {
            node {
              altText
              sourceUrl
            }
          }
          logo1 {
            node {
              altText
              sourceUrl
            }
          }
          lien1
          logo2 {
            node {
              altText
              sourceUrl
            }
          }
          lien2
          description
        }
      }
    }
  }
`;

function APropos({ pageContext }) {
  const equipe = useStaticQuery(query);
  const { dataAPropos } = pageContext;
  const dataA = dataAPropos.aPropos;
  const [dataE, setDataE] = useState("");
  const [language, setLanguage] = useState("");

  const [openPopIn, setOpenPopIn] =
    useState(false);

  const [metaLang, setMetaLang] = useState("");

  const [dataPopIn, setDataPopIn] = useState({});
  const [itemNavSelected, setItemNavSelected] =
    useState("about");
  const [section, setSection] = useState(null);

  useEffect(() => {
    if (openPopIn) {
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
        setDataE(equipe.fr.nodes);
        setLanguage("fr");
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setDataE(equipe.en.nodes);
        setLanguage("en");
        setMetaLang("en");
      }
    }
    getLanguage();

    function scrollTo() {
      let url =
        document.location.href.split("#")[1];
      if (url && document.getElementById(url)) {
        document
          .getElementById(url)
          .scrollIntoView();
      }
    }

    scrollTo();
  }, [
    dataE,
    equipe.en.nodes,
    equipe.fr.nodes,
    dataPopIn,
    openPopIn,
  ]);

  console.log(equipe);

  const myStateRef = React.useRef(
    itemNavSelected
  );
  const setMyState = (data) => {
    myStateRef.current = data;
    setItemNavSelected(data);
  };

  const listener = () => {
    const tabDOM =
      document.querySelectorAll("section");
    tabDOM.forEach((item) => {
      if (item && isInViewport(item)) {
        selectItemNav(item.dataset.section);
      }
    });
  };
  console.log(dataA);
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

  function addDataPopIn(i) {
    if (dataA && dataE) {
      if (i === 1) {
        setDataPopIn({
          firstname: dataA.bloc7Item1Titre,
          job: dataA.bloc7Item1Texte,
          img: dataA.bloc7Item1Image?.node
            .sourceUrl,
          icon1:
            dataA.bloc7Item1Icon1?.node.sourceUrl,
          link1: dataA.bloc7Item1Lien1,
          icon2:
            dataA.bloc7Item1Icon2?.node.sourceUrl,
          link2: dataA.bloc7Item1Lien2,
          alt: dataA.bloc7Item1Image.node.altText,
          altIcon1:
            dataA.bloc7Item1Icon1.node.altText,
          altIcon2:
            dataA.bloc7Item1Icon2.node.altText,
          description:
            dataA.bloc7Item1Description,
        });
      } else if (i === 2) {
        setDataPopIn({
          firstname: dataA.bloc7Item2Titre,
          job: dataA.bloc7Item2Texte,
          img: dataA.bloc7Item2Image?.node
            .sourceUrl,
          icon1:
            dataA.bloc7Item2Icon1?.node.sourceUrl,
          link1: dataA.bloc7Item2Lien1,
          icon2:
            dataA.bloc7Item2Icon2?.node.sourceUrl,
          link2: dataA.bloc7Item2Lien2,
          alt: dataA.bloc7Item1Image.node.altText,
          altIcon1:
            dataA.bloc7Item2Icon1.node.altText,
          altIcon2:
            dataA.bloc7Item2Icon2.node.altText,
          description:
            dataA.bloc7Item2Description,
        });
      } else {
        setDataPopIn({
          firstname: i.prenom,
          lastname: i.nom,
          job: i.poste,
          img: i.image?.node.sourceUrl,
          icon1: i.logo1?.node.sourceUrl,
          link1: i.lien1,
          icon2: i.logo2?.node.sourceUrl,
          link2: i.lien2,
          alt: i.image.node.altText,
          altIcon1: i.logo1.node.altText,
          altIcon2: i.logo2.node.altText,
          description: i.description,
        });
      }
      setOpenPopIn(true);
    }
  }

  function clickOverlay(e) {
    if (
      e.target.className ===
      "pop-in__profil__overlay"
    ) {
      setOpenPopIn(false);
    }
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataA.titreOngletDeLaPage}</title>
      </Helmet>
      {dataA && dataE ? (
        <main className="a-propos">
          {openPopIn ? (
            <PopInProfil
              onOverlay={(e) => clickOverlay(e)}
              onClose={() => setOpenPopIn(false)}
              text={dataPopIn.description}
              firstname={dataPopIn.firstname}
              lastname={dataPopIn.lastname}
              job={dataPopIn.job}
              img={dataPopIn.img}
              icon1={dataPopIn.icon1}
              icon2={dataPopIn.icon2}
              link1={dataPopIn.link1}
              link2={dataPopIn.link2}
              alt={dataPopIn.alt}
              altIcon1={dataPopIn.altIcon1}
              altIcon2={dataPopIn.altIcon2}
            />
          ) : null}
          <BlocHeader
            title={dataA.titre}
            text={dataA.description}
            img={
              dataA.imageDeFond?.node.sourceUrl
            }
            alt={dataA.imageDeFond.node.altText}
          />
          <div className="navbar-container-secondary">
            <nav className="navbar-small">
              <ul>
                <li>
                  <a
                    href="#about"
                    onClick={() =>
                      selectItemNav("about")
                    }
                    data-item="about"
                    className="active"
                  >
                    {dataA.bloc1Titre}
                  </a>
                </li>
                <li>
                  <a
                    href="#our-vision"
                    onClick={() =>
                      selectItemNav("our-vision")
                    }
                    data-item="our-vision"
                    className=""
                  >
                    {dataA.bloc3Titre}
                  </a>
                </li>
                <li>
                  <a
                    href="#our-values"
                    onClick={() =>
                      selectItemNav("our-values")
                    }
                    data-item="our-values"
                    className=""
                  >
                    {language == "fr"
                      ? "Valeurs & RSE"
                      : "Values & CSR"}
                  </a>
                </li>
                <li>
                  <a
                    href="#our-team"
                    onClick={() =>
                      selectItemNav("our-team")
                    }
                    data-item="our-team"
                    className=""
                  >
                    {language == "fr"
                      ? "Équipe"
                      : "Team"}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <section
            className="bloc-1"
            data-section="about"
            id="about"
          >
            <Description
              title={dataA.bloc1Titre}
              text={dataA.bloc1Texte}
            />
          </section>
          <section
            className="bloc-2"
            data-section="about"
          >
            <div className="bloc-2__image">
              <img
                src={
                  dataA.bloc2Image?.node.sourceUrl
                }
                alt={
                  dataA.bloc2Image.node.altText
                }
              />
            </div>
            <div className="bloc-2__content">
              <h2>{dataA.bloc2Titre1}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataA.bloc2Texte1,
                }}
              ></div>
              <h2>{dataA.bloc2Titre2}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataA.bloc2Texte2,
                }}
              ></div>
            </div>
          </section>
          <section
            className="bloc-3"
            data-section="our-vision"
          >
            <div className="bloc-3__image">
              <img
                src={
                  dataA.bloc3Image?.node.sourceUrl
                }
                alt={
                  dataA.bloc3Image.node.altText
                }
              />
              <div className="bloc-3__background-mobile"></div>
            </div>
            <div className="bloc-3__content">
              <h2 id="our-vision">
                {dataA.bloc3Titre}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataA.bloc3Texte,
                }}
              ></div>
            </div>
          </section>
          <section
            className="bloc-4"
            data-section="our-vision"
          >
            <Description
              title={dataA.bloc4Titre}
              text={dataA.bloc4Texte}
            />
            <div className="bloc-4__content">
              <CardList
                title={dataA.bloc4Item1Titre}
                text={dataA.bloc4Item1Texte}
                img={
                  dataA.bloc4Item1Image?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc4Item1Image.node
                    .altText
                }
              />
              <CardList
                title={dataA.bloc4Item2Titre}
                text={dataA.bloc4Item2Texte}
                img={
                  dataA.bloc4Item2Image?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc4Item2Image.node
                    .altText
                }
              />
              <CardList
                title={dataA.bloc4Item3Titre}
                text={dataA.bloc4Item3Texte}
                img={
                  dataA.bloc4Item3Image?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc4Item3Image.node
                    .altText
                }
              />
            </div>
          </section>
          <section
            className="bloc-5"
            data-section="our-vision"
          >
            <h2>{dataA.bloc5Titre}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: dataA.bloc5Texte,
              }}
            ></div>
            <div className="bloc-5__content">
              <CardNumber
                number={dataA.bloc5Carte1Number}
                text={dataA.bloc5Carte1Titre}
              />
              <CardNumber
                number={dataA.bloc5Carte2Number}
                text={dataA.bloc5Carte2Titre}
              />
              <CardNumber
                number={dataA.bloc5Carte3Number}
                text={dataA.bloc5Carte3Titre}
              />
              <CardNumber
                number={dataA.bloc5Carte4Number}
                text={dataA.bloc5Carte4Titre}
              />
            </div>
          </section>
          <section
            className="bloc-6"
            data-section="our-values"
          >
            <h2 id="our-values">
              {dataA.bloc6Titre}
            </h2>
            <div className="bloc-6__content">
              <CardListIcon
                title={dataA.bloc6Item1Titre}
                text={dataA.bloc6Item1Texte}
                icon={
                  dataA.bloc6Item1Icon?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc6Item1Icon.node
                    .altText
                }
              />
              <CardListIcon
                title={dataA.bloc6Item2Titre}
                text={dataA.bloc6Item2Texte}
                icon={
                  dataA.bloc6Item2Icon?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc6Item2Icon.node
                    .altText
                }
              />
              <CardListIcon
                title={dataA.bloc6Item3Titre}
                text={dataA.bloc6Item3Texte}
                icon={
                  dataA.bloc6Item3Icon?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc6Item3Icon.node
                    .altText
                }
              />
              <CardListIcon
                title={dataA.bloc6Item4Titre}
                text={dataA.bloc6Item4Texte}
                icon={
                  dataA.bloc6Item4Icon?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc6Item4Icon.node
                    .altText
                }
              />
            </div>
          </section>
          <section
            className="bloc-rse"
            data-section="our-values"
          >
            <h2>{dataA.titreRse}</h2>
            <div className="bloc-rse__content">
              <div className="text_container">
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataA.texteRse,
                  }}
                ></div>
                <Link
                  to={`/${metaLang}/${
                    metaLang == "fr"
                      ? "rse"
                      : "csr"
                  }`}
                  className="link-primary"
                >
                  <hr />
                  {dataA.texteLienVersLaPageRse}
                </Link>
              </div>
              <div className="illu_container">
                <img
                  src={
                    dataA.imageRse?.node.sourceUrl
                  }
                  alt={
                    dataA.imageRse.node.altText
                  }
                />
              </div>
            </div>
          </section>
          <section
            className="bloc-7"
            data-section="our-team"
          >
            <h2 id="our-team">
              {dataA.bloc7Titre}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: dataA.bloc7Texte,
              }}
            ></div>
            <div className="bloc-7__content">
              <CardProfil
                onClick={() => addDataPopIn(1)}
                img={
                  dataA.bloc7Item1Image?.node
                    .sourceUrl
                }
                firstname={dataA.bloc7Item1Titre}
                text={dataA.bloc7Item1Texte}
                icon1={
                  dataA.bloc7Item1Icon1?.node
                    .sourceUrl
                }
                icon2={
                  dataA.bloc7Item1Icon2?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc7Item1Image?.node
                    .altText
                }
                altIcon1={
                  dataA.bloc7Item1Icon1.node
                    .altText
                }
                altIcon2={
                  dataA.bloc7Item1Icon2.node
                    .altText
                }
                link1={dataA.bloc7Item1Lien1}
                link2={dataA.bloc7Item1Lien2}
              />
              <CardProfil
                onClick={() => addDataPopIn(2)}
                img={
                  dataA.bloc7Item2Image?.node
                    .sourceUrl
                }
                firstname={dataA.bloc7Item2Titre}
                text={dataA.bloc7Item2Texte}
                icon1={
                  dataA.bloc7Item2Icon1?.node
                    .sourceUrl
                }
                icon2={
                  dataA.bloc7Item2Icon2?.node
                    .sourceUrl
                }
                alt={
                  dataA.bloc7Item2Image?.node
                    .altText
                }
                altIcon1={
                  dataA.bloc7Item2Icon1.node
                    .altText
                }
                altIcon2={
                  dataA.bloc7Item2Icon2.node
                    .altText
                }
                link1={dataA.bloc7Item2Lien1}
                link2={dataA.bloc7Item2Lien2}
              />
            </div>
          </section>
          {dataE.length > 0 &&
          dataA.bloc8Visible === true ? (
            <section
              className="bloc-8"
              data-section="our-team"
            >
              <div className="bloc-8_container">
                <Description
                  title={dataA.bloc8Titre}
                  text={dataA.bloc8Texte}
                />
                <div className="bloc-8__content">
                  {dataE.map((item) => {
                    return (
                      <>
                        <CardProfil
                          onClick={() =>
                            addDataPopIn(
                              item.equipe
                            )
                          }
                          img={
                            item.equipe.image
                              ?.node.sourceUrl
                          }
                          firstname={
                            item.equipe.prenom
                          }
                          lastname={
                            item.equipe.nom
                          }
                          text={item.equipe.poste}
                          icon1={
                            item.equipe.logo1
                              ?.node.sourceUrl
                          }
                          icon2={
                            item.equipe.logo2
                              ?.node.sourceUrl
                          }
                          key={item}
                          alt={
                            item.equipe.image
                              ?.node.altText
                          }
                          altIcon1={
                            item.equipe.logo1.node
                              .altText
                          }
                          altIcon2={
                            item.equipe.logo2.node
                              .altText
                          }
                          link1={
                            item.equipe.lien1
                          }
                          link2={
                            item.equipe.lien2
                          }
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default APropos;

import React, {
  useEffect,
  useState,
} from "react";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";

import "../scss/components/footer.scss";

import Newsletter from "../components/newsletter";
import PopIn from "./popIn";

const query = graphql`
  query {
    footerFr: allWpMenu(
      filter: { name: { eq: "footer fr" } }
    ) {
      nodes {
        name
        menuItems {
          nodes {
            label
            path
          }
        }
        footer {
          titreReseauxSociaux
          texteCredits
          lien1ReseauxSociaux
          lien2ReseauxSociaux
          lien3ReseauxSociaux
          lien4ReseauxSociaux
          lien5ReseauxSociaux
          logo1ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo2ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo3ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo4ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo5ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          mentions
          conditions
          lienConditions {
            nodes {
              ... on WpPage {
                uri
              }
            }
          }
          lienMentions {
            nodes {
              ... on WpPage {
                uri
              }
            }
          }
        }
        logo {
          logoFondBlanc {
            node {
              sourceUrl
              altText
            }
          }
          logoTransparent {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    footerEn: allWpMenu(
      filter: { name: { eq: "footer en" } }
    ) {
      nodes {
        name
        menuItems {
          nodes {
            label
            path
          }
        }
        footer {
          titreReseauxSociaux
          texteCredits
          lien1ReseauxSociaux
          lien2ReseauxSociaux
          lien3ReseauxSociaux
          lien4ReseauxSociaux
          lien5ReseauxSociaux
          logo1ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo2ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo3ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo4ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          logo5ReseauxSociaux {
            node {
              sourceUrl
              altText
            }
          }
          mentions
          conditions
          lienConditions {
            nodes {
              ... on WpPage {
                uri
              }
            }
          }
          lienMentions {
            nodes {
              ... on WpPage {
                uri
              }
            }
          }
        }
        logo {
          logoFondBlanc {
            node {
              sourceUrl
              altText
            }
          }
          logoTransparent {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    newsletterFr: allWpMenu(
      filter: { name: { eq: "footer fr" } }
    ) {
      nodes {
        newsletter {
          blocVisiblePageAPropos
          blocVisiblePageAccueil
          blocVisiblePageContact
          blocVisiblePageNosProjets
          blocVisiblePageNosServices
          blocVisiblePageNotreEcosysteme
          blocVisiblePageRessourcesEtPublications
          logoBoutonMobile {
            node {
              sourceUrl
              altText
            }
          }
          texteChampsDeSaisieMobile
          texte
          texteBouton
          texteChampsDeSaisie
          texteConditions
          titre
          image {
            node {
              sourceUrl
              altText
            }
          }
          phraseRgpd
        }
      }
    }
    newsletterEn: allWpMenu(
      filter: { name: { eq: "footer en" } }
    ) {
      nodes {
        newsletter {
          blocVisiblePageAPropos
          blocVisiblePageAccueil
          blocVisiblePageContact
          blocVisiblePageNosProjets
          blocVisiblePageNosServices
          blocVisiblePageNotreEcosysteme
          blocVisiblePageRessourcesEtPublications
          logoBoutonMobile {
            node {
              sourceUrl
              altText
            }
          }
          texteChampsDeSaisieMobile
          texte
          texteBouton
          texteChampsDeSaisie
          texteConditions
          titre
          image {
            node {
              sourceUrl
              altText
            }
          }
          phraseRgpd
        }
      }
    }
    equipeFr: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "équipe" } }
          }
        }
      }
    ) {
      nodes {
        equipe {
          prenom
          nom
        }
      }
    }
    equipeEn: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "team" } }
          }
        }
      }
    ) {
      nodes {
        equipe {
          prenom
          nom
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
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        resources {
          image {
            node {
              sourceUrl
              altText
            }
          }
          titre
          texteRessource
          bouton
          boutonMobile
          fichier {
            node {
              mediaItemUrl
              title
            }
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
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        resources {
          image {
            node {
              sourceUrl
              altText
            }
          }
          titre
          texteRessource
          bouton
          boutonMobile
          fichier {
            node {
              mediaItemUrl
              title
            }
          }
        }
      }
    }
  }
`;

const Footer = () => {
  const data = useStaticQuery(query);
  const [language, setLanguage] = useState("");
  const [logo, setLogo] = useState("");
  const [dataMenuF, setDataMenuF] = useState("");
  const [dataF, setDataF] = useState("");
  const [path, setPath] = useState("");

  //newslettter
  const [dataFooterN, setDataFooterN] =
    useState("");
  const [
    visibleNewsletter,
    setVisibleNewsletter,
  ] = useState(false);
  const [containerStyle, setContainerStyle] =
    useState("");
  const [newsletterStyle, setNewsletterStyle] =
    useState("");

  //equipe
  const [dataE, setDataE] = useState("");

  //ressources
  const [dataR, setDataR] = useState("");

  //Form
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [messageEmail, setMessageEmail] =
    useState("");
  const [messageCheckbox, setMessageCheckbox] =
    useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    function navBarTypeLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setLanguage("fr");
        setPath("/fr");
        setLogo(data.footerFr.nodes[0].logo);
        setDataMenuF(
          data.footerFr.nodes[0].menuItems.nodes
        );
        setDataF(data.footerFr.nodes[0].footer);
        setDataFooterN(
          data.newsletterFr.nodes[0].newsletter
        );
        setDataE(data.equipeFr.nodes);
        setDataR(data.frResources.nodes);
        setUrl(
          `${process.env.GATSBY_NEWSLETTER_FORM_FR}`
        );
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setLanguage("en");
        setPath("/en");
        setLogo(data.footerEn.nodes[0].logo);
        setDataMenuF(
          data.footerEn.nodes[0].menuItems.nodes
        );
        setDataF(data.footerEn.nodes[0].footer);
        setDataFooterN(
          data.newsletterEn.nodes[0].newsletter
        );
        setDataE(data.equipeEn.nodes);
        setDataR(data.enResources.nodes);
        setUrl(
          `${process.env.GATSBY_NEWSLETTER_FORM_EN}`
        );
      }
    }
    navBarTypeLanguage();

    function checkLocation() {
      if (
        (window.location.href.match(
          "/a-propos"
        ) ||
          window.location.href.match("/about")) &&
        dataFooterN.blocVisiblePageAPropos &&
        dataE.length === 0
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("dark");
        setNewsletterStyle("blue");
      } else if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/en$") ||
        window.location.href.match("/fr/$") ||
        window.location.href.match("/en/$")
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("white");
        setNewsletterStyle("blue");
      } else if (
        (window.location.href.match(
          "/a-propos"
        ) ||
          window.location.href.match("/about")) &&
        dataFooterN.blocVisiblePageAPropos &&
        dataE.length > 0
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("blue");
        setNewsletterStyle("white");
      } else if (
        (window.location.href.match(
          "/nos-services"
        ) ||
          window.location.href.match(
            "/our-services"
          )) &&
        dataFooterN.blocVisiblePageNosServices
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("white");
        setNewsletterStyle("blue");
      } else if (
        (window.location.href.match(
          "/nos-projets"
        ) ||
          window.location.href.match(
            "/our-projects"
          )) &&
        dataFooterN.blocVisiblePageNosProjets
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("white");
        setNewsletterStyle("blue");
      } else if (
        (window.location.href.match(
          "/notre-ecosysteme"
        ) ||
          window.location.href.match(
            "/our-ecosystem"
          )) &&
        dataFooterN.blocVisiblePageNotreEcosysteme
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("white");
        setNewsletterStyle("blue");
      } else if (
        (window.location.href.match(
          "/ressources"
        ) ||
          window.location.href.match(
            "/resources"
          )) &&
        dataFooterN.blocVisiblePageRessourcesEtPublications &&
        dataR.length === 0
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("dark");
        setNewsletterStyle("blue");
      } else if (
        (window.location.href.match(
          "/ressources"
        ) ||
          window.location.href.match(
            "/resources"
          )) &&
        dataFooterN.blocVisiblePageRessourcesEtPublications &&
        dataR.length > 0
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("white");
        setNewsletterStyle("blue");
      } else if (
        (window.location.href.match(
          "/contactez-nous"
        ) ||
          window.location.href.match(
            "/contact-us"
          )) &&
        dataFooterN.blocVisiblePageContact
      ) {
        setVisibleNewsletter(true);
        setContainerStyle("white");
        setNewsletterStyle("blue");
      } else {
        setVisibleNewsletter(false);
      }
    }
    checkLocation();
  }, [
    language,
    data.frResources.nodes,
    data.enResources.nodes,
    data.footerEn.nodes,
    data.footerFr.nodes,
    data.newsletterEn.nodes,
    data.newsletterFr.nodes,
    dataE,
    dataFooterN.blocVisiblePageAPropos,
    dataFooterN.blocVisiblePageAccueil,
    dataFooterN.blocVisiblePageContact,
    dataFooterN.blocVisiblePageNosProjets,
    dataFooterN.blocVisiblePageNosServices,
    dataFooterN.blocVisiblePageNotreEcosysteme,
    dataFooterN.blocVisiblePageRessourcesEtPublications,
    data.equipeEn.nodes,
    data.equipeFr.nodes,
    dataR.length,
    url,
  ]);

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
          }
        } else if (
          response.status === "mail_sent"
        ) {
          setMessage(response.message);
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

  return (
    <>
      <PopIn />
      {data && logo ? (
        <>
          {visibleNewsletter ? (
            <Newsletter
              lang={language}
              title={dataFooterN.titre}
              text={dataFooterN.texte}
              textChampsDeSaisie={
                dataFooterN.texteChampsDeSaisie
              }
              textChampsDeSaisieMobile={
                dataFooterN.texteChampsDeSaisieMobile
              }
              textBouton={dataFooterN.texteBouton}
              imageLogo={
                dataFooterN.logoBoutonMobile.node
                  .sourceUrl
              }
              altLogo={
                dataFooterN.logoBoutonMobile.node
                  .altText
              }
              textConditions={
                dataFooterN.texteConditions
              }
              image={
                dataFooterN.image.node.sourceUrl
              }
              alt={dataFooterN.image.node.altText}
              styleContainer={containerStyle}
              newsletterStyle={newsletterStyle}
              action={url}
              onSubmit={formSubmissionHandler}
              message={message}
              phraseRgpd={dataFooterN.phraseRgpd}
              messageCheckbox={messageCheckbox}
              messageEmail={messageEmail}
              error={error}
            />
          ) : null}
          <footer className={`footer`}>
            <div className="footer-container">
              <div className="footer-content">
                <div className="footer-logo">
                  <Link to={path}>
                    <img
                      src={
                        logo.logoTransparent.node
                          .sourceUrl
                      }
                      alt={
                        logo.logoTransparent.node
                          .altText
                      }
                    />
                  </Link>
                </div>
                <div className="footer-link">
                  <ul>
                    {dataMenuF.map((item) => {
                      if (
                        item.label ===
                        "News & Events"
                      )
                        return (
                          <a
                            href={"/en/News/"}
                            key={item}
                          >
                            {item.label}
                          </a>
                        );
                      else if (
                        item.label ===
                        "Actualités"
                      )
                        return (
                          <Link
                            to={"/fr/Actualités/"}
                            key={item}
                          >
                            {item.label}
                          </Link>
                        );
                      return (
                        <Link
                          to={item.path}
                          key={item}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                    {window.matchMedia(
                      "(max-width: 1280px)"
                    ).matches ? (
                      <div className="footer-legal__conditions">
                        <Link
                          to={
                            dataF.lienConditions
                              .uri
                          }
                        >
                          {dataF.conditions}
                        </Link>
                        <Link
                          to={
                            dataF.lienMentions.uri
                          }
                        >
                          {dataF.mentions}
                        </Link>
                      </div>
                    ) : null}
                  </ul>
                </div>
                <div className="footer-social">
                  {dataF.lien1ReseauxSociaux !==
                    null ||
                  dataF.lien2ReseauxSociaux !==
                    null ||
                  dataF.lien3ReseauxSociaux !==
                    null ||
                  dataF.lien4ReseauxSociaux !==
                    null ||
                  dataF.lien5ReseauxSociaux !==
                    null ? (
                    <>
                      <h4>
                        {
                          dataF.titreReseauxSociaux
                        }
                      </h4>
                      <div className="footer-social__logo">
                        {dataF.lien1ReseauxSociaux !==
                        null ? (
                          <a
                            href={
                              dataF.lien1ReseauxSociaux
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={
                                dataF
                                  .logo1ReseauxSociaux
                                  .node.sourceUrl
                              }
                              alt={
                                dataF
                                  .logo1ReseauxSociaux
                                  .node.altText
                              }
                            />
                          </a>
                        ) : null}
                        {dataF.lien2ReseauxSociaux !==
                        null ? (
                          <a
                            href={
                              dataF.lien2ReseauxSociaux
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={
                                dataF
                                  .logo2ReseauxSociaux
                                  .node.sourceUrl
                              }
                              alt={
                                dataF
                                  .logo2ReseauxSociaux
                                  .node.altText
                              }
                            />
                          </a>
                        ) : null}
                        {dataF.lien3ReseauxSociaux !==
                        null ? (
                          <a
                            href={
                              dataF.lien3ReseauxSociaux
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={
                                dataF
                                  .logo3ReseauxSociaux
                                  .node.sourceUrl
                              }
                              alt={
                                dataF
                                  .logo3ReseauxSociaux
                                  .node.altText
                              }
                            />
                          </a>
                        ) : null}
                        {dataF.lien4ReseauxSociaux !==
                        null ? (
                          <a
                            href={
                              dataF.lien4ReseauxSociaux
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={
                                dataF
                                  .logo4ReseauxSociaux
                                  .node.sourceUrl
                              }
                              alt={
                                dataF
                                  .logo4ReseauxSociaux
                                  .node.altText
                              }
                            />
                          </a>
                        ) : null}
                        {dataF.lien5ReseauxSociaux !==
                        null ? (
                          <a
                            href={
                              dataF.lien5ReseauxSociaux
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={
                                dataF
                                  .logo5ReseauxSociaux
                                  .node.sourceUrl
                              }
                              alt={
                                dataF
                                  .logo5ReseauxSociaux
                                  .node.altText
                              }
                            />
                          </a>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="footer-legal">
                <div className="footer-legal__conditions">
                  <Link
                    to={dataF.lienConditions.uri}
                  >
                    {dataF.conditions}
                  </Link>
                  <Link
                    to={dataF.lienMentions.uri}
                  >
                    {dataF.mentions}
                  </Link>
                </div>
                <div className="footer-legal__credits">
                  <small>
                    {dataF.texteCredits}
                  </small>
                </div>
              </div>
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
};

export default Footer;

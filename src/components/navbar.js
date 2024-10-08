import React, {
  useEffect,
  useState,
} from "react";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
// import {ArrowUpRight} from "react-feather";
import { ArrowDown, ChevronDown, Menu, Search } from "react-feather";
import { X } from "react-feather";

import "../scss/components/navbar.scss";
import SearchElement from "./searchElement";

const query = graphql`
  query {
    translateFr: allWpPage(
      filter: { language: { slug: { eq: "fr" } } }
    ) {
      nodes {
        slug
        translations {
          slug
        }
      }
    }
    translateEn: allWpPage(
      filter: { language: { slug: { eq: "en" } } }
    ) {
      nodes {
        slug
        translations {
          slug
        }
      }
    }
    menuFr: allWpMenu(
      filter: { name: { eq: "menu fr" } }
    ) {
      nodes {
        name
        menuItems {
          nodes {
            label
            path
          }
        }
        logo {
          logoFondBlanc {
            sourceUrl
            altText
          }
          logoTransparent {
            sourceUrl
            altText
          }
        }
      }
    }

    menuEn: allWpMenu(
      filter: { name: { eq: "menu en" } }
    ) {
      nodes {
        name
        menuItems {
          nodes {
            label
            path
          }
        }
        logo {
          logoFondBlanc {
            sourceUrl
            altText
          }
          logoTransparent {
            sourceUrl
            altText
          }
        }
      }
    }

    menuHamburgerFr: allWpMenu(
      filter: {
        name: { eq: "menu hamburger fr" }
      }
    ) {
      nodes {
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
            sourceUrl
            altText
          }
          logo2ReseauxSociaux {
            sourceUrl
            altText
          }
          logo3ReseauxSociaux {
            sourceUrl
            altText
          }
          logo4ReseauxSociaux {
            sourceUrl
            altText
          }
          logo5ReseauxSociaux {
            sourceUrl
            altText
          }
          mentions
          conditions
          lienConditions {
            ... on WpPage {
              uri
            }
          }
          lienMentions {
            ... on WpPage {
              uri
            }
          }
        }
        logo {
          logoFondBlanc {
            sourceUrl
            altText
          }
          logoTransparent {
            sourceUrl
            altText
          }
        }
      }
    }

    menuHamburgerEn: allWpMenu(
      filter: {
        name: { eq: "menu hamburger en" }
      }
    ) {
      nodes {
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
            sourceUrl
            altText
          }
          logo2ReseauxSociaux {
            sourceUrl
            altText
          }
          logo3ReseauxSociaux {
            sourceUrl
            altText
          }
          logo4ReseauxSociaux {
            sourceUrl
            altText
          }
          logo5ReseauxSociaux {
            sourceUrl
            altText
          }
          mentions
          conditions
          lienConditions {
            ... on WpPage {
              uri
            }
          }
          lienMentions {
            ... on WpPage {
              uri
            }
          }
        }
        logo {
          logoFondBlanc {
            sourceUrl
            altText
          }
          logoTransparent {
            sourceUrl
            altText
          }
        }
      }
    }

    languagesMenuItem: allWp {
      nodes {
        languages {
          slug
        }
      }
    }
  }
`;

const Navbar = () => {
  const data = useStaticQuery(query);

  const [navStyle, setNavStyle] =
    useState("navbar");
  const [visibleNav, setVisibleNav] =
    useState("visible");
  const [visibleSearch, setVisibleSearch] =
    useState(false);
  const [logo, setLogo] = useState("");
  const [dataM, setDataM] = useState("");
  const [activeLink, setActiveLink] =
    useState("");

  //language
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");
  const [
    preferredLanguage,
    setPreferredLanguage,
  ] = useState("fr");
  const [switchLanguage, setSwitchLanguage] =
    useState("");

  //mobile
  const [openMenu, setOpenMenu] = useState(false);
  const [logoHamburger, setLogoHamburger] =
    useState("");
  const [dataHamburger, setDataHamburger] =
    useState("");
  const [itemsHamburger, setItemsHamburger] =
    useState("");

  useEffect(() => {
    if (openMenu || visibleSearch) {
      document
        .querySelector("body")
        .classList.add("stop-scroll");
    } else {
      document
        .querySelector("body")
        .classList.remove("stop-scroll");
    }

    function navBarTypeLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/") ||
        window.localStorage.getItem(
          "preferredLanguage"
        ) === "fr"
      ) {
        setLanguage("fr");
        setPath("/fr");
        setLogo(data.menuFr.nodes[0].logo);
        setDataM(
          data.menuFr.nodes[0].menuItems.nodes
        );

        setLogoHamburger(
          data.menuHamburgerFr.nodes[0].logo
        );
        setDataHamburger(
          data.menuHamburgerFr.nodes[0].footer
        );
        setItemsHamburger(
          data.menuHamburgerFr.nodes[0].menuItems
            .nodes
        );
      }

      if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/") ||
        window.localStorage.getItem(
          "preferredLanguage"
        ) === "en"
      ) {
        setLanguage("en");
        setPath("/en");
        setLogo(data.menuEn.nodes[0].logo);
        setDataM(
          data.menuEn.nodes[0].menuItems.nodes
        );

        setLogoHamburger(
          data.menuHamburgerEn.nodes[0].logo
        );
        setDataHamburger(
          data.menuHamburgerEn.nodes[0].footer
        );
        setItemsHamburger(
          data.menuHamburgerEn.nodes[0].menuItems
            .nodes
        );
      }
    }
    navBarTypeLanguage();

    function navBarTypeStyle() {
      if (
        window.location.href.match("contact") ||
        window.location.href.match("/en$") ||
        window.location.href.match("/en/$") ||
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/$")
      ) {
        setNavStyle("navbar-transparent");
      }

      if (
        window.location.href.match(
          "ressources"
        ) ||
        window.location.href.match("resources") ||
        window.location.href.match(
          /(recrutement|recruitment)\/[a-zA-Z]+/
        )
      ) {
        setNavStyle("navbar-transparent-blue");
      }
    }
    navBarTypeStyle();

    function scrollDirection() {
      window.onscroll = function (e) {
        if (
          this.oldScroll > this.scrollY ===
            false &&
          this.scrollY >= 0 &&
          this.oldScroll >= 0
        ) {
          setVisibleNav("invisible");
        } else if (
          this.oldScroll > this.scrollY ===
          true
        ) {
          setVisibleNav("visible");
        }
        this.oldScroll = this.scrollY;

        if (
          document.querySelector(".slider-home")
        ) {
          const box = document.querySelector(
            ".slider-home"
          );
          const rect =
            box.getBoundingClientRect();

          const isInViewport =
            rect.top >= -672 && rect.left >= 0;

          if (isInViewport === true) {
            setNavStyle("navbar-transparent");
          } else if (isInViewport === false) {
            setNavStyle("");
          }
        }
      };
    }
    scrollDirection();

    function checkPreferredLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setPreferredLanguage("fr");
        window.localStorage.setItem(
          "preferredLanguage",
          preferredLanguage
        );
        data.translateFr.nodes.map((item) => {
          return (
            <>
              {window.location.href.match(
                `${item.slug}`
              ) && item.translations.length > 0
                ? setSwitchLanguage(
                    `${item.translations[0].slug}/`
                  )
                : null}
            </>
          );
        });
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setPreferredLanguage("en");
        window.localStorage.setItem(
          "preferredLanguage",
          preferredLanguage
        );
        data.translateEn.nodes.map((item) => {
          return (
            <>
              {window.location.href.match(
                `${item.slug}`
              ) && item.translations.length > 0
                ? setSwitchLanguage(
                    `${item.translations[0].slug}/`
                  )
                : null}
            </>
          );
        });
      } else {
        setPreferredLanguage("fr");
      }
    }
    checkPreferredLanguage();

    function isActive() {
      console.log();
      if (["/fr/%C3%89v%C3%A8nements/", "/fr/Ressources%20et%20Publications/", "/fr/Actualit%C3%A9s/"].includes(window.location.pathname)) {
        setActiveLink("/fr/ressources/");
      } else if (["/en/Events/", "/en/News/", "/en/Resources%20and%20publications/"].includes(window.location.pathname)) {
        setActiveLink("/en/resources/");
      } else {
        setActiveLink(window.location.pathname);
      }
    }
    isActive();
  }, [
    preferredLanguage,
    switchLanguage,
    dataM,
    dataHamburger,
    activeLink,
    data.menuEn.nodes,
    data.menuFr.nodes,
    data.menuHamburgerEn.nodes,
    data.menuHamburgerFr.nodes,
    data.translateEn.nodes,
    data.translateFr.nodes,
    openMenu,
    visibleSearch,
  ]);

  const handleLink = (preferredLanguage, slug) => {
    let redirectName = preferredLanguage

    if(preferredLanguage == "") {
      const pathname = window.location.pathname;
      const segments = pathname.split('/').filter(Boolean); // filter(Boolean) élimine les segments vides

      // Vérifier si le premier segment est 'fr' ou 'en'
      if (segments[0] === 'fr' || segments[0] === 'en') {
        // Si oui, récupérer le texte après '/fr/' ou '/en/'
        const textAfterLang = segments[1] ? decodeURIComponent(segments[1]) : '';
        console.log(textAfterLang); // Traiter ou utiliser le texte comme nécessaire
        if(textAfterLang == "Évènements") {
          redirectName = "Events"
        } else if( textAfterLang == "Events") 
        {
          redirectName =  "Évènements"
        } else if (textAfterLang == "Actualités") {
          redirectName = "News"
        } else if (textAfterLang == "News") {
          redirectName = "Actualités"
        } else if (textAfterLang == "Ressources et Publications") {
          redirectName = "Resources and publications"
        } else if (textAfterLang == "Resources and publications") {
          redirectName = "Ressources et Publications"
        } 
      }
    };
    const baseUrl = window.location.origin;
    const redirectUrl = `${baseUrl}/${slug}/${redirectName}`;
    window.location.href = redirectUrl;
  }

  const openSubMenu = (e) => {
    e.stopPropagation();
    const submenu = document.querySelectorAll(".container_subMenu")
    for(let i = 0; i < submenu.length; i++) {
      submenu[i].classList.toggle("active")
    }
  }

  return (
    <>
      {dataM && logo && logoHamburger ? (
        <>
          <nav
            className={`navbar ${visibleNav} ${navStyle}`}
          >
            <div className="navbar-container">
              <Link to={`${path}/`}>
                {navStyle ===
                "navbar-transparent" ? (
                  <img
                    src={
                      logo.logoTransparent
                        .sourceUrl
                    }
                    alt={
                      logo.logoTransparent.altText
                    }
                  />
                ) : (
                  <img
                    src={
                      logo.logoFondBlanc.sourceUrl
                    }
                    alt={
                      logo.logoFondBlanc.altText
                    }
                  />
                )}
              </Link>
              <ul>
                {dataM.map(
                  ({ label, path }, index) => (
                    <>
                      {index ===
                      dataM.length - 1 ? (
                        <>
                          <li
                            className="navbar-responsive__icon search"
                            onClick={() =>
                              setVisibleSearch(
                                true
                              )
                            }
                            onKeyDown={() =>
                              setVisibleSearch(
                                true
                              )
                            }
                          >
                            <Search />
                          </li>
                            <li>
                              <Link
                                className="tag"
                                key={label}
                                to={path}
                              >
                                {label}
                                {/* <ArrowUpRight /> */}
                              </Link>
                            </li>
                        </>
                      ) : (
                        <>
                          {activeLink === path ? (
                            <>
                                {label == "News & Events" || label == "Actualités" ? (
                              <li>
                              <Link
                                className="subMenu active"
                                key={label}
                              >
                                {label}
                                <ChevronDown size={20} />
                                <div className="container_subMenu">
                                  {preferredLanguage == "en" ? (
                                    <>
                                      <Link to={`/${preferredLanguage}/News`} className={window.location.pathname ==`/${preferredLanguage}/News/` ? 'active' : '' }>News</Link>
                                      <Link to={`/${preferredLanguage}/Resources and publications`} className={window.location.pathname == `/${preferredLanguage}/Resources%20and%20publications/` ? 'active' : ''}>Resources and publications</Link>
                                      <Link to={`/${preferredLanguage}/Events`} className={window.location.pathname == `/${preferredLanguage}/Events/` ? 'active' : ''}>Events</Link>
                                    </>
                                  ) : (
                                    <>
                                      <Link to={`/${preferredLanguage}/Actualités`} className={window.location.pathname == `/fr/Actualit%C3%A9s/` ? 'active' : '' }>Actualités</Link>
                                      <Link to={`/${preferredLanguage}/Ressources et Publications`} className={window.location.pathname == `/fr/Ressources%20et%20Publications/` ? 'active' : '' }>Ressources et publications</Link>
                                      <Link to={`/${preferredLanguage}/Évènements`} className={window.location.pathname == `/fr/%C3%89v%C3%A8nements/` ? 'active' : '' }>Évènements</Link>
                                    </>
                                  )} 
                                </div>
                              </Link>
                            </li>
                            ): (
                            <li>
                              <Link
                                className="active"
                                key={label}
                                to={path}
                              >
                                {label}
                                {/* <ArrowUpRight /> */}
                              </Link>
                            </li>

                            )}
                            </>
                          ) : (
                            <>
                            {label == "News & Events" || label == "Actualités" ? (
                              <li>
                              <Link
                                className={`subMenu`}
                                key={label}
                              >
                                {label}
                                <ChevronDown size={20}/>
                                <div className="container_subMenu">
                                  {preferredLanguage == "en" ? (
                                    <>
                                      <Link to={`/${preferredLanguage}/News`} className={activeLink ==`/${preferredLanguage}/News/` ? 'active' : '' }>News</Link>
                                      <Link to={`/${preferredLanguage}/Resources and publications`} className={activeLink == `/${preferredLanguage}/Resources%20and%20publications/` ? 'active' : ''}>Resources and publications</Link>
                                      <Link to={`/${preferredLanguage}/Events`} className={activeLink == `/${preferredLanguage}/Events/` ? 'active' : ''}>Events</Link>
                                    </>
                                  ) : (
                                    <>
                                      <Link to={`/${preferredLanguage}/Actualités`} className={activeLink == `/fr/Actualit%C3%A9s/` ? 'active' : '' }>Actualités</Link>
                                      <Link to={`/${preferredLanguage}/Ressources et Publications`} className={activeLink == `/fr/Ressources%20et%20Publications/` ? 'active' : '' }>Ressources et publications</Link>
                                      <Link to={`/${preferredLanguage}/Évènements`} className={activeLink == `/fr/%C3%89v%C3%A8nements/` ? 'active' : '' }>Évènements</Link>
                                    </>
                                  )} 
                                </div>
                              </Link>
                            </li>
                              ): (
                              <li>
                                <Link
                                  className=""
                                  key={label}
                                  to={path}
                                >
                                  {label}
                                  {/* <ArrowUpRight /> */}
                                </Link>
                              </li>
                              )}
                              </>
                          )}
                        </>
                      )}
                    </>
                  )
                )}
                <li>
                  {data.languagesMenuItem.nodes[0].languages.map(
                    ({ slug }) => (
                      <>
                        {language === slug ? (
                          <Link
                            key={slug}
                            className="language active"
                          >
                            {slug}
                          </Link>
                        ) : (
                          <a
                            key={slug}
                            className="language"
                            onClick={() => handleLink(switchLanguage, slug)}
                          >
                            {slug}
                          </a>
                        )}
                      </>
                    )
                  )}
                </li>
              </ul>
            </div>
          </nav>
          {visibleSearch === true ? (
            <div className="navbar-responsive__open search">
              <div className="navbar-responsive__open-head">
                <Link to={`${path}/`}>
                  <img
                    src={
                      logoHamburger.logoFondBlanc
                        .sourceUrl
                    }
                    alt={
                      logoHamburger.logoFondBlanc
                        .altText
                    }
                  />
                </Link>
                <div
                  className="navbar-responsive__open-head-icon"
                  onClick={() =>
                    setVisibleSearch(false)
                  }
                  onKeyDown={() =>
                    setVisibleSearch(false)
                  }
                  role="button"
                  tabIndex={0}
                >
                  <X />
                </div>
              </div>
              <div>
                <SearchElement
                  quit={() => {
                    setVisibleSearch(false);
                  }}
                />
              </div>
            </div>
          ) : null}
          <nav
            className={`navbar-responsive ${visibleNav} ${navStyle}`}
          >
            <div className="navbar-responsive__logo">
              <Link to={`${path}/`}>
                {navStyle ===
                "navbar-transparent" ? (
                  <img
                    src={
                      logo.logoTransparent
                        .sourceUrl
                    }
                    alt={
                      logo.logoTransparent.altText
                    }
                  />
                ) : (
                  <img
                    src={
                      logo.logoFondBlanc.sourceUrl
                    }
                    alt={
                      logo.logoFondBlanc.altText
                    }
                  />
                )}
              </Link>
            </div>
            {openMenu === true ? (
              <div className="navbar-responsive__open">
                <div className="navbar-responsive__open-head">
                  <Link to={`${path}/`}>
                    <img
                      src={
                        logoHamburger
                          .logoFondBlanc.sourceUrl
                      }
                      alt={
                        logoHamburger
                          .logoFondBlanc.altText
                      }
                    />
                  </Link>
                  <div
                    className="navbar-responsive__open-head-icon"
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    onKeyDown={() =>
                      setOpenMenu(false)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <X />
                  </div>
                </div>
                <ul className="choose-language">
                  <li>
                    {data.languagesMenuItem.nodes[0].languages.map(
                      ({ slug }) => (
                        <>
                          {language === slug ? (
                            <Link
                              key={slug}
                              className="language active"
                              to={`/${slug}/${switchLanguage}`}
                            >
                              {slug}
                            </Link>
                          ) : (
                            <Link
                              key={slug}
                              className="language"
                              to={`/${slug}/${switchLanguage}`}
                            >
                              {slug}
                            </Link>
                          )}
                        </>
                      )
                    )}
                  </li>
                </ul>
                <div className="navbar-responsive__open-items">
                  <ul>
                    {itemsHamburger.map(
                      ({ label, path }) => (
                        <>
                          {activeLink === path ? (
                            <>
                              {label == "News & Events" || label == "Actualités" ? (
                                <li className="parent-submenu"> 
                                  <p
                                    className="subMenu active"
                                    key={label}
                                    onClick={(e) => openSubMenu(e)}
                                  >
                                    {label}
                                    <ChevronDown size={20} />
                                  </p>
                                  <div className="container_subMenu">
                                    {preferredLanguage == "en" ? (
                                      <>
                                        <Link to={`/${preferredLanguage}/News`} className={window.location.pathname ==`/${preferredLanguage}/News/` ? 'active' : '' }>News</Link>
                                        <Link to={`/${preferredLanguage}/Resources and publications`} className={window.location.pathname == `/${preferredLanguage}/Resources%20and%20publications/` ? 'active' : ''}>Resources and publications</Link>
                                        <Link to={`/${preferredLanguage}/Events`} className={window.location.pathname == `/${preferredLanguage}/Events/` ? 'active' : ''}>Events</Link>
                                      </>
                                    ) : (
                                      <>
                                        <Link to={`/${preferredLanguage}/Actualités`} className={window.location.pathname == `/fr/Actualit%C3%A9s/` ? 'active' : '' }>Actualités</Link>
                                        <Link to={`/${preferredLanguage}/Ressources et Publications`} className={window.location.pathname == `/fr/Ressources%20et%20Publications/` ? 'active' : '' }>Ressources et publications</Link>
                                        <Link to={`/${preferredLanguage}/Évènements`} className={window.location.pathname == `/fr/%C3%89v%C3%A8nements/` ? 'active' : '' }>Évènements</Link>
                                      </>
                                    )} 
                                  </div>
                                </li>
                              ) :(
                                <li>
                                  <Link
                                    className="active"
                                    key={label}
                                    to={path}
                                  >
                                    {label}
                                  </Link>
                                </li>
                              )}
                            </>
                          ) : (
                            <>
                            {label == "News & Events" || label == "Actualités" ? (
                              <li className="parent-submenu">
                                <p
                                  className="subMenu"
                                  key={label}
                                  onClick={(e) => openSubMenu(e)}
                                >
                                  {label}
                                  <ChevronDown size={20} />
                                </p>
                                <div className="container_subMenu">
                                    {preferredLanguage == "en" ? (
                                      <>
                                        <Link to={`/${preferredLanguage}/News`} className={window.location.pathname ==`/${preferredLanguage}/News/` ? 'active' : '' }>News</Link>
                                        <Link to={`/${preferredLanguage}/Resources and publications`} className={window.location.pathname == `/${preferredLanguage}/Resources%20and%20publications/` ? 'active' : ''}>Resources and publications</Link>
                                        <Link to={`/${preferredLanguage}/Events`} className={window.location.pathname == `/${preferredLanguage}/Events/` ? 'active' : ''}>Events</Link>
                                      </>
                                    ) : (
                                      <>
                                        <Link to={`/${preferredLanguage}/Actualités`} className={window.location.pathname == `/fr/Actualit%C3%A9s/` ? 'active' : '' }>Actualités</Link>
                                        <Link to={`/${preferredLanguage}/Ressources et Publications`} className={window.location.pathname == `/fr/Ressources%20et%20Publications/` ? 'active' : '' }>Ressources et publications</Link>
                                        <Link to={`/${preferredLanguage}/Évènements`} className={window.location.pathname == `/fr/%C3%89v%C3%A8nements/` ? 'active' : '' }>Évènements</Link>
                                      </>
                                    )} 
                                  </div>
                              </li>
                            ) :(
                              <li>
                                <Link
                                  key={label}
                                  to={path}
                                >
                                  {label}
                                </Link>
                              </li>
                            )}
                          </>
                          )}
                        </>
                      )
                    )}
                  </ul>
                </div>
                {dataHamburger.lien1ReseauxSociaux !==
                  null ||
                dataHamburger.lien2ReseauxSociaux !==
                  null ||
                dataHamburger.lien3ReseauxSociaux !==
                  null ||
                dataHamburger.lien4ReseauxSociaux !==
                  null ||
                dataHamburger.lien5ReseauxSociaux !==
                  null ? (
                  <div className="navbar-responsive__open-sociaux">
                    <h4>
                      {
                        dataHamburger.titreReseauxSociaux
                      }
                    </h4>
                    <div className="navbar-responsive__open-logo">
                      {dataHamburger.lien1ReseauxSociaux ? (
                        <a
                          href={
                            dataHamburger.lien1ReseauxSociaux
                          }
                        >
                          <img
                            src={
                              dataHamburger
                                .logo1ReseauxSociaux
                                .sourceUrl
                            }
                            alt={
                              dataHamburger
                                .logo1ReseauxSociaux
                                .altText
                            }
                          />
                        </a>
                      ) : null}
                      {dataHamburger.lien2ReseauxSociaux ? (
                        <a
                          href={
                            dataHamburger.lien2ReseauxSociaux
                          }
                        >
                          <img
                            src={
                              dataHamburger
                                .logo2ReseauxSociaux
                                .sourceUrl
                            }
                            alt={
                              dataHamburger
                                .logo2ReseauxSociaux
                                .altText
                            }
                          />
                        </a>
                      ) : null}
                      {dataHamburger.lien3ReseauxSociaux ? (
                        <a
                          href={
                            dataHamburger.lien3ReseauxSociaux
                          }
                        >
                          <img
                            src={
                              dataHamburger
                                .logo3ReseauxSociaux
                                .sourceUrl
                            }
                            alt={
                              dataHamburger
                                .logo3ReseauxSociaux
                                .altText
                            }
                          />
                        </a>
                      ) : null}
                      {dataHamburger.lien4ReseauxSociaux ? (
                        <a
                          href={
                            dataHamburger.lien4ReseauxSociaux
                          }
                        >
                          <img
                            src={
                              dataHamburger
                                .logo4ReseauxSociaux
                                .sourceUrl
                            }
                            alt={
                              dataHamburger
                                .logo4ReseauxSociaux
                                .altText
                            }
                          />
                        </a>
                      ) : null}
                      {dataHamburger.lien5ReseauxSociaux ? (
                        <a
                          href={
                            dataHamburger.lien5ReseauxSociaux
                          }
                        >
                          <img
                            src={
                              dataHamburger
                                .logo5ReseauxSociaux
                                .sourceUrl
                            }
                            alt={
                              dataHamburger
                                .logo5ReseauxSociaux
                                .altText
                            }
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                <div className="navbar-responsive__open-legal">
                  <div className="navbar-responsive__open-legal__conditions">
                    <Link
                      to={
                        dataHamburger.lienMentions
                          .uri
                      }
                    >
                      {dataHamburger.mentions}
                    </Link>
                    <Link
                      to={
                        dataHamburger
                          .lienConditions.uri
                      }
                    >
                      {dataHamburger.conditions}
                    </Link>
                  </div>
                  <div className="navbar-responsive__open-legal__credits">
                    <small>
                      {dataHamburger.textes}
                    </small>
                  </div>
                </div>
              </div>
            ) : null}
            {visibleSearch === true ? (
              <div className="navbar-responsive__open search">
                <div className="navbar-responsive__open-head">
                  <Link to={`${path}/`}>
                    <img
                      src={
                        logoHamburger
                          .logoFondBlanc.sourceUrl
                      }
                      alt={
                        logoHamburger
                          .logoFondBlanc.altText
                      }
                    />
                  </Link>
                  <div
                    className="navbar-responsive__open-head-icon"
                    onClick={() =>
                      setVisibleSearch(false)
                    }
                    onKeyDown={() =>
                      setVisibleSearch(false)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <X />
                  </div>
                </div>
                <div>
                  <SearchElement />
                </div>
              </div>
            ) : null}
            <div className="right_side">
              <div
                className="navbar-responsive__icon search"
                onClick={() =>
                  setVisibleSearch(true)
                }
                onKeyDown={() =>
                  setVisibleSearch(true)
                }
              >
                <Search />
              </div>
              <div
                className="navbar-responsive__icon"
                onClick={() => setOpenMenu(true)}
                onKeyDown={() =>
                  setOpenMenu(true)
                }
                role="button"
                tabIndex={0}
              >
                <Menu />
              </div>
            </div>
          </nav>
        </>
      ) : null}
    </>
  );
};

export default Navbar;

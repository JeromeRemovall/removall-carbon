import { graphql, Link } from "gatsby";
import React, {
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";

import "../scss/templates/article.scss";
import Author from "../components/ressources/blocArticle/author";
import Divider from "../components/ressources/blocArticle/divider";
import Titre from "../components/ressources/blocArticle/titre";
import Paragraphe from "../components/ressources/blocArticle/paragraphe";
import Galerie from "../components/ressources/blocArticle/galerie";
import Photos from "../components/ressources/blocArticle/photo";
import Chiffres from "../components/ressources/blocArticle/chiffres";
import Complex from "../components/ressources/blocArticle/complex";
import Icons from "../components/ressources/blocArticle/icons";
import { set } from "d3";

const ArticlesPage = ({ pageContext }) => {
  const [metaLang, setMetaLang] = useState("");
  const [url, setUrl] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [linkActualite, setLinkActualite] =
    useState("");

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setUrl(
          `${process.env.GATSBY_RECRUITMENT_FORM_FR}`
        );
        setMetaLang("fr");
        setLinkActualite("/fr/Actualités");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setUrl(
          `${process.env.GATSBY_RECRUITMENT_FORM_EN}`
        );
        setMetaLang("en");
        setLinkActualite("/en/News");
      }
    }
    setShareLink(window.location.href);
    getLanguage();
  }, [url]);

  // fonction qui prend une chaine de caratère qui est un type de bloc render le bon bloc
  const renderBlock = (type, index, data) => {
    switch (type) {
      case "Titre":
        return (
          <Titre key={index} data={data.titres} />
        );
      case "Paragraphe":
        return (
          <Paragraphe
            key={index}
            data={data.paragraphe}
          />
        );
      case "Galerie":
        return (
          <Galerie
            key={index}
            data={data.galeriePhoto}
          />
        );
      case "Photo":
        return (
          <Photos key={index} data={data.photo} />
        );
      case "Chiffre clés":
        return (
          <Chiffres
            key={index}
            data={data.chiffre}
          />
        );
      case "Icons":
        return (
          <Icons key={index} data={data.icons} />
        );
      case "Complexe":
        return (
          <Complex
            key={index}
            data={data.complexe}
          />
        );
      case "Divider":
        return <Divider key={index} />;
      default:
        return null;
    }
  };
  console.log(pageContext.dataArticle.articles);
  const rendersBlocks = () => {
    const blocks = [];
    for (let i = 1; i < 21; i++) {
      blocks.push(
        renderBlock(
          pageContext.dataArticle.articles[
            `typeBloc${i}`
          ][0],
          i,
          pageContext.dataArticle.articles[
            `bloc${i}`
          ]
        )
      );
    }
    console.log(blocks);
    return blocks;
  };

  const copied = (e) => {
    e.target.classList.add("active");
    navigator.clipboard.writeText(shareLink);
    setTimeout(() => {
      e.target.classList.remove("active");
    }, 800);
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <meta
          property="og:title"
          content={
            pageContext.dataArticle.articles.titre
          }
        />
        <meta
          property="og:url"
          content={shareLink}
        />
        <meta
          property="og:image"
          content={
            pageContext.dataArticle.articles
              .photoMiseEnAvant?.node.sourceUrl
          }
        />
        <meta
          property="og:description"
          content={
            pageContext.dataArticle.articles
              .sousTitre
          }
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content={
            pageContext.dataArticle.articles.titre
          }
        />
        <meta
          name="twitter:description"
          content={
            pageContext.dataArticle.articles
              .sousTitre
          }
        />
        <meta
          name="twitter:image"
          content={
            pageContext.dataArticle.articles
              .photoMiseEnAvant?.node.sourceUrl
          }
        />
        <meta
          name="twitter:url"
          content={shareLink}
        />
        <meta
          property="twitter:domain"
          content="removall-carbon.com"
        />
        <title>
          {pageContext.dataArticle.articles.titre}
        </title>
      </Helmet>
      <main className="article">
        <section className="article-container">
          <div className="heading">
            <div className="content-container">
              <div className="header">
                {pageContext.dataArticle.articles.tags?.nodes.map(
                  (tag, index) => (
                    <Link
                      to={`${linkActualite}?filtre=${tag.name}`}
                      key={index}
                      className="tag-article"
                    >
                      {tag.name}
                    </Link>
                  )
                )}
                <p className="time">
                  {
                    pageContext.dataArticle
                      .articles.duree
                  }{" "}
                  MIN
                </p>
              </div>
              <h1>
                {
                  pageContext.dataArticle.articles
                    .titre
                }
              </h1>
              <p>
                {
                  pageContext.dataArticle.articles
                    .sousTitre
                }
              </p>
            </div>
            <img
              src={
                pageContext.dataArticle.articles
                  .photoMiseEnAvant?.node
                  .sourceUrl
              }
              alt={
                pageContext.dataArticle.articles
                  .photoMiseEnAvant?.node.altText
              }
            />
          </div>
          {rendersBlocks()}
          <Author
            author={
              pageContext.dataArticle.articles
                .auteur
            }
          />
          <div className="share-container">
            <ul>
              <li>
                <a
                  onClick={(e) => copied(e)}
                  rel="noreferrer"
                  id="link"
                ></a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${shareLink}`}
                  target="_blank"
                  rel="noreferrer"
                  id="linkedin"
                ></a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareLink}`}
                  target="_blank"
                  rel="noreferrer"
                  id="twitter"
                ></a>
              </li>
            </ul>
          </div>
          {pageContext.dataArticle.articles
            .articlesSimilaires?.nodes.length >
            0 && (
            <div className="related-articles">
              {metaLang == "fr" ? (
                <h2>Articles similaires</h2>
              ) : (
                <h2>Related articles</h2>
              )}
              <div className="articles-container">
                {pageContext.dataArticle.articles.articlesSimilaires?.nodes.map(
                  (article, index) => {
                    let news = article.articles;
                    console.log(news);
                    if (
                      article.articles
                        .photoMiseEnAvant !== null
                    ) {
                      news = article.articles;
                      news.image =
                        article.articles.photoMiseEnAvant;
                      news.texteActualite =
                        article.articles.sousTitre;
                    }
                    return (
                      <Link
                        to={`/${metaLang}/${article.slug}`}
                        key={index}
                        className="article-card"
                      >
                        <img
                          src={
                            news.image?.node
                              .sourceUrl
                          }
                          alt={
                            news.image?.node
                              .altText
                          }
                        />
                        <div className="content">
                          {news.tags !== null &&
                            news.duree !==
                              null && (
                              <div className="tags">
                                {news.tags &&
                                  news.tags.nodes.map(
                                    (
                                      tag,
                                      index
                                    ) => (
                                      <p
                                        className="tag"
                                        key={
                                          index
                                        }
                                      >
                                        {tag.name}
                                      </p>
                                    )
                                  )}
                                {!news.tags && (
                                  <></>
                                )}
                                {news.duree && (
                                  <p className="time">
                                    {news.duree}{" "}
                                    MIN
                                  </p>
                                )}
                              </div>
                            )}
                          <h3>{news.titre}</h3>
                          <div
                            className="desc"
                            dangerouslySetInnerHTML={{
                              __html:
                                news.texteActualite,
                            }}
                          ></div>
                          <div className="footer">
                            {metaLang && (
                              <p className="date">
                                {new Date(
                                  article.date
                                ).toLocaleDateString(
                                  metaLang,
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            )}
                            {news.auteur && (
                              <p className="author">
                                {metaLang == "fr"
                                  ? "Par"
                                  : "By"}{" "}
                                {news.auteur.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default ArticlesPage;

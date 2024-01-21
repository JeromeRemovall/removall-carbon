import Layout from "../components/layout";
import BlocHeader from "../components/blocHeader";
import { Helmet } from "react-helmet";

import React, {
  useEffect,
  useState,
} from "react";

import "../scss/templates/rse.scss";
import Loader from "../components/loader";
import { Link } from "gatsby";

function Rse({ pageContext }) {
  const { dataRse } = pageContext;
  const dataPage = dataRse.rse;
  const [metaLang, setMetaLang] = useState("");
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
  }, []);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>
          {dataPage.titreOngletDeLaPage}
        </title>
      </Helmet>
      {dataPage ? (
        <main className="rse">
          <BlocHeader
            title={dataPage.titrePage}
            img={
              dataPage.imageHeaderPage
                .mediaItemUrl
            }
            alt={dataPage.imageHeaderPage.altText}
          />
          <section id="bloc_1">
            <h2 id="our-values">
              {dataPage.titreBloc1}
            </h2>
            <div className="bloc_content">
              <div className="item" id="value_1">
                <img
                  src={
                    dataPage.premierElement.icon
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.premierElement.icon
                      .altText
                  }
                />
                <div>
                  <h3>
                    {
                      dataPage.premierElement
                        .titre
                    }
                  </h3>
                  <p>
                    {
                      dataPage.premierElement
                        .description
                    }
                  </p>
                </div>
              </div>
              <div className="item" id="value_2">
                <img
                  src={
                    dataPage.secondElement.icon
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.secondElement.icon
                      .altText
                  }
                />
                <div>
                  <h3>
                    {dataPage.secondElement.titre}
                  </h3>
                  <p>
                    {
                      dataPage.secondElement
                        .description
                    }
                  </p>
                </div>
              </div>
              <div className="item" id="value_3">
                <img
                  src={
                    dataPage.troisiemeElement.icon
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.troisiemeElement.icon
                      .altText
                  }
                />
                <div>
                  <h3>
                    {
                      dataPage.troisiemeElement
                        .titre
                    }
                  </h3>
                  <p>
                    {
                      dataPage.troisiemeElement
                        .description
                    }
                  </p>
                </div>
              </div>
              <div className="item" id="value_4">
                <img
                  src={
                    dataPage.quatriemeElement.icon
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.quatriemeElement.icon
                      .altText
                  }
                />
                <div>
                  <h3>
                    {
                      dataPage.quatriemeElement
                        .titre
                    }
                  </h3>
                  <p>
                    {
                      dataPage.quatriemeElement
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="bloc_2">
            <h2 id="our-commitments">
              {dataPage.titreBloc2}
            </h2>
            <div className="bloc_content">
              <div
                className="item"
                id="commitments_1"
              >
                <img
                  src={
                    dataPage.bloc1.image
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.bloc1.image.altText
                  }
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataPage.bloc1.texte,
                  }}
                ></div>
              </div>
              <div
                className="item"
                id="commitments_2"
              >
                <img
                  src={
                    dataPage.bloc2.image
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.bloc2.image.altText
                  }
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataPage.bloc2.texte,
                  }}
                ></div>
              </div>
              <div
                className="item"
                id="commitments_3"
              >
                <img
                  src={
                    dataPage.bloc3.image
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.bloc3.image.altText
                  }
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataPage.bloc3.texte,
                  }}
                ></div>
              </div>
              <div
                className="item"
                id="commitments_4"
              >
                <img
                  src={
                    dataPage.bloc4.image
                      .mediaItemUrl
                  }
                  alt={
                    dataPage.bloc4.image.altText
                  }
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataPage.bloc4.texte,
                  }}
                ></div>
              </div>
            </div>
          </section>
          <section id="back">
            <Link
              className="btn-primary"
              to={`/${metaLang}/${
                metaLang == "fr"
                  ? "a-propos"
                  : "about"
              }`}
            >
              {metaLang == "fr"
                ? "Retour"
                : "Back"}
            </Link>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Rse;

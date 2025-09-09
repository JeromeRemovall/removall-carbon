import React, {
  useState,
  useEffect,
} from "react";
import BlocHeader from "../components/blocHeader";
import Layout from "../components/layout";
import "../scss/templates/conditionsOfUse.scss";

import Loader from "../components/loader";
import { Helmet } from "react-helmet";

function ConditionsOfUse({ pageContext }) {
  const { dataConditionsOfUse } = pageContext;
  const dataC =
    dataConditionsOfUse.conditionsMentions;

  const [metaLang, setMetaLang] = useState("");

  useEffect(() => {
    function navBarTypeLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/") ||
        window.localStorage.getItem(
          "preferredLanguage"
        ) === "fr"
      ) {
        setMetaLang("fr");
      }
      if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/") ||
        window.localStorage.getItem(
          "preferredLanguage"
        ) === "en"
      ) {
        setMetaLang("en");
      }
    }
    navBarTypeLanguage();
  }, []);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title>{dataC.titreOngletDeLaPage}</title>
      </Helmet>
      {dataC ? (
        <main className="conditions-of-use">
          <BlocHeader
            title={dataC.titre}
            img={dataC.imageDeFond.node.sourceUrl}
            alt={dataC.imageDeFond.node.altText}
          />
          <section className="block-1">
            <div
              dangerouslySetInnerHTML={{
                __html: dataC.texte,
              }}
            ></div>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default ConditionsOfUse;

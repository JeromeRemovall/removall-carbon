import Layout from "../components/layout";
import React, {
  useState,
  useEffect,
} from "react";

import BlocHeader from "../components/blocHeader2";
import "../scss/templates/offers.scss";

import { Helmet } from "react-helmet";
import { Paperclip } from "react-feather";

import Loader from "../components/loader";

function Offers({ pageContext }) {
  const { dataOffers } = pageContext;
  const dataO = dataOffers.offres;

  const [metaLang, setMetaLang] = useState("");

  //Form
  const dataForm =
    dataOffers.contactPageRecrutement;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const [messageEmail, setMessageEmail] =
    useState("");
  const [messageSurname, setMessageSurname] =
    useState("");
  const [messageFirstname, setMessageFirstname] =
    useState("");
  const [messageLinkedin, setMessageLinkedin] =
    useState("");
  const [messageTel, setMessageTel] =
    useState("");
  const [messageCV, setMessageCV] = useState("");
  const [messageLetter, setMessageLetter] =
    useState("");

  const [nameFileCV, setNameFileCV] =
    useState("");
  const [nameFileLetter, setNameFileLetter] =
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
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setUrl(
          `${process.env.GATSBY_RECRUITMENT_FORM_EN}`
        );
        setMetaLang("en");
      }
    }
    getLanguage();
  }, [url]);

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
        console.log(response);
        setMessageEmail("");
        setMessageLetter("");
        setMessageSurname("");
        setMessageFirstname("");
        setMessageLinkedin("");
        setMessageCV("");
        setMessageTel("");
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
                .error_id === "-ve-linkedin"
            ) {
              setMessageLinkedin(
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
                .error_id === "-ve-tel"
            ) {
              setMessageTel(
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
                .error_id === "-ve-file-cv"
            ) {
              setMessageCV(
                response.invalid_fields[i].message
              );
            }

            if (
              response.invalid_fields[i]
                .error_id === "-ve-file-letter"
            ) {
              setMessageLetter(
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

  function getFileNameCV(value) {
    let a = value.split("fakepath\\");
    setNameFileCV(a[1]);
  }

  function getFileNameLetter(value) {
    let a = value.split("fakepath\\");
    setNameFileLetter(a[1]);
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={metaLang} />
        <title></title>
      </Helmet>
      <BlocHeader
        title={dataO.titre}
        subtitle={dataO.sousTitre}
        label={dataO.bouton}
        labelMobile={dataO.boutonMobile}
        to="form"
      />
      {dataForm && dataO ? (
        <main className="offers">
          <section className="offers__content">
            <div
              dangerouslySetInnerHTML={{
                __html: dataO.texte,
              }}
            ></div>
          </section>
          <section
            className="offers__content-form"
            id="form"
          >
            <h2>{dataForm.titreFormulaire}</h2>
            <form
              className="form "
              method="post"
              action={url}
              onSubmit={formSubmissionHandler}
            >
              <div className="group-input hide">
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={dataO.sousTitre}
                />
              </div>
              <div className="group-input hide">
                <input
                  type="text"
                  id="_wpcf7_unit_tag"
                  name="_wpcf7_unit_tag"
                  value="6124bb2"
                />
              </div>

              <div className="group-input">
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder={dataForm.nom}
                />
                <p className="form-message__error">
                  {messageSurname}
                </p>
              </div>
              <div className="group-input">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder={dataForm.prenom}
                />
                <p className="form-message__error">
                  {messageFirstname}
                </p>
              </div>
              <div className="group-input">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={
                    dataForm.adresseEmail
                  }
                />
                <p className="form-message__error">
                  {messageEmail}
                </p>
              </div>
              <div className="group-input">
                <input
                  type="text"
                  id="tel"
                  name="tel"
                  placeholder={dataForm.telephone}
                />
                <p className="form-message__error">
                  {messageTel}
                </p>
              </div>
              <div className="group-input">
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  placeholder={dataForm.linkedin}
                />
                <p className="form-message__error">
                  {messageLinkedin}
                </p>
              </div>
              <div className="group-input">
                {/* <label for="file-cv">{dataForm.ajouterUnCv}{nameFileCV}</label> */}
                <label for="file-cv">
                  {nameFileCV
                    ? nameFileCV
                    : dataForm.ajouterUnCv}
                </label>
                <Paperclip />
                <input
                  type="file"
                  id="file-cv"
                  name="file-cv"
                  accept=".pdf"
                  onChange={(e) =>
                    getFileNameCV(e.target.value)
                  }
                />
                <p className="form-message__error">
                  {messageCV}
                </p>
              </div>
              <div className="group-input">
                {/* <label for="file-letter">{dataForm.ajouterUneLettreDeMotivation}</label> */}
                <label for="file-letter">
                  {nameFileLetter
                    ? nameFileLetter
                    : dataForm.ajouterUneLettreDeMotivation}
                </label>
                <Paperclip />
                <input
                  type="file"
                  id="file-letter"
                  name="file-letter"
                  accept=".pdf"
                  onChange={(e) =>
                    getFileNameLetter(
                      e.target.value
                    )
                  }
                />
                <p className="form-message__error">
                  {messageLetter}
                </p>
              </div>
              <div className="group-button">
                <button
                  type="submit"
                  className="button"
                >
                  <hr />
                  {dataForm.boutonEnvoyer}
                </button>
                <button
                  type="submit"
                  className="button-mobile"
                >
                  <hr />
                  {dataForm.boutonMobileEnvoyer}
                </button>
                <p className="form-message__validate">
                  {message}
                </p>
                <p className="form-message__error">
                  {error}
                </p>
              </div>
            </form>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Offers;

import React from "react";
import "../scss/components/newsletter.scss";

function Newsletter({
  lang,
  title,
  text,
  textChampsDeSaisie,
  textChampsDeSaisieMobile,
  textBouton,
  imageLogo,
  altLogo,
  textConditions,
  image,
  alt,
  styleContainer,
  newsletterStyle,
  action,
  onSubmit,
  message,
  phraseRgpd,
  messageCheckbox,
  messageEmail,
  error,
}) {
  return (
    <div className="newsletter">
      <div
        className={`newsletter-container ${styleContainer}`}
      >
        <div
          className={`newsletter-container__block ${newsletterStyle}`}
        >
          <div className="newsletter-content">
            <h2>{title}</h2>
            <p>{text}</p>
            <a
              className="btn-submit"
              target="_blank"
              href={`https://share-eu1.hsforms.com/${
                lang == "fr"
                  ? "268Pb-JUURhOnFOtSp09tIwfdgdo"
                  : "2M_Tm3aUkR5CZPOLNwOqzuAfdgdo"
              }`}
            >
              {window.matchMedia(
                "(max-width: 834px)"
              ).matches ? (
                <img
                  src={imageLogo}
                  alt={altLogo}
                />
              ) : (
                <> {textBouton} </>
              )}
            </a>
          </div>
          <div className="newsletter-image">
            <img src={image} alt={alt} />
          </div>
        </div>
      </div>
      <div className="newsletter-background"></div>
    </div>
  );
}

export default Newsletter;

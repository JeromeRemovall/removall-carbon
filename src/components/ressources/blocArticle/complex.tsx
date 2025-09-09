import React from "react";

import "../../../scss/components/ressources/blocArticle/bloc.scss";

interface Props {
  data: any;
}

const Complex: React.FC<Props> = ({ data }) => {
  return (
    <div className="complexe-container">
      <div
        className="title"
        dangerouslySetInnerHTML={{
          __html: data.titre,
        }}
      ></div>
      <div className="complexe">
        <div className="content">
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: data.texte,
            }}
          ></div>
          <a className="cta" href={data.lienCta}>
            {data.texteCta}
          </a>
        </div>
        {data.photo && (
          <div className="illustration">
            <img
              src={data.photo?.node.sourceUrl}
              alt={data.photo?.node.altText}
            />
            <p className="legende">
              {data.legende}
            </p>
          </div>
        )}
        {data.lienCta && (
          <a
            className="cta mobile"
            href={data.lienCta}
          >
            {data.texteCta}
          </a>
        )}
      </div>
    </div>
  );
};

export default Complex;

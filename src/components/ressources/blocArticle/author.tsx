import React from "react";

import "../../../scss/components/ressources/blocArticle/bloc.scss";

interface AuthorProps {
  author: {
    name: string;
    Auteur: any;
  };
  lang: string;
}

const Author: React.FC<AuthorProps> = ({
  author,
  lang,
}) => {
  console.log(author);
  return (
    <div className="signature-container">
      {lang == "fr" ? (
        <p>Article écrit par : </p>
      ) : (
        <p>Article written by : </p>
      )}
      <div className="signature">
        <img
          src={
            author?.nodes[0].auteur.photo?.node
              .sourceUrl
          }
          alt={
            author?.nodes[0].auteur.photo?.node
              .altText
          }
          className="avatar"
        />
        <div className="content-container">
          <p className="name">{author?.name}</p>
          <p className="fonction">
            {author?.nodes[0].auteur.fonction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Author;

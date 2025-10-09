import React from "react";

import "../../scss/components/ressources/card.scss";
import { Link } from "gatsby";

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  files?: {
    mediaItemUrl: string;
    title: string;
  };
  linkText?: string;
  image: { sourceUrl: string; altText: string };
  time?: string;
  lang: string;
  type: string;
  date: any;
  auteur: any;
  slug: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  tags,
  files,
  linkText,
  image,
  time,
  type,
  date,
  auteur,
  slug,
  lang,
}) => {
  return (
    <>
      {slug ? (
        <Link to={`/${lang}/${slug}`}>
          <div className="card">
            <div className="image-container">
              <img
                src={image?.node.sourceUrl}
                alt={image?.node.altText}
              />
            </div>
            <div className="content-container">
              {type == "ressource" && (
                <p className="date">
                  {new Date(
                    date
                  ).toLocaleDateString(lang, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
              {tags && time && (
                <div className="tags">
                  {tags && (
                    <div>
                      {tags.nodes.map(
                        (tag, index) => (
                          <p
                            className="tag"
                            key={index}
                          >
                            {tag.name}
                          </p>
                        )
                      )}
                    </div>
                  )}
                  {!tags && <></>}
                  {time && (
                    <p className="time">
                      {time} MIN
                    </p>
                  )}
                </div>
              )}
              {title && (
                <p className="title">{title}</p>
              )}
              {description && (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                ></div>
              )}
              {linkText && (
                <a
                  className="link"
                  href={files?.node.mediaItemUrl}
                  target="_blank"
                  download={files?.title}
                >
                  {linkText}
                </a>
              )}
              {/* <div className='footer'>
								{auteur && (
									<p className='author'>{lang == "fr" ? 'Par' : "By"} {auteur.name}</p>
								)}
							</div> */}
            </div>
          </div>
        </Link>
      ) : (
        <a
          className="link"
          href={files?.mediaItemUrl}
          target="_blank"
          download={files?.title}
        >
          <div className="card">
            <div className="image-container">
              <img
                src={image?.node.sourceUrl}
                alt={image?.node.altText}
              />
            </div>
            <div className="content-container">
              {type == "ressource" && (
                <p className="date">
                  {new Date(
                    date
                  ).toLocaleDateString(lang, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
              {tags && time && (
                <div className="tags">
                  {tags &&
                    tags.map((tag, index) => (
                      <p
                        className="tag"
                        key={index}
                      >
                        {tag.name}
                      </p>
                    ))}
                  {!tags && <></>}
                  {time && (
                    <p className="time">
                      {time} MIN
                    </p>
                  )}
                </div>
              )}
              <p className="title">{title}</p>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
              {linkText &&
                type == "ressource" && (
                  <a
                    className="link"
                    href={files?.mediaItemUrl}
                    target="_blank"
                    download={files?.title}
                  >
                    {linkText}
                  </a>
                )}
              {/* <div className='footer'>
								{auteur && (
									<p className='author'>{lang == "fr" ? 'Par' : "By"} {auteur.name}</p>
								)}
							</div> */}
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default Card;

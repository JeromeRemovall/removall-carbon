import React from "react";

import "../../../scss/components/ressources/blocArticle/bloc.scss";

interface Props {
  data: any;
}

const Photos: React.FC<Props> = ({ data }) => {
  const renderImage = (
    image: any,
    index: number
  ) => {
    return (
      <>
        {data[`photo${index}`] && (
          <div
            className={`image ${
              image.photoFullSize ? "full" : ""
            }`}
          >
            <img
              src={
                image[`photo${index}`]?.sourceUrl
              }
              alt={
                image[`photo${index}`]?.altText
              }
            />
            <p className="legende">
              {image[`legendePhoto${index}`]}
            </p>
          </div>
        )}
      </>
    );
  };

  const renderImages = () => {
    const index = data.isTwo ? 3 : 2;

    const blocks = [];
    for (let i = 1; i < index; i++) {
      blocks.push(renderImage(data, i));
    }
    return blocks;
  };

  return (
    <div
      className={`photos-container ${
        data.isTwo ? "" : "center"
      }`}
    >
      {renderImages()}
    </div>
  );
};

export default Photos;

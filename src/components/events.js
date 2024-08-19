import React from "react";

import "../scss/components/events.scss";

function Events({
  img,
  day,
  month,
  text,
  hours,
  adress,
  alt,
  isSpeaker = false,
  enLigne,
  lien,
  lang,
}) {
  console.log(lien)
  return (
    <a href={lien} className="events">
      <div className="events-content">
        <div className="events-content__date">
          <p>{day}</p>
          <p>{month}</p>
        </div>
        <div className="events-content__infos">
          {hours && (<p>{hours}</p>)}
          <div>
            <div className="place-container">
              <div className={`picto ${enLigne ? 'webinar' : 'place'}`}></div>
              <p>{adress}</p>
            </div>
            <div className="speaker_container">
              {isSpeaker ? (
                <p className="speaker_item">
                  Removall
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="events-content__image">
        <img src={img} alt={alt} />
      </div>
      <div
        className="events-content__text"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </a>
  );
}

export default Events;

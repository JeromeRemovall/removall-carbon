import React   from "react"

import "../scss/components/events.scss";

function Events({ img, day, month, text, hours, adress, alt }){
	return(
		<div className="events">
			<div className="events-content">
				<div className="events-content__date">
					<p>{day}</p>
					<p>{month}</p>
				</div>
				<div className="events-content__infos">
					<p>{hours}</p>
					<p>{adress}</p>
				</div>
			</div>
			<div className="events-content__image">
				<img src={img} alt={alt} />
			</div>
			<div className="events-content__text" dangerouslySetInnerHTML={ { __html: text } }></div>
		</div>
	)
} 

export default Events;

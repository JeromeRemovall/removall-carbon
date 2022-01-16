import React from "react"
import "../scss/components/card.scss"

import ButtonAction from "../components/buttonAction";

function Card({title, text, img, button, buttonVisible, onClick, alt, buttonMobile}){
	return(
		<div className="card">
			<div className="card-image">
				<img src={img} alt={alt} />
			</div>
			<div className="card-list__content">
				<h3>{title}</h3>
				<div dangerouslySetInnerHTML={ { __html: text} }></div>
				{buttonVisible === true ? <ButtonAction onClick={onClick} label={button} labelMobile={buttonMobile} /> : null} 
			</div>
		</div>
	)
}

export default Card;
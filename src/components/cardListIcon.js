import React from "react"
import "../scss/components/cardListIcon.scss"

function CardListIcon({ title, text, icon, alt }){
	return(
		<div className="card-list-icon">
			<div className="card-list-icon__image">
				<img src={icon} alt={alt}/>
			</div>
			<div className="card-list-icon__content">
				<h3>{title}</h3>
				<div dangerouslySetInnerHTML={{ __html: text}}></div>
			</div>
		</div>
	)
}

export default CardListIcon;
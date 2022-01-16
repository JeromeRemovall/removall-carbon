import React from "react"
import "../scss/components/cardListFull.scss"

function CardListFull({title, text, img, alt}){
	return(
		<div className="card-list-full">
			<div className="card-list-full__content">
				<h3>{title}</h3>
				<div dangerouslySetInnerHTML={ { __html: text} }></div>
			</div>
			<div className="card-list-full__image">
				<img src={img} alt={alt}/>
			</div>
		</div>
	)
}

export default CardListFull;
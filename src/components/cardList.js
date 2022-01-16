import React from "react"
import "../scss/components/cardList.scss"

function CardList({title, text, img, alt}){
	return(
		<div className="card-list">
			<div className="card-list__image">
				<img src={img} alt={alt} />
			</div>
			<div className="card-list__content">
				<h3>{title}</h3>
				<div dangerouslySetInnerHTML={ { __html: text} }></div>
			</div>
		</div>
	)
}

export default CardList;
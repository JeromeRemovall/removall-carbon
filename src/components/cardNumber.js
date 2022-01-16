import React from "react"
import "../scss/components/CardNumber.scss"

function CardNumber({ number, text}){
	return(
		<div className="card-number">
			<span>{number}</span>
			<h3>{text}</h3>
		</div>
	)
}

export default CardNumber
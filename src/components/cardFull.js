import React from "react"
import "../scss/components/cardFull.scss"
import Legend from "../components/legend"
import Button from "../components/buttonExt"

function CardFull({title, text, img, legend, legendVisible, alt, href, label, labelMobile}){
	return(
		<div className="card-full">
			<div className="card-full__image">
				<img src={img} alt={alt}/>
			</div>
			<div className="card-full__content">
				{legendVisible === true ? <Legend text={legend}/> :null}
				<h3>{title}</h3>
				<div dangerouslySetInnerHTML={ { __html: text} }></div>
			</div>
			{href ? <Button href={href} label={label} labelMobile={labelMobile} /> :null}
		</div>
	)
}

export default CardFull;


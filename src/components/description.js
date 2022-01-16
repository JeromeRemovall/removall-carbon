import React from 'react'
import "../scss/components/description.scss"
import ButtonLink from "../components/buttonLink"

function Description({ title, text, button, buttonVisible, to, buttonMobile}){
	return(
		<div className="bloc-description">
			<h2>{title}</h2>
			<div className="bloc-description__content">
				<div dangerouslySetInnerHTML={ { __html: text } }></div>
				{buttonVisible === true ? <ButtonLink label={button} to={to} labelMobile={buttonMobile} /> : null }
			</div>
		</div>
	)
}

export default Description;
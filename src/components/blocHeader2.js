import React from "react"
import "../scss/components/blocHeader.scss"

import ButtonAnchor from "../components/buttonAnchor"
import "../scss/components/blocHeader2.scss"

function blocHeader2({ title, label, subtitle, labelMobile, to }){

	// let anchor = document.querySelector("main.offers .button-primary");
	// anchor.scrollIntoView();

	return(
		<header className="bloc-header__bis">
			<div className="bloc-header__container">
				<div className="bloc-header__title">
					<h2>{title}</h2>
					<p>{subtitle}</p>
				</div>
				<div className="bloc-header_container_button">
					<ButtonAnchor label={label} labelMobile={labelMobile} to={to} />
				</div>
			</div>
		</header>
	)
}

export default blocHeader2;
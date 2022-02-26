import React from "react"
import "../scss/components/blocHeader.scss"

import ButtonLink from "../components/buttonLink"
import "../scss/components/blocHeader2.scss"

function blocHeader2({ title, label, subtitle, labelMobile, to }){
	return(
		<header className="bloc-header__bis">
			<div className="bloc-header__container">
				<div className="bloc-header__title">
					<h2>{title}</h2>
					<p>{subtitle}</p>
				</div>
				<div className="bloc-header_container_button">
					<ButtonLink label={label} labelMobile={labelMobile} to={to} />
				</div>
			</div>
		</header>
	)
}

export default blocHeader2;
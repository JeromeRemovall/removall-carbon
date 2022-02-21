import React from "react"
import "../scss/components/blocHeader.scss"

import Button from "../components/buttonAction"
import "../scss/components/blocHeader2.scss"

function blocHeader2({ title, label, subtitle }){
	return(
		<header className="bloc-header--bis">
		<div className="bloc-header_title">
			<h2>{title}</h2>
			<p>{subtitle}</p>
		</div>
		<div className="bloc-header_button">
			<Button label={label} />
		</div>
		</header>
	)
}

export default blocHeader2;
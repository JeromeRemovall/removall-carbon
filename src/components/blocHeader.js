import React from "react"
import "../scss/components/blocHeader.scss"

function blocHeader({ title, text, img, alt }){
	return(
		<header className="bloc-header">
			<div className="header-overlay"></div>
			<img src={img} alt={alt} />
			<div className="header">
				<div className="header-content">
					<h1>{title}</h1>
					<div dangerouslySetInnerHTML={{ __html: text}}></div>
				</div>
			</div>
		</header>
	)
}

export default blocHeader;
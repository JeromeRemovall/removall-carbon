import React from "react"

import "../scss/components/tag.scss"

function minCard({label}){

	return(
		<div className="tag"> 
			<p>{label}</p>
		</div>
	)
}

export default minCard;
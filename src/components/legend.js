import React from "react"
import "../scss/components/legend.scss" 

function Legend({text}) {
	return(
		<p className="legend">{text}</p>
	)
}

export default Legend;
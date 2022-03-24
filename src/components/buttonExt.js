import React from "react"
import "../scss/components/button.scss"

function ButtonExt({label, href, labelMobile}) {
	return(
		<>
			<a className="button-primary" href={href} target="_blank" rel="noreferrer">
				<hr />
				{label}
			</a>
			<a className="button-primary mobile" href={href} target="_blank" rel="noreferrer">
				<hr />
				{labelMobile}
			</a>
		</>
	)
}

export default ButtonExt;
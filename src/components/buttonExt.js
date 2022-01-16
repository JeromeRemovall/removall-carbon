import React from "react"
import "../scss/components/button.scss"

function ButtonExt({label, href, labelMobile}) {
	return(
		<>
			<a className="button-primary" href={href}>
				<hr />
				{label}
			</a>
			<a className="button-primary mobile" href={href}>
				<hr />
				{labelMobile}
			</a>
		</>
	)
}

export default ButtonExt;
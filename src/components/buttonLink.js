import React from "react"
import "../scss/components/button.scss"
import { Link } from "gatsby"

function ButtonLink({label, to, labelMobile}) {
	return(
		<>
			<Link className="button-primary" to={to}>
				<hr />
				{label}
			</Link>
			<Link className="button-primary mobile" to={to}>
				<hr />
				{labelMobile}
			</Link>
		</>
	)
}

export default ButtonLink;
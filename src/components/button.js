import React from "react"
import "../scss/components/button.scss"
import { Link } from "gatsby"

function Button({label, onClick, to}) {
	return(
		<Link className="button-primary" to={to} onClick={onClick}>
			<hr />
			{label}
		</Link>
	)
}

export default Button;
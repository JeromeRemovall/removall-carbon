import React from "react"
import "../scss/components/button.scss"

function ButtonAction({label, onClick, labelMobile}) {
	return(
		<>
			<button className="button-primary" onClick={onClick}>
				<hr />
				{label}
			</button>
			<button className="button-primary mobile" onClick={onClick}>
				<hr />
				{labelMobile}
			</button>
		</>
	)
}

export default ButtonAction;
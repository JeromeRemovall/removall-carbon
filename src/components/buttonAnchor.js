import React from "react"
import "../scss/components/button.scss"
// import { Link } from "gatsby"

import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

function ButtonAnchor({label, to, labelMobile}) {
	return(
		<>
			<Link className="button-primary" to={to} spy={true} smooth={true} offset={50} duration={500}>
				<hr />
				{label}
			</Link>
			<Link className="button-primary mobile" to={to} spy={true} smooth={true} offset={50} duration={500}>
				<hr />
				{labelMobile}
			</Link>
		</>
	)
}

export default ButtonAnchor;
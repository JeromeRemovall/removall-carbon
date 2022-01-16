import React from "react"
import "../scss/components/navbar-small.scss"

import { Link } from 'react-scroll'

function NavbarSmall({item1, item2, item3, item4, onClick}){

	return(
		<nav className="navbar-small">
			<ul>
				<Link activeClass="active" to="first" spy={true} smooth={false} duration={1000} containerId="containerElement" onClick={onClick}>{item1}</Link>
				<Link activeClass="active" to="second" spy={true} smooth={false} duration={1000} containerId="containerElement" onClick={onClick}>{item2}</Link>
				<Link activeClass="active" to="third" spy={true} smooth={false} duration={1000} containerId="containerElement" onClick={onClick}>{item3}</Link>
				<Link activeClass="active" to="fourth" spy={true} smooth={false} duration={1000} containerId="containerElement" onClick={onClick}>{item4}</Link>
			</ul>
		</nav>
	)
}

export default NavbarSmall;
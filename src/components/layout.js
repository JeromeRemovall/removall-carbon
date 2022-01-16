import React from "react"
import NavBar from "../components/navbar"
import Footer  from "../components/footer"

// import { Helmet } from "react-helmet"

function Layout({ children }) {

  	return (
		<>
		<NavBar />
		{/* <Helmet>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		</Helmet> */}
		{children}
		<Footer />
		</>
  	)
}

export default Layout;
import React from "react"
import "../scss/components/loader.scss"
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
	query{
		menuFr : allWpMenu(filter: {name: {eq: "menu fr"}}) {
			nodes {
				logo {
					logoTransparent {
					  sourceUrl
					  altText
					}
				}
			}
		}
	}
`;

function Loader(){

	const data = useStaticQuery(query);

	return(
		<main className="loader">
			<img src={data.menuFr.nodes[0].logo.logoTransparent.sourceUrl} alt="logo"/>
		</main>
	)
}

export default Loader;
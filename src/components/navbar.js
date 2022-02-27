import React, {useEffect, useState} from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby";
// import {ArrowUpRight} from "react-feather";
import {Menu} from "react-feather"; 
import {X} from "react-feather"; 

import "../scss/components/navbar.scss";

const query = graphql`
	query {
		translateFr : allWpPage(filter: {language: {slug: {eq: "fr"}}}){
			nodes {
				slug
				translations {
				  slug
				}
			}
		}
		translateEn: allWpPage(filter: {language: {slug: {eq: "en"}}}){
			nodes {
				slug
				translations {
				  slug
				}
			}
		}
		menuFr : allWpMenu(filter: {name: {eq: "menu fr"}}) {
			nodes {
				name
				menuItems {
					nodes {
						label
						path
					}
				}
				logo {
					logoFondBlanc {
					  sourceUrl
					  altText
					}
					logoTransparent {
					  sourceUrl
					  altText
					}
				}
			}
		}

		menuEn : allWpMenu(filter: {name: {eq: "menu en"}}) {
			nodes {
				name
				menuItems {
					nodes {
						label
						path
					}
				}
				logo {
					logoFondBlanc {
					  sourceUrl
					  altText
					}
					logoTransparent {
					  sourceUrl
					  altText
					}
				}
			}
		}


		menuHamburgerFr : allWpMenu (filter : {name: {eq: "menu hamburger fr"}}) {
			nodes{
				menuItems {
					nodes {
						label
						path
					}
				}
				footer{
					titreReseauxSociaux
					texteCredits
					lien1ReseauxSociaux
					lien2ReseauxSociaux
					lien3ReseauxSociaux
					lien4ReseauxSociaux
					lien5ReseauxSociaux
					logo1ReseauxSociaux {
						sourceUrl
						altText
					}
					logo2ReseauxSociaux {
						sourceUrl
						altText
					}
					logo3ReseauxSociaux {
						sourceUrl
						altText
					}
					logo4ReseauxSociaux {
						sourceUrl
						altText
					}
					logo5ReseauxSociaux {
						sourceUrl
						altText
					}
					mentions
        			conditions
					lienConditions {
						... on WpPage {
							uri
						}
					}
					lienMentions {
						... on WpPage {
							uri
						}
					}
				}
				logo {
					logoFondBlanc {
					  sourceUrl
					  altText
					}
					logoTransparent {
					  sourceUrl
					  altText
					}
				}
			}
		}

		menuHamburgerEn : allWpMenu (filter : {name: {eq: "menu hamburger en"}}) {
			nodes{
				menuItems {
					nodes {
						label
						path
					}
				}
				footer{
					titreReseauxSociaux
					texteCredits
					lien1ReseauxSociaux
					lien2ReseauxSociaux
					lien3ReseauxSociaux
					lien4ReseauxSociaux
					lien5ReseauxSociaux
					logo1ReseauxSociaux {
						sourceUrl
						altText
					}
					logo2ReseauxSociaux {
						sourceUrl
						altText
					}
					logo3ReseauxSociaux {
						sourceUrl
						altText
					}
					logo4ReseauxSociaux {
						sourceUrl
						altText
					}
					logo5ReseauxSociaux {
						sourceUrl
						altText
					}
					mentions
        			conditions
					lienConditions {
						... on WpPage {
							uri
						}
					}
					lienMentions {
						... on WpPage {
							uri
						}
					}
				}
				logo {
					logoFondBlanc {
					  sourceUrl
					  altText
					}
					logoTransparent {
					  sourceUrl
					  altText
					}
				}
			}
		}

		languagesMenuItem : allWp {
			nodes {
			  languages {
				slug
			  }
			}
		}
	}
`;

const Navbar = () => {

	const data = useStaticQuery(query);

	const [navStyle, setNavStyle] = useState("navbar");
	const [visibleNav, setVisibleNav] = useState("visible");
	const [logo, setLogo] = useState("");
	const [dataM, setDataM] = useState("");
	const [activeLink, setActiveLink] = useState("");

	//language
	const [path, setPath] = useState("");
	const [language, setLanguage] = useState("");
	const [preferredLanguage, setPreferredLanguage] = useState("fr");
	const [switchLanguage, setSwitchLanguage] = useState("");

	//mobile
	const [openMenu, setOpenMenu] = useState(false);
	const [logoHamburger, setLogoHamburger] = useState("");
	const [dataHamburger, setDataHamburger] = useState("");
	const [itemsHamburger, setItemsHamburger] = useState("");

	useEffect(() => {

		if(openMenu){
			document.querySelector('body').classList.add("stop-scroll");
		}else{
			document.querySelector('body').classList.remove("stop-scroll");
		}

		function navBarTypeLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/") || window.localStorage.getItem("preferredLanguage") === "fr"){
				setLanguage("fr");
				setPath("/fr");
				setLogo(data.menuFr.nodes[0].logo);
				setDataM(data.menuFr.nodes[0].menuItems.nodes);
	
				setLogoHamburger(data.menuHamburgerFr.nodes[0].logo)
				setDataHamburger(data.menuHamburgerFr.nodes[0].footer);
				setItemsHamburger(data.menuHamburgerFr.nodes[0].menuItems.nodes)	
			}
			
			if(window.location.href.match("/en$") || window.location.href.match("/en/") ||  window.localStorage.getItem("preferredLanguage") === "en"){
				setLanguage("en");
				setPath("/en");
				setLogo(data.menuEn.nodes[0].logo);
				setDataM(data.menuEn.nodes[0].menuItems.nodes);
	
				setLogoHamburger(data.menuHamburgerEn.nodes[0].logo);
				setDataHamburger(data.menuHamburgerEn.nodes[0].footer);
				setItemsHamburger(data.menuHamburgerEn.nodes[0].menuItems.nodes);
			}
		}
		navBarTypeLanguage()

		function navBarTypeStyle(){
			if(window.location.href.match("contact") || window.location.href.match("/en$") || window.location.href.match("/en/$") || window.location.href.match("/fr$") || window.location.href.match("/fr/$")) {
				setNavStyle("navbar-transparent");
			}
	
			if(window.location.href.match("ressources") || window.location.href.match("resources") || window.location.href.match(/(recrutement|recruitment)\/[a-zA-Z]+/) ){
				setNavStyle("navbar-transparent-blue");
			}
		}
		navBarTypeStyle()

		function scrollDirection(){
			window.onscroll = function(e) {

				if((this.oldScroll > this.scrollY) === false && this.scrollY >= 0 && this.oldScroll >= 0){
					setVisibleNav("invisible")
				}else if((this.oldScroll > this.scrollY) === true ){
					setVisibleNav("visible")
				}
				this.oldScroll = this.scrollY;
	
				if(document.querySelector('.slider-home')){
					const box = document.querySelector('.slider-home');
					const rect = box.getBoundingClientRect();
			
					const isInViewport = rect.top >= -672 && rect.left >= 0
					// console.log("aaaa", rect.top)
					// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					// rect.right <= (window.innerWidth || document.documentElement.clientWidth);
			
					if(isInViewport === true){
						setNavStyle("navbar-transparent");
					}else if(isInViewport === false){
						setNavStyle("");
					}
				}
			}
		}
		scrollDirection()

		function checkPreferredLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setPreferredLanguage("fr");
				window.localStorage.setItem("preferredLanguage", preferredLanguage);
				data.translateFr.nodes.map((item) => {
					return(
						<>
							{window.location.href.match(`${item.slug}`) && item.translations.length > 0 ?
								setSwitchLanguage(`${item.translations[0].slug}/`)	
							: null}
						</>
					)
				})
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setPreferredLanguage("en");
				window.localStorage.setItem("preferredLanguage", preferredLanguage);
				data.translateEn.nodes.map((item) => {
					return(
						<>
							{window.location.href.match(`${item.slug}`) && item.translations.length > 0 ? 
								setSwitchLanguage(`${item.translations[0].slug}/`)
							:null}
						</>
					)
				})
			}else{
				setPreferredLanguage("fr");
			}	
		}
		checkPreferredLanguage()

		function isActive(){
			setActiveLink(window.location.pathname)
			// console.log("activeLink", activeLink)
		}
		isActive()

	}, [preferredLanguage, switchLanguage, dataM, dataHamburger, activeLink, data.menuEn.nodes, data.menuFr.nodes, data.menuHamburgerEn.nodes, data.menuHamburgerFr.nodes, data.translateEn.nodes, data.translateFr.nodes, openMenu])

	return(
		<>
			{dataM && logo && logoHamburger ?
				<>
				<nav className={`navbar ${visibleNav} ${navStyle}`}>
					<div className="navbar-container">
						<Link to={`${path}/`}>
							{navStyle === "navbar-transparent" ? <img src={logo.logoTransparent.sourceUrl} alt={logo.logoTransparent.altText} /> : <img src={logo.logoFondBlanc.sourceUrl} alt={logo.logoFondBlanc.altText}/>}
						</Link>
						<ul>
							{dataM.map(({label, path} ,index) => (
								<>
									{index === dataM.length - 1  ? 
										<li>
											<Link className="tag" key={label} to={path}>
												{label}
												{/* <ArrowUpRight /> */}
											</Link>
										</li>
									:
										<>
										{activeLink === path ?
										<>
											<li>
												<Link className="active" key={label} to={path}>{label}</Link>
											</li>
											</>
										:
											<li>
												<Link key={label} to={path}>{label}</Link>
											</li>
										}
										</>
										
									}
								</>
							))}
							<li> 
								{data.languagesMenuItem.nodes[0].languages.map(({slug}) => (
									<>
										{language === slug ? 
											<Link key={slug} className="language active">{slug}</Link>
										:
											<Link key={slug} className="language" to={`/${slug}/${switchLanguage}`}>{slug}</Link>
										}
									</>
								))}
							</li>
						</ul>
					</div>
				</nav>
				<nav className={`navbar-responsive ${visibleNav} ${navStyle}`}>
					<div className="navbar-responsive__logo">
						<Link to={`${path}/`}>
							{navStyle === "navbar-transparent" ? <img src={logo.logoTransparent.sourceUrl} alt={logo.logoTransparent.altText} /> : <img src={logo.logoFondBlanc.sourceUrl} alt={logo.logoFondBlanc.altText}/>}
						</Link>
					</div>
					{openMenu === true ? 
						<div className="navbar-responsive__open">
							<div className="navbar-responsive__open-head">
								<Link to={`${path}/`}>
									<img src={logoHamburger.logoFondBlanc.sourceUrl} alt={logoHamburger.logoFondBlanc.altText}/>
								</Link>
								<div className="navbar-responsive__open-head-icon" onClick={()=> setOpenMenu(false)} onKeyDown={()=> setOpenMenu(false)} role="button" tabIndex={0}>
									<X />
								</div>
							</div>
							<ul className="choose-language">
								<li> 
									{data.languagesMenuItem.nodes[0].languages.map(({slug}) => (
										<>
											{language === slug ? 
												<Link key={slug} className="language active" to={`/${slug}/${switchLanguage}`}>{slug}</Link>
											:
												<Link key={slug} className="language" to={`/${slug}/${switchLanguage}`}>{slug}</Link>
											}
										</>
									))}
							</li>
							</ul>
							<div className="navbar-responsive__open-items">
								<ul>
									{itemsHamburger.map(({label, path}) => (
										<>
										{activeLink === path ?
											<>
											{console.log(path, activeLink)}
											<li>
												<Link className="active" key={label} to={path}>{label}</Link>
											</li>
											</>
										:
											<li>
												<Link key={label} to={path}>{label}</Link>
											</li>
										}
										</>
									))}
								</ul>
							</div>
							{dataHamburger.lien1ReseauxSociaux !== null || dataHamburger.lien2ReseauxSociaux !== null || dataHamburger.lien3ReseauxSociaux !== null || dataHamburger.lien4ReseauxSociaux !== null || dataHamburger.lien5ReseauxSociaux !== null ?
								<div className="navbar-responsive__open-sociaux">
									<h4>{dataHamburger.titreReseauxSociaux}</h4>
									<div className="navbar-responsive__open-logo">
										{dataHamburger.lien1ReseauxSociaux ?
											<a href={dataHamburger.lien1ReseauxSociaux}>
												<img src={dataHamburger.logo1ReseauxSociaux.sourceUrl}  alt={dataHamburger.logo1ReseauxSociaux.altText} />
											</a>
										:null}
										{dataHamburger.lien2ReseauxSociaux ?
											<a href={dataHamburger.lien2ReseauxSociaux}>
												<img src={dataHamburger.logo2ReseauxSociaux.sourceUrl}  alt={dataHamburger.logo2ReseauxSociaux.altText} />
											</a>
										:null}
										{ dataHamburger.lien3ReseauxSociaux ?
											<a href={dataHamburger.lien3ReseauxSociaux}>
												<img src={dataHamburger.logo3ReseauxSociaux.sourceUrl}  alt={dataHamburger.logo3ReseauxSociaux.altText} />
											</a>
										:null}
										{dataHamburger.lien4ReseauxSociaux ?
											<a href={dataHamburger.lien4ReseauxSociaux}>
												<img src={dataHamburger.logo4ReseauxSociaux.sourceUrl}  alt={dataHamburger.logo4ReseauxSociaux.altText} />
											</a>
										:null}
										{dataHamburger.lien5ReseauxSociaux ?
											<a href={dataHamburger.lien5ReseauxSociaux}>
												<img src={dataHamburger.logo5ReseauxSociaux.sourceUrl}  alt={dataHamburger.logo5ReseauxSociaux.altText} />
											</a>
										:null}
									</div>
								</div>
							:null}
							<div className="navbar-responsive__open-legal">
								<div className="navbar-responsive__open-legal__conditions">
									<Link to={dataHamburger.lienMentions.uri}>{dataHamburger.mentions}</Link>
									<Link to={dataHamburger.lienConditions.uri}>{dataHamburger.conditions}</Link>
								</div>
								<div className="navbar-responsive__open-legal__credits">
									<small>{dataHamburger.textes}</small>
								</div>
							</div>
						</div>
					: null}
					<div className="navbar-responsive__icon" onClick={()=> setOpenMenu(true)} onKeyDown={()=> setOpenMenu(true)} role="button" tabIndex={0}>
						<Menu />
					</div>
				</nav>
				</>
			: null }
		</>
	)
}

export default Navbar;
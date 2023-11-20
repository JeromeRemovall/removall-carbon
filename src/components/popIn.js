import React, {useEffect, useState} from "react"
import { graphql, useStaticQuery } from "gatsby";

import "../scss/components/popIn.scss";

const query = graphql `
	query{
		newsletterFr : allWpMenu (filter: {name: {eq: "footer fr"}}){
			nodes{
				newsletter{
					blocVisiblePageAPropos
					blocVisiblePageAccueil
					blocVisiblePageContact
					blocVisiblePageNosProjets
					blocVisiblePageNosServices
					blocVisiblePageNotreEcosysteme
					blocVisiblePageRessourcesEtPublications
					logoBoutonMobile {
						sourceUrl
						altText
					}
					texteChampsDeSaisieMobile
					texte
					texteBouton
					texteChampsDeSaisie
					texteConditions
					titre
					image {
						sourceUrl
						altText
					}
					phraseRgpd
				}
			}
		}
		newsletterEn : allWpMenu (filter: {name: {eq: "footer en"}}){
			nodes{
				newsletter{
					blocVisiblePageAPropos
					blocVisiblePageAccueil
					blocVisiblePageContact
					blocVisiblePageNosProjets
					blocVisiblePageNosServices
					blocVisiblePageNotreEcosysteme
					blocVisiblePageRessourcesEtPublications
					logoBoutonMobile {
						sourceUrl
						altText
					}
					texteChampsDeSaisieMobile
					texte
					texteBouton
					texteChampsDeSaisie
					texteConditions
					titre
					image {
						sourceUrl
						altText
					}
					phraseRgpd
				}
			}
		}
	}
`


const PopIn = () => {

	const data = useStaticQuery(query);
	const [language, setLanguage] = useState("");

	//newslettter
	const [dataFooterN, setDataFooterN] = useState("");
	const [visibleNewsletter, setVisibleNewsletter] = useState(false);

	//Form
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [messageEmail, setMessageEmail] = useState("");
	const [messageCheckbox, setMessageCheckbox] = useState("")
	const [url, setUrl] = useState("");

	useEffect(() => {

		const newsLettersCookie = Boolean(getCookie("askNewsletter"))
		
		if(!newsLettersCookie) {
			setTimeout(function(){
				document.body.classList.add("stop-scrolling")
				setVisibleNewsletter(!newsLettersCookie)
			}, 10000);
		}

		function navBarTypeLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setLanguage("fr")
				setDataFooterN(data.newsletterFr.nodes[0].newsletter);
				setUrl(`${process.env.GATSBY_NEWSLETTER_FORM_FR}`);
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setLanguage("en")
				setDataFooterN(data.newsletterEn.nodes[0].newsletter);
				setUrl(`${process.env.GATSBY_NEWSLETTER_FORM_EN}`);
			}
		}
		navBarTypeLanguage()
	}, [language, data.newsletterEn.nodes, data.newsletterFr.nodes,  url])

	const closePopIn = () => {
		setVisibleNewsletter(false)
		setCookie("askNewsletter","true",30)
		document.body.classList.remove("stop-scrolling")
	}

	const setCookie = (cname, cvalue, exdays) => {
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	const getCookie = (cname) => {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	  }

	const formSubmissionHandler = (event) => {
		event.preventDefault();
	
		const formElement = event.target,
		{ action, method } = formElement,
		body = new FormData(formElement);

		fetch(action, {
			method,
			body
		})
		.then((response) => response.json())
		.then((response) => {

			setMessageEmail("");
			setMessageCheckbox("");
			setMessage("");
			setError("");

			if(response.status === "validation_failed"){

				for (let i = 0; i < response.invalid_fields.length; i++) { 

					if(response.invalid_fields[i].error_id === "-ve-checkbox"){
						setMessageCheckbox(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-email"){
						setMessageEmail(response.invalid_fields[i].message)
					}
				}

			}else if(response.status === "mail_sent"){
				setMessage(response.message);
			}
		})
		.catch((error) => {
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/")){
				setError("Une erreur est survenue")
			}else if(window.location.href.match("/en$") || window.location.href.match("/en/")){
				setError("An error has occurred")
			}
		});
	};



	return(
		<>
			{visibleNewsletter ?
			<div className="pop_container">
				<div className="newsletter_container">
					<div className="btn_close" onClick={closePopIn}></div>
					<div className="newsletter-content">
						<h2>{dataFooterN.titre}</h2>
						<p>{dataFooterN.texte}</p>
						<form className="newsletter-content__field" action={url} method="post" onSubmit={formSubmissionHandler}>
							<input type="email" name="email" id="email" placeholder={ window.matchMedia("(max-width: 834px)").matches ? dataFooterN.texteChampsDeSaisieMobile : dataFooterN.texteChampsDeSaisie}/>
							<button type="submit">
								{window.matchMedia("(max-width: 834px)").matches ? 	<img src={dataFooterN.logoBoutonMobile.sourceUrl} alt={dataFooterN.logoBoutonMobile.altText} /> : <> {dataFooterN.texteBouton} </>}
							</button>
							<p className="form-message__error">{messageEmail}</p>
							<div className="checkbox">
								<input type="hidden" name="mc4wp-subscribe" value="1" />
								<input type="checkbox" id="checkbox" name="checkbox" />
								<label for="checkbox">{dataFooterN.phraseRgpd}</label>
							</div>
							<p className="form-message__error">{messageCheckbox}</p>
							<p className="form-message__validate">{message}</p>
							<p className="form-message__error">{error}</p>
						</form>
						<div className="newsletter-content__conditions" dangerouslySetInnerHTML={ { __html: dataFooterN.texteConditions} }></div>
					</div>
					<div className="newsletter-image">
						<img src={dataFooterN.image.sourceUrl} alt={dataFooterN.image.altText} />
					</div>
				</div>
			</div>
			: null}
		</>
	)
}

export default PopIn;
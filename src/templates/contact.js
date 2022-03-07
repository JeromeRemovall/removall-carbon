import React, {useState, useEffect} from "react"
import "../scss/templates/contact.scss"

import Layout from "../components/layout"
import Loader from "../components/loader"

import { Helmet } from "react-helmet"

function Contact({ pageContext }){
	const { dataContact } = pageContext;
	const dataC = dataContact.contact;

	//Form
	const dataForm = dataContact.contactFormulaire;
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [url, setUrl] = useState("");

	const [messageEmail, setMessageEmail] = useState("");
	const [messageCheckbox, setMessageCheckbox] = useState("");
	const [messageSurname, setMessageSurname] = useState("");
	const [messageFirstname, setMessageFirstname] = useState("");
	const [messageOrganization, setMessageOrganization] = useState("");
	const [messageTel, setMessageTel] = useState("");
	const [messageMessage, setMessageMessage] = useState("");
	// const [textToCopy, setTextToCopy] = useState("");

	const [metaLang, setMetaLang] = useState("");
	const [metaDescription, setMetaDescription] = useState("");

	useEffect(() => {
		function navBarTypeLanguage(){
			if(window.location.href.match("/fr$") || window.location.href.match("/fr/") || window.localStorage.getItem("preferredLanguage") === "fr"){
				setUrl(`${process.env.GATSBY_CONTACT_FORM_FR}`);
				setMetaLang("fr");
				setMetaDescription("Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone.");
			}
			if(window.location.href.match("/en$") || window.location.href.match("/en/") ||  window.localStorage.getItem("preferredLanguage") === "en"){
				setUrl(`${process.env.GATSBY_CONTACT_FORM_EN}`);
				setMetaLang("en");
				setMetaDescription("Removall is specialized in designing carbon funds and developing carbon sequestration projects.");
			}
		}
		navBarTypeLanguage()
	}, [url])

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
			setMessageSurname("");
			setMessageFirstname("");
			setMessageOrganization("");
			setMessageMessage("");
			setMessageTel("");
			setError("");

			if(response.status === "validation_failed"){

				for (let i = 0; i < response.invalid_fields.length; i++) { 

					if(response.invalid_fields[i].error_id === "-ve-checkbox"){
						setMessageCheckbox(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-email"){
						setMessageEmail(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-tel"){
						setMessageTel(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-message"){
						setMessageMessage(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-surname"){
						setMessageSurname(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-firstname"){
						setMessageFirstname(response.invalid_fields[i].message)
					}

					if(response.invalid_fields[i].error_id === "-ve-organization"){
						setMessageOrganization(response.invalid_fields[i].message)
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

	  
	return (
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<html lang={metaLang} />
				<title>{dataC.titreOngletDeLaPage}</title>
				{/* <meta name="description" content={metaDescription} /> */}
			</Helmet>
			{dataC && dataForm ?
				<main className="contact">
					<div className="image-background">
						<div className="overlay"></div>
						<div className="image-background__image">
							<img src={dataC.imageDeFond.sourceUrl} alt={dataC.imageDeFond.altText}/>
						</div>
					</div>
					<div className="content">
						<h1>{dataC.titre}</h1>
						<p>{dataC.description}</p>
						<div className="content-form">
							<form className="form" method="post" action={url} onSubmit={formSubmissionHandler}>
								<div className="group-input">
									<input type="text" id="surname" name="surname" placeholder={dataForm.nom} />
									<p className="form-message__error">{messageSurname}</p>
								</div>
								<div className="group-input">
									<input type="text" id="firstname" name="firstname" placeholder={dataForm.prenom} />
									<p className="form-message__error">{messageFirstname}</p>
								</div>
								<div className="group-input">
									<input type="text" id="organization" name="organization" placeholder={dataForm.organisation}  />
									<p className="form-message__error">{messageOrganization}</p>
								</div>
								<div className="group-input">
									<input type="tel" id="tel" name="tel" placeholder={dataForm.tel}  />
									<p className="form-message__error">{messageTel}</p>
								</div>
								<input type="email" id="email" name="email" placeholder={dataForm.adresseEmail} />
								<p className="form-message__error">{messageEmail}</p>
								<textarea type="text" id="message" name="message" placeholder={dataForm.message}  />
								<p className="form-message__error">{messageMessage}</p>
								<div className="checkbox">
									<input type="checkbox" id="checkbox" name="checkbox" />
									<label for="checkbox">{dataForm.phraseRgpd}</label>
								</div>
								<p className="form-message__error">{messageCheckbox}</p>
								<button type="submit" className="button">
									<hr />
									{dataForm.bouton}
								</button>
								<button type="submit" className="button-mobile">
									<hr />
									{dataForm.boutonMobile}
								</button>
								<p className="form-message__validate">{message}</p>
								<p className="form-message__error">{error}</p>
							</form>
							<div className="content-information">
								<h2>{dataC.sousTitre}</h2>
								{dataC.adresse !== null ?
								<div className="content-information__item">
									<div className="content-information__item__image">
										<img src={dataC.iconAdresse.sourceUrl} alt={dataC.iconAdresse.altText}/>
									</div>
									<p>{dataC.adresse}</p>
								</div>
								:null}
								{dataC.telephone !== null ?
								<div className="content-information__item">
									<div className="content-information__item__image">
										<img src={dataC.iconTelephone.sourceUrl} alt={dataC.iconTelephone.altText}/>
									</div>
									<p>{dataC.telephone}</p>
								</div>
								:null}
								{dataC.email !== null ?
								<div className="content-information__item">
									<div className="content-information__item__image">
										<img src={dataC.iconEmail.sourceUrl} alt={dataC.iconEmail.altText}/>
									</div>
									<p>{dataC.email}</p>
								</div>
								:null}
								<div className="content-sociaux">
									{dataC.lienTwitter ?
										<a href={dataC.lienTwitter} className="content-sociaux__image" target="_blank">
											<img src={dataC.iconTwitter.sourceUrl} alt={dataC.iconTwitter.altText}/>
										</a>
									:null}
									{dataC.lienFacebook ?
										<a href={dataC.lienFacebook} className="content-sociaux__image" target="_blank">
											<img src={dataC.iconFacebook.sourceUrl} alt={dataC.iconFacebook.altText}/>
										</a>
									:null}
									{dataC.lienInstagram ?
										<a href={dataC.lienInstagram} className="content-sociaux__image" target="_blank">
											<img src={dataC.iconInstagram.sourceUrl} alt={dataC.iconInstagram.altText}/>
										</a>
									:null}
									{dataC.lienLinkedin ?
										<a href={dataC.lienLinkedin} className="content-sociaux__image" target="_blank">
											<img src={dataC.iconLinkedin.sourceUrl} alt={dataC.iconLinkedin.altText} />
										</a>
									:null}
									{dataC.lienYoutube ?
										<a href={dataC.lienYoutube} className="content-sociaux__image" target="_blank">
											<img src={dataC.iconYoutube.sourceUrl} alt={dataC.iconYoutube.altText} />
										</a>
									:null}
								</div>
							</div>
						</div>
					</div>
				</main>
			: <Loader /> }
		</Layout>
	)

}

export default Contact;
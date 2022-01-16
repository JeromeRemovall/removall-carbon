import React from "react"
import "../scss/components/newsletter.scss"

function Newsletter(
	{
		title, 
		text, 
		textChampsDeSaisie, 
		textChampsDeSaisieMobile, 
		textBouton, 
		imageLogo, 
		altLogo, 
		textConditions, 
		image, 
		alt, 
		styleContainer, 
		newsletterStyle, 
		action, 
		onSubmit, 
		message, 
		phraseRgpd,
		messageCheckbox,
		messageEmail,
		error
	}){

	return(
		<div className="newsletter">
			<div className={`newsletter-container ${styleContainer}`}>
				<div className={`newsletter-container__block ${newsletterStyle}`}>
					<div className="newsletter-content">
						<h2>{title}</h2>
						<p>{text}</p>
						<form className="newsletter-content__field" action={action} method="post" onSubmit={onSubmit}>
							<input type="email" name="email" id="email" placeholder={ window.matchMedia("(max-width: 834px)").matches ? textChampsDeSaisieMobile : textChampsDeSaisie}/>
							<button type="submit">
								{window.matchMedia("(max-width: 834px)").matches ? 	<img src={imageLogo} alt={altLogo} /> : <> {textBouton} </>}
							</button>
							<p className="form-message__error">{messageEmail}</p>
							<div className="checkbox">
								<input type="hidden" name="mc4wp-subscribe" value="1" />
								<input type="checkbox" id="checkbox" name="checkbox" />
								<label for="checkbox">{phraseRgpd}</label>
							</div>
							<p className="form-message__error">{messageCheckbox}</p>
							<p className="form-message__validate">{message}</p>
							<p className="form-message__error">{error}</p>
						</form>
						<div className="newsletter-content__conditions" dangerouslySetInnerHTML={ { __html: textConditions} }></div>
					</div>
					<div className="newsletter-image">
						<img src={image} alt={alt} />
					</div>
				</div>
			</div>
			<div className="newsletter-background"></div>
		</div>
	)
}

export default Newsletter;
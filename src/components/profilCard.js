import React from "react"
import "../scss/components/profilCard.scss"

function ProfilCard({ img, firstname, lastname, text, icon1, link1, icon2, link2, alt, altIcon1, altIcon2, onClick}){
	return(
		<div className="profil-card">
			<div className="profil-card__content" onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
				<div className="profil-card__image">
					<img src={img} alt={alt} />
				</div>
				<h3>{firstname} {lastname}</h3>
				<p>{text}</p>
			</div>
			<div className="profil-card__sociaux">
				{link1 !== " " ?
				<a href={link1} target="_blank" rel="noreferrer">
					<div className="profil-card__sociaux__image">
						<img src={icon1} alt={altIcon1} />
					</div>
				</a>
				:null}
				{link2 !== " " ?
				<a href={link2} target="_blank" rel="noreferrer">
					<div className="profil-card__sociaux__image">
						<img src={icon2} alt={altIcon2} />
					</div>
				</a>
				:null}
			</div>
		</div>
	)
}

export default ProfilCard;
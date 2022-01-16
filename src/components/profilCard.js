import React from "react"
import "../scss/components/profilCard.scss"

function ProfilCard({ img, title, text, icon1, link1, icon2, link2, alt, altIcon1, altIcon2}){
	return(
		<div className="profil-card">
			<div className="profil-card__image">
				<img src={img} alt={alt} />
			</div>
			<h3>{title}</h3>
			<p>{text}</p>
			<div className="profil-card__sociaux">
				{link1 !== " " ?
				<a href={link1}>
					<div className="profil-card__sociaux__image">
						<img src={icon1} alt={altIcon1} />
					</div>
				</a>
				:null}
				{link2 !== " " ?
				<a href={link2}>
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
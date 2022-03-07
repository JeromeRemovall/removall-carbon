import React from "react"
import {X} from "react-feather";

import "../scss/components/popInProfil.scss"

function PopInProfil({firstname, lastname, job, icon1, icon2, link1, link2, text, img, alt, atlIcon1, atlIcon2, onClose, onOverlay}) {

	return(
		<div className="pop-in__profil__overlay" onClick={onOverlay}>
			<div className="pop-in__profil">
				<div className="pop-in__profil__close" onClick={onClose}>
					<X />
				</div>
				<div className="pop-in__header">
					<div className="pop-in__photo">
						<img src={img} alt={alt} />
					</div>
					<div className="pop-in__photo__content">
						<h3>{firstname} {lastname}</h3>
						<p>{job}</p>
						<div className="pop-in__photo__link">
							{link1 !== " " ?
								<a href={link1} target="_blank">
									<img src={icon1} alt={atlIcon1} />
								</a>
							:null}
							{link2 !== " " ?
								<a href={link2} target="_blank">
									<img src={icon2} alt={atlIcon2}/>
								</a>
							:null}
						</div>
					</div>
				</div>
				<div className="pop-in__description">
					<div dangerouslySetInnerHTML={{ __html: text}}></div>
				</div>
			</div>
		</div>
	)
}

export default PopInProfil;
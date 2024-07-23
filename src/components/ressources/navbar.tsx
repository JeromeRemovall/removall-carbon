import { Link } from 'gatsby';
import React, { useEffect } from 'react';
import "../../scss/components/ressources/navBar.scss";

const Navbar = (
	props 
) => {
	const { data, lang, active } = props;

	return (
		<div className="navbar-actuality">
			<nav className="">
				<ul>
					<li>
					<Link
						to={`/${lang}/${data?.bloc1Titre}`}
						className={data?.bloc1Titre == active ? 'active' : ''}
					>
						{data?.bloc1Titre}
					</Link>
					</li>
					<li>
						<Link
						to={`/${lang}/${data?.bloc2Titre}`}
						className={data?.bloc2Titre == active ? 'active' : ''}
					>
						{data?.bloc2Titre}
						</Link>
					</li>
					<li>
					<Link
						to={`/${lang}/${data?.bloc3Titre}`}
						className={data?.bloc3Titre == active ? 'active' : ''}
					>
						{data?.bloc3Titre}
					</Link>
					</li>
				</ul>
			</nav>
	  </div>
	);
};

export default Navbar;
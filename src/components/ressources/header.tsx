import React from 'react';

import '../../scss/components/ressources/header.scss';

interface HeaderProps {
	title: string;
	description?: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
	return (
		<div className='actuality_header'>
			<h2>{title}</h2>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
		</div>
	);
};

export default Header;
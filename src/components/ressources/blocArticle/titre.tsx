import React from 'react';

import '../../../scss/components/ressources/blocArticle/bloc.scss';

interface Props {
	data: any
}

const Titre: React.FC<Props> = ({data}) => {
	return (
		<>
			{ data?.tailleDuTexte === "H1" ? (
				<h2 className='titre' dangerouslySetInnerHTML={{ __html: data.contenu }}></h2>
			) : data?.tailleDuTexte === "H2" ? (
				<h3 className='titre' dangerouslySetInnerHTML={{ __html: data.contenu }}></h3>
			) : (
				<h4 className='titre' dangerouslySetInnerHTML={{ __html: data.contenu }}></h4>
			)}
		</>
	);
};

export default Titre;
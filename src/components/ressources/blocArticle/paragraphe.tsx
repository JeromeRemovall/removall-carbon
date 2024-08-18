import React from 'react';

import '../../../scss/components/ressources/blocArticle/bloc.scss';

interface Props {
	data: any;
}

const Paragraphe: React.FC<Props> = ({ data }) => {
	return <div className='paragraphe' dangerouslySetInnerHTML={{ __html: data }}></div>;
};

export default Paragraphe;
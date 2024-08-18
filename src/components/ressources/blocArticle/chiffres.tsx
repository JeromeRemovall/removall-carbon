import React from 'react';

import '../../../scss/components/ressources/blocArticle/bloc.scss';

interface Props {
	data: any
}

const Chiffres: React.FC<Props> = ({data}) => {

	const renderItem = (data: any,index: number) => {
		return (
			<>
				{data[`item${index}`] && (
					<div className='chiffre'>
						<div className='index'>
							{index}
						</div>
						<div className='content'>
							<div className='description' dangerouslySetInnerHTML={{ __html: data[`item${index}`] }}></div>
						</div>
					</div>
				)}
			</>
		);
	}

	const renderImages = () => {
		const blocks = [];
		for (let i = 1; i < 5; i++) {
			blocks.push(renderItem(data, i));
		}
		return blocks;
	}

	return (
		<div className='chiffres-container'>
			{renderImages()}
		</div>
	);
};

export default Chiffres;
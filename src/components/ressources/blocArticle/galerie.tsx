import React from 'react';

import '../../../scss/components/ressources/blocArticle/bloc.scss';

interface Props {
	data: any;
}

const Galerie: React.FC<Props> = ({data}) => {

	const renderImage = (image: any,index: number) => {
		return (
			<>
				{data[`photo${index}`] && (
					<div className='row'>
						<div className='image'>
							<img src={image[`photo${index}`].sourceUrl} alt={image[`photo${index}`].altText} />
						</div>
						{data[`photo${index + 1}`] && (
							<div className='image'>
							<img src={image[`photo${index+1}`].sourceUrl} alt={image[`photo${index+1}`].altText} />
							</div>
						)}
					</div>
				)}
			</>
		);
	};

	const renderImages = () => {
		const blocks = [];
		for (let i = 1; i < 7; i += 2) {
			blocks.push(renderImage(data, i));
		}
		return blocks;
	};

	return (
		<div className='galerie-container'>
			<div className="images">
				{renderImages()}
			</div>
			<p className='legende'>{data.legende}</p>
		</div>
	);
};

export default Galerie;
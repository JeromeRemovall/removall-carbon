import React, { useState, useEffect } from "react"
import { ArrowRight } from 'react-feather';
import { ArrowLeft } from 'react-feather';

//styles
import "../scss/components/slider.scss"


const Slider = ({slides}) => {

	const [current, setCurrent] = useState(0);
	const length = slides.length;
	const [value, setValue] = useState(0);
	const [animation, setAnimation] = useState("");

	useEffect(() => {
		function setProgressBar(){
			if(length > 0){
				setValue(100 / length * (current + 1));
			}
		}
		setProgressBar();
	}, [current, value, length])

	const nextSlide = () => {
		setAnimation("animation");
		setTimeout(
			function(){
				setCurrent(current === length - 1 ? 0 : current + 1);
				setAnimation("")
			}
	, 500)

	}

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
	}

	return(
		<section className="slider">
			{slides.length !== 1 ? 
				<div className="slider-navigation">
					<div className="slider-navigation-index">
					<p>{`0${current + 1}`}</p>
						<progress value={value} max="100"></progress>
						<p>{"0"+slides.length}</p>
					</div>
					<div className="slider-navigation-arrow">
						<div className="slider-arrow--left">
							<ArrowLeft onClick={prevSlide}/>
						</div>
						<div className="slider-arrow--right">
							<ArrowRight onClick={nextSlide}/>
						</div>
					</div>
				</div>
			: null}
			{slides.map((slide, index) => {
				return (
					<div className={index === current ? 'slider-slide active' : 'slider-slide'} key={slide}>
						<div className="slider-overlay"></div>
						{index === current && (
							<>
								<div className="slider-image">
									<img src={slide.image.sourceUrl} alt={slide.image.altText}/>
								</div>
								<div className={`content ${animation}`}>
									<h1>{slide.titre}</h1>
									<p>{slide.texte}</p>
								</div>
							</>
						)}
					</div>
				)
			})}
		</section>
	)
}

export default Slider;
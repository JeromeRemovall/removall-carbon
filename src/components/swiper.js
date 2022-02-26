import React, {useRef} from 'react'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {ArrowRight} from "react-feather";
import {ArrowLeft} from "react-feather";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "../scss/components/swiper.scss"

function SwiperSlider({slides}) {

	const navigationPrevRef = useRef(null)
  	const navigationNextRef = useRef(null)

	return (
		<Swiper
			spaceBetween={32}
			slidesPerView={3}
			navigation={{
				prevEl: navigationPrevRef?.current,
				nextEl: navigationNextRef?.current,
			}}
			modules={[Navigation]}
		>
			{slides.length !== 1 ? 
				<>
					{slides.map((slide) => {
						return(
							<>
							<SwiperSlide>
								<img src={slide.image.sourceUrl} alt={slide.image.altText} />
							</SwiperSlide>
							<SwiperSlide>
								<img src={slide.image.sourceUrl} alt={slide.image.altText} />
							</SwiperSlide>
							<SwiperSlide>
								<img src={slide.image.sourceUrl} alt={slide.image.altText} />
							</SwiperSlide>
							<SwiperSlide>
								<img src={slide.image.sourceUrl} alt={slide.image.altText} />
							</SwiperSlide>
							</>
						)	
					})}
				</>
			:null}
			{slides.length > 1 && navigationPrevRef && navigationNextRef ? 
				<>
					<div className="swiper-button-prev" ref={navigationPrevRef}>
						<ArrowLeft />
					</div>
					<div className="swiper-button-next" ref={navigationNextRef}>
						<ArrowRight />
					</div>
				</>
			:null}
		</Swiper>
	);
};

export default SwiperSlider;
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

function SwiperSlider({slides, alt}) {

	const navigationPrevRef = useRef(null)
  	const navigationNextRef = useRef(null)

	// function addClassHidden() {
	// 	setTimeout(function(){
	// 		if(document.querySelector(".swiper-slide.swiper-slide-prev") && !document.querySelector(".swiper-slide.swiper-slide-prev.hidden")){
	// 			console.log("aaaaa")
	// 			document.querySelector(".swiper-slide.swiper-slide-prev").classList.add("hidden");
	// 			document.querySelector(".swiper-slide").classList.add("hidden");
	// 		}else{
	// 			console.log("eee")
	// 		}
	//    }, 1);
	// }

	return (
		<Swiper
			spaceBetween={32}
			slidesPerView={3}
			navigation={{
				prevEl: navigationPrevRef.current,
				nextEl: navigationNextRef.current,
			}}
			modules={[Navigation]}
		>
			{/* <SwiperSlide>
				{({ isActive }) => (
					addClassHidden()
				)}
			</SwiperSlide> */}
			{slides.length !== 1 ? 
				<>
					{slides.map((slide, index) => {
						return(
							<SwiperSlide>
								<img src={slide} alt=""/>
							</SwiperSlide>
						)	
					})}
				</>
			:null}
			<div className="swiper-button-prev" ref={navigationPrevRef}>
				<ArrowLeft />
			</div>
			<div className="swiper-button-next" ref={navigationNextRef}>
				<ArrowRight />
			</div>
		</Swiper>
	);
};

export default SwiperSlider;
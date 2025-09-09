import React from "react";

// import Swiper core and required modules
import { Navigation } from "swiper";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "../scss/components/swiper.scss";

function SwiperSlider({ slides }) {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={18}
      slidesPerView={1}
      navigation
      breakpoints={{
        834: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
    >
      {slides.map((slide) => {
        return (
          <>
            <SwiperSlide>
              <img
                src={slide.image.node.sourceUrl}
                alt={slide.image.node.altText}
              />
            </SwiperSlide>
          </>
        );
      })}
    </Swiper>
  );
}

export default SwiperSlider;

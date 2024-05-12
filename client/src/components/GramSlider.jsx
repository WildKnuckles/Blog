import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';


// import required modules
import { EffectCube, Pagination, Navigation } from 'swiper/modules';

 function GramSlider() {
  return (
    <>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{clicable:true}}
        navigation={true}
        modules={[EffectCube, Navigation, Pagination]}
        className="mySwiper"
      ><div className="text-left">
      <h2>Gramática <a>aqui.</a></h2>
      <span>Leia e se fascine com belas histórias.</span><br />
      <span>Comece já a explorar as brochuras da CPLP feitas para si.</span>
    </div>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default GramSlider
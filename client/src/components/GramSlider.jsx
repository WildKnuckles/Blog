import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
 
// Images Import
import capa1 from '../images/Capa gramatica.png'
import capa2 from '../images/Capa gramatica 1.png'
import capa3 from '../images/Capa gramatica 2.png'
import capa4 from '../images/Capa gramatica 3.png'
import capa5 from '../images/Capa gramatica 4.png'

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
        style={{height: '26rem',}}
        pagination={{clicable:true}}
        navigation={true}
        modules={[EffectCube, Navigation, Pagination]}
        className="mSwiper"
      ><div className="text-left">
      <h2>Gramática <a>aqui.</a></h2>
      <span>Leia e se fascine com belas histórias.</span><br />
      <span>Comece já a explorar as brochuras da CPLP feitas para si.</span>
    </div>
        <SwiperSlide>
          <img src={capa1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={capa2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={capa3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={capa4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={capa5} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default GramSlider
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import brx1 from '../images/brx1.png'
import brx2 from '../images/brx2.png'
import brx3 from '../images/brx3.png'
import brx4 from '../images/brx4.png'
import brx5 from '../images/brx5.png'
import brx6 from '../images/brx6.png'
import brx7 from '../images/brx7.png'
import brx8 from '../images/brx8.png'

// import required modules
import { EffectFlip, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <> 
      <div>
        <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Navigation]}
        className="mSwiper"
        paginationClassName="my-custom-pagination"

      ><div className="text-left">
      <h2>Brochuras <a>aqui.</a></h2>
      <span>Leia e se fascine com belas histórias.</span><br />
      <span>Comece já a explorar as brochuras da CPLP feitas para si.</span>
    </div>
        <SwiperSlide>
          <img src={brx1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={brx2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={brx3} />
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://online.fliphtml5.com/pcqft/ugoc/#p=1">Ler Brochura<img src={brx4} /></a>
        </SwiperSlide>
        <SwiperSlide>
          <img src={brx5} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={brx6} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={brx7} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={brx8} />
        </SwiperSlide>
        
      </Swiper></div>
    </>
  );
}
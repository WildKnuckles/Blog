import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from "swiper/modules";
import { RxArrowRight } from 'react-icons/rx';
import AO from '../images/AO.png'
import logo from '../images/cplp-logo.PNG'

const dicSlider = [
  {
    image: AO,
    name: 'Dicionário Digital da República de Angola',
    position: 'Customer',
    message:
      'Além da demonstração escrita de cada termo, contém a demonstração fonética (leitura por voz) do termo pesquisado, ajudando alunos a desenvolver a escrita e a expressão correcta de termos!',
    link: 'http://localhost/dicionario%20funcional/teste.php',  
  },
  {
    image: logo,
    name: 'Dicionário Digital Plurilíngue da Educação e Formação da CPLP',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
    link: 'http://localhost/dicionario%20funcional%20pc/index.php',
  }, 
];  

const DicSlider = () => {
  return (
    <>
    <Swiper   
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className='sp'
      style={{ height: '400px', width: '60%', left: '0rem', marginTop: '10rem' }}
    >       

      {dicSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='slide-content'>
              <div className='pic-container'>
                <div className='pic'>
                  <img src={person.image} width={100} height={100}/> 
                </div>
                <div className='name'>
                  {person.name}
                </div>
              </div>
              <div className='quote-and-message-container'>
                <div className='quote-and-icon'>
                  <div className='icone'>
                    <a href={person.link} className='icone'>
                    <RxArrowRight/></a>
                  </div>
                </div>
                <div className='message'>
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide> 
        );
      })}
    </Swiper></>
  );
};

export default DicSlider;

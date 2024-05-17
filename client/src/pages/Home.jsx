import React from 'react';
import { useMediaQuery } from 'react-responsive';
import RotatingWords from '../components/RotatingWords';
import Background from '../components/ParticlesContainer';
import Rounded from '../images/rounded-logo.png';
import Posts from '../components/Posts'

const Home = () => {
  const isCelular = useMediaQuery({ query: '(max-width: 800px)' });

  return (
    <>
      <Background />
      <div id="home" className="home">
        <div className="home-content">
          <h1>Seja bem-vindo/a</h1>
          <div className="change-text">
            <h3>Aqui pode consultar</h3>
            <h3 className="rotate">
              &nbsp;<RotatingWords />
            </h3>
          </div>
          <span>
            Temos para si brochuras, termologias, vocabulários e gramáticas <br /> da Língua Portuguesa com acesso gratuito.
          </span>
          <div className="icon">
            <div className="social-icons">
              <a href="https://web.facebook.com/comunidade.paises.lingua.portuguesa">
                <img src={Rounded} alt="Navbar Logo" />
              </a>
            </div>
          </div>
        </div>
        <div>
        </div>
          {isCelular && <Posts />}
      </div>
    </>
  );
};

export default Home;

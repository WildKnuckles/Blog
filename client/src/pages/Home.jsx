import React from 'react'
import RotatingWords from '../components/RotatingWords'
import Backgorund from '../components/ParticlesContainer'
import Rounded from '../images/rounded-logo.png'

const Home = () => {
  return (
     <> <Backgorund/>
     <div id="home" class="home">
     
        <div class="home-content"> 
          <h1>Seja bem-vindo/a</h1>
          <div class="change-text">
            <h3>Aqui pode consultar</h3>
            <h3 className='rotate'>
            &nbsp;<RotatingWords/>
               
            </h3>
          </div>
          <span>
            Temos para si brochuras, termologias,
            vocabulários e gramáticas <br/> da Língua Portuguesa com acesso gratuito.
          </span>
            <div className='icon'>
            <div class="social-icons">
            <a href="https://web.facebook.com/comunidade.paises.lingua.portuguesa"
              ><img src={Rounded} alt="Navbar Logo" /></a>
            
          </div>
            </div>
          
          
        </div>
      </div>
      
     </>
  )
}

export default Home
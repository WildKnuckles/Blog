import React from 'react'
import { Link } from 'react-router-dom'
import { BiLogoFacebook, BiLogoGmail, BiLogoInstagram, BiLogoLinkedin, BiLogoTwitter, BiLogoWhatsapp,} from 'react-icons/bi'
import Stars from '../components/Stars'
import { FaXTwitter } from 'react-icons/fa6'
import img1 from '../images/Jesus-f.jpg'
import img2 from '../images/Jon-c.JPG'
import img3 from '../images/Paula-h.jpg'
import img4 from '../images/Julio-d.jpg'
import img5 from '../images/Leo-f.jpg'

const UserProfile = () => {
  return (
    <> 
    <section className="create-post">
  <div className="container profile-container">
  <div className="profile-details-wrapper" style={{ gap: '5px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '10rem' }}>

  <div className="profile-details" style={{ flex: '1 1 100%', marginBottom: '20px' }}>
  <Link className='btn'>Equipa Técnica da CNIILP - AO</Link>

        <div className="avatar-wrapper">
          <div className="profile-avata">
            <img src={img3} alt="" />  
          </div> 
        </div> 
        <h1>Dra. Paula Henirques</h1>
        <p><ul style={{ display: 'flex', gap: '25px', fontSize: '20px'}}>
            <li style={{ display: 'flex', alignItems: 'center' }}><BiLogoFacebook/></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><BiLogoInstagram/></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><BiLogoGmail/></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><BiLogoWhatsapp/></li>
          </ul></p>
          <div><p>Diretora da CNIILP Angola</p></div><br /> 
       
      </div>

      <div className="profile-details" style={{ flex: '1' }}>
        <div className="avatar-wrapper">
          <div className="profile-avata">
            <img src={img1} alt="" />  
          </div> 
        </div> 
        <h1>Jesus Fernando</h1> 
        <p><ul style={{ display: 'flex', gap: '25px', fontSize: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://www.facebook.com/jesusfernando.ii.7'><BiLogoFacebook/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://www.instagram.com/jesus.escritor/'><BiLogoInstagram/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://jesus.escritor00@gmail.com'><BiLogoGmail/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://wa.me/944147056'><BiLogoWhatsapp/></a></li>
          </ul></p>
          <div><p>Designer Gráfico - Estudante do IPIL - Makarenco</p></div><br />
      </div>

      <div className="profile-details" style={{ flex: '1' }}>
        <div className="avatar-wrapper">
          <div className="profile-avata">
            <img src={img2} alt="" />  
          </div> 
        </div> 
        <h1>Jonatão Cardoso</h1>
        <p><ul style={{ display: 'flex', gap: '25px', fontSize: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://twitter.com/Johnny_Cardos'><FaXTwitter/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://instagram.com/johnnycardoso_wk'><BiLogoInstagram/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://jonataosacapia@gmail.com'><BiLogoGmail/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://wa.me/944072491'><BiLogoWhatsapp/></a></li>
          </ul></p>
          <div><p>Programador - Estudante do IPIL - Makarenco</p></div><br /> 
        
      </div>


      <div className="profile-details" style={{ flex: '1' }}>
        <div className="avatar-wrapper">
          <div className="profile-avata">
            <img src={img4} alt="" />  
          </div> 
        </div> 
        <h1>Júlio Domingos</h1> 
        <p><ul style={{ display: 'flex', gap: '25px', fontSize: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://www.linkedin.com/in/j%C3%BAlio-carlos-domingos-b09044241?'><BiLogoLinkedin/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://www.instagram.com/julio.domingos999'><BiLogoInstagram/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://juliodomingos1710@gmail.com'><BiLogoGmail/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://wa.me/940899340'><BiLogoWhatsapp/></a></li>
          </ul></p>
          <div><p>Programador - Estudante do IPIL - Makarenco</p></div><br />
      </div>


      

      <div className="profile-details" style={{ flex: '1' }}>
        <div className="avatar-wrapper">
          <div className="profile-avata">
            <img src={img5} alt="" />  
          </div> 
        </div> 
        <h1>Leo da Silva</h1> 
        <p><ul style={{ display: 'flex', gap: '25px', fontSize: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://www.linkedin.com/in/leo-da-silva-a54386256'><BiLogoLinkedin/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://www.instagram.com/12leodasilva'><BiLogoInstagram/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://12leodasilva@gmail.com'><BiLogoGmail/></a></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><a href='https://wa.me/qr/HM2K7FCRTWD3N'><BiLogoWhatsapp/></a></li>
          </ul></p>
          <div><p>Designer Gráfico - Estudante do IPIL - Makarenco</p></div><br />
          <form className='form profile-form'></form>
      </div>
    </div> 
  </div>
  <Stars/>
</section>
<br /> <br />
<Stars/>

</>


  
  )
}

export default UserProfile
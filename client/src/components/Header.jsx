import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/logo.png';
import AO from '../images/AO.png';
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import { UserContext } from '../context/userContext';
import {
  RiYoutubeLine, 
  RiInstagramLine, 
  RiFacebookLine, 
  RiDribbbleLine, 
  RiBehanceLine,
  RiPinterestLine,
} from 'react-icons/ri'
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiBookOpen, 
  HiInformationCircle,
  HiLanguage,
  HiDocumentText,
  HiNewspaper
} from 'react-icons/hi2'; 


const Header = () => {
  const [isNaShowing] = useState(window.innerWidth > 800 ? true : false);
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const {currentUser} = useContext(UserContext)
  const closeNavHandler = () => {
    if(window.innerWidth < 800){
      setIsNavShowing(false);
    }else{
      setIsNavShowing(true)
    } 
  }

  return (
    <nav>
      <div className="container nav-container">
    <Link to="/" onClick={closeNavHandler}>
    <img src={AO} width={10} height={50} />
    </Link>
    {currentUser?.id && isNavShowing && <ul className='nav-menu'>
      <li><Link to={`/profile/${currentUser?.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link></li>
      <li><Link to="/create" onClick={closeNavHandler}>Criar Post</Link></li>
      <li><Link to="/authors" onClick={closeNavHandler}>Autores</Link></li>
      <li><Link to="/logout" onClick={closeNavHandler}>Sair</Link></li>
    </ul>}

    <ul className='nav-icon'>
    <li><Link href={''} className='hover:text-accent transition-all duration-300'>
      <RiYoutubeLine />
    </Link></li>
    <li><a href={'https://web.facebook.com/comunidade.paises.lingua.portuguesa'}>
      <RiFacebookLine />
    </a></li>
    <li><a href={'https://www.instagram.com/cplpoficial/'}>
      <RiInstagramLine />
    </a></li>
    </ul>

    {!currentUser?.id && isNavShowing && (
  <ul className='nav-menu' style={{zIndex: '100'}}>
    {window.innerWidth < 800 && (
      <>
        <li><Link to="/news" onClick={closeNavHandler}><HiNewspaper/></Link></li>
        <li><Link to="/grammar" onClick={closeNavHandler}><HiDocumentText/></Link></li>
        <li><Link to="/brochure" onClick={closeNavHandler}><HiBookOpen/></Link></li>
        <li><Link to="/dicionary" onClick={closeNavHandler}><HiLanguage/></Link></li>
        <li><Link to="/about" onClick={closeNavHandler}><HiInformationCircle/></Link></li>
      </>
    )}
    {window.innerWidth > 800 && (<Link to="/" className='nav-logo' onClick={closeNavHandler}>
    <img src={Logo} alt="Navbar Logo" />
    </Link>)}
  </ul>
)}
    <button className="nav-toggle-btn" onClick={()=> setIsNavShowing(!isNavShowing)}>
      {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
    </button>
    
      </div>
    </nav>
  )
}

export default Header
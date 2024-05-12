import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiHome,
  HiBookOpen,
  HiInformationCircle,
  HiLanguage,
  HiDocumentText,
  HiNewspaper
} from 'react-icons/hi2'; // Importe os ícones que deseja usar

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Obtém o pathname da localização atual
    const pathname = location.pathname;

    // Mapeia os caminhos correspondentes a cada ícone
    const iconMappings = {
      '/': 'home',
      '/news': 'news',
      '/authors': 'authors',
      '/grammar': 'grammar',
      '/brochure': 'brochure',
      '/dicionary': 'dicionary',
      '/about': 'about',
    };

    // Define o ícone ativo com base no pathname atual
    setActiveIcon(iconMappings[pathname]);
  }, [location.pathname]); // Executa sempre que o pathname da localização mudar

  return (
    <div style={sidebarStyle}>
      <div style={iconContainerStyle}>
        <Link to="/">
          <IconWithTooltip
            icon={<HiHome style={{ ...iconStyle, color: activeIcon === 'home' ? '#12f7ff' : '#fff' }} />}
            tooltipText="Página-.Inicial"
          />
        </Link>
        <Link to="/news">
          <IconWithTooltip
            icon={<HiNewspaper style={{ ...iconStyle, color: activeIcon === 'news' ? '#12f7ff' : '#fff' }} />}
            tooltipText="Notícias"
          />
        </Link>
        <Link to="/grammar">
          <IconWithTooltip
            icon={<HiDocumentText style={{ ...iconStyle, color: activeIcon === 'grammar' ? '#12f7ff' : '#fff' }} />}
            tooltipText="Gramáticas"
          />
        </Link>
        <Link to="/brochure">
          <IconWithTooltip
            icon={<HiBookOpen style={{ ...iconStyle, color: activeIcon === 'brochure' ? '#12f7ff' : '#fff' }} />}
            tooltipText="Brochuras"
          />
        </Link>
        <Link to="/dicionary">
          <IconWithTooltip
            icon={<HiLanguage style={{ ...iconStyle, color: activeIcon === 'dicionary' ? '#12f7ff' : '#fff' }} />}
            tooltipText="Dicionários"
          />
        </Link>
        <Link to="/about">
          <IconWithTooltip
            icon={<HiInformationCircle style={{ ...iconStyle, color: activeIcon === 'about' ? '#12f7ff' : '#fff' }} />}
            tooltipText="Sobre"
          />
        </Link>
      </div>
    </div>
  );
};

const IconWithTooltip = ({ icon, tooltipText }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div
      style={iconContainerStyle}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && <div style={tooltipStyle}>{tooltipText}</div>}
      {icon}
    </div>
  );
};

const sidebarStyle = {
  height: '19rem',
  position: 'fixed',
  top: '200px',
  right: '25px',
  bottom: '20px',
  backgroundColor: '#6c78c3',
  padding: '20px',
  borderRadius: '50px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Adicione uma sombra para destacar o sidebar
};

const iconContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '0.2rem',
};

const iconStyle = {
  fontSize: '20px',
  margin: '10px 0',
};

const tooltipStyle = {
  position: 'absolute',
  top: '-30px',
  right: '100%',
  backgroundColor: '#f0f0f0',
  color: 'black',
  padding: '5px',
  fontSize: '12px',
  borderRadius: '10px',
};

export default Sidebar;

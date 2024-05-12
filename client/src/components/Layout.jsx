import React, { useState, useEffect } from 'react';
import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar';

const Layout = () => {
  const [isWindowLarge, setIsWindowLarge] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowLarge(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }} />
      {isWindowLarge && <Sidebar />}
      <Outlet />
    </div>
  );
}

export default Layout;

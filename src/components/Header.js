import React, { useState, useEffect } from 'react';
import Menu from '../assets/icons/menu.svg';

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust the breakpoint as needed
    };
    handleResize(); // Call the function once to set the initial state
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Header">
      <span className="logo">WHETHER.IO</span>
      <div>
        {isMobile ? (
          <button>
            <img src={Menu} alt="menu icon" />
          </button>
        ) : (
          <>
            <button>Help</button>
            <button>Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

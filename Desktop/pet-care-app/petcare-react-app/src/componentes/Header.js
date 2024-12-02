import logo from '../imagenes/logo.png';
import React from 'react';
function Header() {
  return (
    <header>
      <img className="logo-image" src={logo} alt="Logo" />
      <h1>Claw Guardians</h1>
    </header>
  );
}

export default Header;

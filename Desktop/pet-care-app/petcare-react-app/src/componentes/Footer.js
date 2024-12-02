// src/components/Footer.js
import React from 'react';

function Footer() {
  const year=new Date().getFullYear();
  return (
    <footer>
      <p> &copy; {year} Clauw Guardians- Veterinaria y Peluquería Matius Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
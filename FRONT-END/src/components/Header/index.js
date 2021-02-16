import React from 'react';
import logo from '../../assets/uol-lg.png';
import '../Header/styles.css';

const Header = () => {
  return (
    <div className="container-header">
      <img className="imagem-header" src={logo} alt="Logo Uol" />
    </div>
  );
};

export default Header;

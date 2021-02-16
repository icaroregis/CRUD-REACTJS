import React from 'react';
import Raster from '../../assets/Raster.png';
import './styles.css';

const Header2 = () => {
  return (
    <div className="section-header-two">
      <img className="imagem-header-two" src={Raster} alt="raster" />
      <h2>Painel de Clientes</h2>
    </div>
  );
};

export default Header2;

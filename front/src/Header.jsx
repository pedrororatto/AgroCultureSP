import React from 'react';
import './Header.css';

function Header () {
  return (
    <div className= "responsive-header">
      <h1>AgroCultureSP</h1>
      <p>Nosso sistema utiliza um algoritmo Random Forest Regressor de aprendizado de máquina para sugerir as cinco cidades mais adequadas ao cultivo de uma determinada cultura durante a estação escolhida. A pontuação de similaridade, calculada com base na temperatura e tipo de solo, orienta a recomendação, garantindo que as condições ideais sejam atendidas. As cidades são apresentadas em ordem decrescente de similaridade, facilitando a escolha das melhores opções para seus cultivos.</p>
    </div>
  );
}

export default Header;

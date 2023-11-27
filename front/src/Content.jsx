import PropTypes from 'prop-types';
import './Content.css';

  // content =
  // [

  //   {
  
  //     cidade: 'Sorocaba',
  
  //     pontuacao_similaridade: 0.7185714286
  
  //   },
  
  //   {
  
  //     cidade: 'Bauru',
  
  //     pontuacao_similaridade: 0.7185714286
  
  //   },
  
  //   {
  
  //     cidade: 'São Paulo',
  
  //     pontuacao_similaridade: 0.2241666667
  
  //   },
  
  //   {
  
  //     cidade: 'Salvador',
  
  //     pontuacao_similaridade: 0.0660714286
  
  //   },
  
  //   {
  
  //     cidade: 'Rio de Janeiro',
  
  //     pontuacao_similaridade: 0.0319047619
  
  //   }
  
  // ]

import map from './assets/mapa_sp.svg';

function Content({ content }) {
  return (
    <>
      <img src={map} alt="Mapa de São Paulo" className="responsive-image" />
    </>
  );
}

Content.propTypes = {
  content: PropTypes.any.isRequired,
};

export default Content;


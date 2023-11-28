import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Content.css'

import Map from './assets/Map.jsx'
import ibgeCities from './assets/municipios_sp.json'

function Content({ content }) {
  const [currentCity, setCurrentCity] = useState(null)

  useEffect(() => {
    content.forEach(({ codigo_ibge }) => {
      const element = document.querySelector('.ibge_' + codigo_ibge)
      if (element) element.style.fill = `rgba(100, 108, 255)`
    })
  }, [content])

  useEffect(() => {
    document.querySelectorAll('path[class*=" ibge_"]').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        element.style.opacity = 0.5
      })
      element.addEventListener('mouseleave', () => {
        element.style.opacity = 1
      })
      element.addEventListener('click', () => {
        const ibge = Number(element.className.baseVal.split('ibge_')[1])
        const { nome } = ibgeCities.find(({ id }) => id === ibge)
        const pontuacao_similaridade = content.find(({ codigo_ibge }) => codigo_ibge === ibge)?.pontuacao_similaridade
        setCurrentCity({
          ibge,
          nome,
          pontuacao_similaridade: pontuacao_similaridade ? pontuacao_similaridade.toFixed(2) * 100 : null
        })
      })
    })
  }, [content])

  return (
    <>
      <div className="responsive-image">
        <Map />
      </div>

      <div className="content">
        <h2>Informações sobre a cidade</h2>

        {currentCity ? (
          <div className="city-info">
            <h3>{currentCity.nome}</h3>
            <p>Pontuação de similaridade: {currentCity.pontuacao_similaridade ? currentCity.pontuacao_similaridade + '%' : 'não recomendado'}</p>
          </div>
        ) : (
          <p>Selecione uma cidade para ver as informações</p>
        )}
      </div>

    </>
  )
}

Content.propTypes = {
  content: PropTypes.any.isRequired,
}

export default Content


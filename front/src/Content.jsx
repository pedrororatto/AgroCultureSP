import { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Content.css'

import Map from './assets/Map.jsx'

function Content({ content }) {
  useEffect(() => {
    content.forEach(({ codigo_ibge, pontuacao_similaridade }) => {
      const element = document.querySelector('.ibge_' + codigo_ibge)
      if (element) {
        element.style.fill = `rgba(100, 108, 255, ${pontuacao_similaridade})`
      }
    })
  }, [content])

  return (
    <>
      <div className="responsive-image">
        <Map />
      </div>
    </>
  )
}

Content.propTypes = {
  content: PropTypes.any.isRequired,
}

export default Content


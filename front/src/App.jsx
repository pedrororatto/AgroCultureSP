import { useState, useEffect } from 'react'
import Content from './Content'
import './App.css'
import ibgeCities from './assets/municipios_sp.json'
import Header from './Header'

const API_URL = 'http://localhost:5000'

function App() {
  const [culture, setCulture] = useState('')
  const [cultures, setCultures] = useState([])
  const [season, setSeason] = useState('')
  const [seasons, setSeasons] = useState([])
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchSeasonsAndCultures() {
    try {
      const response = await fetch(`${API_URL}/list`)
      const data = await response.json()
      setCultures(data.culture)
      setSeasons(data.season)
    } catch (error) {
      setError('Ocorreu um erro ao buscar as culturas e estações')
      console.error(error)
    }
  }

  async function fetchContent() {
    if (!culture || !season) {
      setError('Por favor, selecione a cultura e a estação')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('culture', culture)
    formData.append('season', season)

    document.querySelectorAll('path[class*=" ibge_"]').forEach((element) => {
      element.style.fill = `#c1c1c1`
    })

    try {
      const response = await fetch(`${API_URL}/culture`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Falha ao buscar o conteúdo')
      }

      const data = await response.json()

      const dataWithId = data.map(({ cidade, pontuacao_similaridade }) => {
        const { id } = ibgeCities.find(({ nome }) => nome === cidade) ?? { id: null}
          return {
            cidade: cidade,
            codigo_ibge: id,
            pontuacao_similaridade: pontuacao_similaridade
          }
        }
      )
      
      console.log(dataWithId)
      setContent(dataWithId)
    } catch (error) {
      setError('Ocorreu um erro ao buscar o conteúdo')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSeasonsAndCultures() }, [])

  return (
    <>
      <Header />
      <div className="header">
        <div className="input">
          <select
            id="culture"
            value={culture}
            onChange={(e) => setCulture(e.target.value)}
          >
            <option value="">Selecione a cultura</option>
            {cultures.map((culture) => (
              <option key={culture} value={culture}>
                {culture}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <select
            id="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="">Selecione a estação</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
        <button onClick={fetchContent} disabled={loading}>
          {loading ? '...' : 'Buscar'}
        </button>
      </div>

      {error ? (
        <div className="result">
          <p className="error">{error}</p>
        </div>
      ) : content ? (
        <div className="result">
          <Content content={content} />
        </div>
      ) : (
        <div className="result">
          <p className="secondary">Use os campos acima para buscar</p>
        </div>
      )}
    </>
  )
}

export default App

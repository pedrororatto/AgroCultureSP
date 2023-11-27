import { useState } from 'react'
import Content from './Content'
import './App.css'
import ibgeCities from './assets/municipios_sp.json'

const API_URL = 'http://localhost:5000/culture'

function App() {
  const [culture, setCulture] = useState('')
  const [season, setSeason] = useState('')
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchContent() {
    if (!culture || !season) {
      setError('Por favor, informe a cultura e a estação')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('culture', culture.toLowerCase())
    formData.append('season', season.toLowerCase())

    try {
      const response = await fetch(API_URL, {
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

  return (
    <>
      <div className="header">
        <div className="input">
          <input
            id="culture"
            type="text"
            placeholder="Cultura (Ex.: Café)"
            value={culture}
            onChange={(e) => setCulture(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            id="season"
            type="text"
            placeholder="Estação (Ex.: Verão)"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
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

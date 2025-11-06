import React, { useState } from 'react'
import axios from 'axios'

export default function QuoteGenerator(){
  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchQuote(){
    setLoading(true); setError('')
    try{
      const res = await axios.get('/api/quote')
      setQuote(res.data.quote)
    }catch(err){
      setError(err.response?.data?.error || err.message || 'Failed to fetch')
    }finally{ setLoading(false) }
  }

  return (
    <div className="module">
      <div className="row">
        <div style={{flex:'1 1 200px'}}>
          <button className="primary" onClick={fetchQuote}>Get Motivational Quote</button>
        </div>
      </div>
      {loading && <div className="muted">Loading...</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      {quote && (
        <div className="row" style={{marginTop:12}}>
          <div className="card">
            <p style={{fontStyle:'italic'}}>"{quote}"</p>
          </div>
        </div>
      )}
    </div>
  )
}

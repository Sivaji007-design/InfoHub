import React, { useState } from 'react'
import axios from 'axios'

export default function CurrencyConverter(){
  const [amount, setAmount] = useState(100)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function convert(e){
    e && e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try{
      const res = await axios.get('/api/currency', { params: { amount } })
      setResult(res.data)
    }catch(err){
      setError(err.response?.data?.error || err.message || 'Failed to fetch')
    }finally{ setLoading(false) }
  }

  return (
    <div className="module">
      <form onSubmit={convert}>
        <div className="row">
          <div style={{flex:'1 1 200px'}}>
            <label className="muted">Amount (INR)</label>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
          </div>
          <div style={{width:120}}>
            <label className="muted">&nbsp;</label>
            <button className="primary" onClick={convert} style={{width:'100%'}}>Convert</button>
          </div>
        </div>
      </form>

      {loading && <div className="muted">Converting...</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      {result && (
        <div className="row" style={{marginTop:12}}>
          <div className="card">
            <h3>INR {result.amount} →</h3>
            <p>USD: {result.rates.USD ? result.rates.USD.toFixed(4) : '—'}</p>
            <p>EUR: {result.rates.EUR ? result.rates.EUR.toFixed(4) : '—'}</p>
            <p className="muted">Rates fetched: {result.fetched_at}</p>
          </div>
        </div>
      )}
    </div>
  )
}

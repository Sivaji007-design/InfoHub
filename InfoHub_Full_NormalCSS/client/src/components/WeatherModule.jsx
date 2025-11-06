import React, { useState } from 'react'
import axios from 'axios'

export default function WeatherModule(){
  const [city, setCity] = useState('New Delhi')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchWeather(e){
    e && e.preventDefault()
    setError(''); setLoading(true); setData(null)
    try{
      const res = await axios.get('/api/weather', { params: { city } })
      setData(res.data)
    }catch(err){
      setError(err.response?.data?.error || err.message || 'Failed to fetch')
    }finally{ setLoading(false) }
  }

  return (
    <div className="module">
      <form onSubmit={fetchWeather} style={{marginBottom:12}}>
        <div className="row">
          <div style={{flex:'1 1 300px'}}>
            <label className="muted">City</label>
            <input value={city} onChange={e=>setCity(e.target.value)} />
          </div>
          <div style={{width:120}}>
            <label className="muted">&nbsp;</label>
            <button className="primary" onClick={fetchWeather} style={{width:'100%'}}>Get</button>
          </div>
        </div>
      </form>

      {loading && <div className="muted">Loading...</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      {data && (
        <div className="row">
          <div className="card">
            <h3>{data.city}, {data.country}</h3>
            <p className="muted">Time: {data.time}</p>
            <p>Temperature: {data.temperature_c} °C</p>
            <p>Wind speed: {data.windspeed} m/s</p>
            <p className="muted">Weather code: {data.weathercode}</p>
          </div>
        </div>
      )}
    </div>
  )
}

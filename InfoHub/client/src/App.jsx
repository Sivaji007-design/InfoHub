import React, { useState } from 'react'
import WeatherModule from './components/WeatherModule'
import CurrencyConverter from './components/CurrencyConverter'
import QuoteGenerator from './components/QuoteGenerator'

export default function App(){
  const [active, setActive] = useState('Weather')
  return (
    <div className="container">
      <header>
        <h1>InfoHub</h1>
        <nav>
          <button onClick={()=>setActive('Weather')} className={active==='Weather'?'active':''}>Weather</button>
          <button onClick={()=>setActive('Currency')} className={active==='Currency'?'active':''}>Currency</button>
          <button onClick={()=>setActive('Quote')} className={active==='Quote'?'active':''}>Quote</button>
        </nav>
      </header>

      <main>
        {active==='Weather' && <WeatherModule />}
        {active==='Currency' && <CurrencyConverter />}
        {active==='Quote' && <QuoteGenerator />}
      </main>

      <footer style={{marginTop:20,textAlign:'center',color:'#6b7280'}}>Built with — InfoHub</footer>
    </div>
  )
}

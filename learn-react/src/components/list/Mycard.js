import React from 'react'
import './Mycard.css'

function Mycard() {
  return (
    <div className="card">
        <img src="https://www.melivecode.com/attractions/1.jpg" alt="Phi Phi Islands" style={{width:'100%'}}/>
        <div className="container">
            <h4><b>Phi Phi Islands</b></h4>
            <p>Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the 
                Malacca Coastal Strait of Thailand.</p>
        </div>
    </div>
  )
}

export default Mycard
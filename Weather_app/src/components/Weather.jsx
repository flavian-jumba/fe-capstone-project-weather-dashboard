import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
function Weather() {
  return (
    <div className='weather'> 
    <div className="serch-bar">
        <input type="text" placeholder='search'/>
        <img src="{search_icon}" alt="" />
    </div>
    </div>
  )
}

export default Weather
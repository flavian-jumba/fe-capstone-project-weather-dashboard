import React from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
const Weather = () => {  // Changed 'function Weather =' to 'const Weather ='
    
  return (
    <div className='weather'> 
      <div className="search-bar">  {/* Fixed typo from 'serch-bar' to 'search-bar' */}
        <input type="text" placeholder='search'/>
        <img src={search_icon} alt="Search Icon" />  {/* Changed to use curly braces for the image source */}
      </div>
      <img src= {clear_icon} className='weather-icon' alt="" />
      <p className='temperature'>16c</p>
      <p className='location'>London</p>
      <div className='weather-data'>
        <div className='col'>
           <img src= {humidity_icon} alt="" />
           <div>
            <p>91%</p>
            <span>Humidity</span>
           </div>
        </div>

        <div className='col'>
           <img src= {wind_icon} alt="" />
           <div>
            <p>3.4km/h</p>
            <span>wind speed</span>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

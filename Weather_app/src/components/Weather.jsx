import React from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {  // Changed 'function Weather =' to 'const Weather ='
  return (
    <div className='weather'> 
      <div className="search-bar">  {/* Fixed typo from 'serch-bar' to 'search-bar' */}
        <input type="text" placeholder='search'/>
        <img src={search_icon} alt="Search Icon" />  {/* Changed to use curly braces for the image source */}
      </div>
      <img src="" alt="" />
    </div>
  );
}

export default Weather;

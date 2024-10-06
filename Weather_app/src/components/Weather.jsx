import React, { useEffect } from 'react';
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
    const Weather = () =>{
        const [weatherData, setWeatherData] =useState(false); // Changed 'let weather' to
        const allIcons= {
            "01d":clear_icon,
            "01n":clear_icon,
            "02d":cloud_icon,

        }
        
        const search = async (city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        
        const response = await fetch (url);
        const data = await response.json();
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
            humidity: data.main.humidity,
            windspeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon:icon
            
        })

        } catch (error) {
            
        }
    }
}
useEffect(()=>{
    search("London")
},[])


  return (
    <div className='weather'> 
      <div className="search-bar">  {/* Fixed typo from 'serch-bar' to 'search-bar' */}
        <input type="text" placeholder='search'/>
        <img src={search_icon} alt="Search Icon" />  {/* Changed to use curly braces for the image source */}
      </div>
      <img src= {weatherData.icon} className='weather-icon' alt="" />
      <p className='temperature'>{weatherData.temperature}c</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
           <img src= {humidity_icon} alt="" />
           <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
           </div>
        </div>

        <div className='col'>
           <img src= {wind_icon} alt="" />
           <div>
            <p>{weatherData.windspeed}km/h</p>
            <span>wind speed</span>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

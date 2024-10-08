import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        "01d": clear_icon,   // clear sky (day)
        "01n": clear_icon,   // clear sky (night)
        "02d": cloud_icon,   // few clouds (day)
        "02n": cloud_icon,   // few clouds (night)
        "03d": cloud_icon,   // scattered clouds (day)
        "03n": cloud_icon,   // scattered clouds (night)
        "04d": drizzle_icon, // broken clouds (day)
        "04n": drizzle_icon, // broken clouds (night)
        "09d": rain_icon,    // shower rain (day)
        "09n": rain_icon,    // shower rain (night)
        "10d": rain_icon,    // rain (day)
        "10n": rain_icon,    // rain (night)
        "11d": rain_icon,    // thunderstorm (day)
        "11n": rain_icon,    // thunderstorm (night)
        "13d": snow_icon,    // snow (day)
        "13n": snow_icon,    // snow (night)
        "50d": cloud_icon,   // mist (day)
        "50n": cloud_icon    // mist (night)
    };

    const search = async (city) => {
        if (city === "") {
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log("API Response:", data);  // Debugging: check the response

            if (data.cod === 200) {
                const iconCode = data.weather[0].icon;  // Check the icon code
                const icon = allIcons[iconCode] || clear_icon;  // Map or fallback to clear

                setWeatherData({
                    humidity: data.main.humidity,
                    windspeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
            } else {
                alert(`Error: ${data.message}`);
                setWeatherData(null);
            }
        } catch (error) {
            setWeatherData(null);
            console.error("Error in fetching the data:", error);
        }
    };

    useEffect(() => {
        search("Kenya"); // Initial search for Kenya
    }, []);

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity_icon} alt="Humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind_icon} alt="Windspeed" />
                            <div>
                                <p>{weatherData.windspeed} Km/h</p>
                                <span>Windspeed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;

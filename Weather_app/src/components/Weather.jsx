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
    const inputRef = useRef(); // Reference for the input field
    const [weatherData, setWeatherData] = useState(null); // Initialize state for weather data
    const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages

    // Mapping weather icons to their respective codes
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        // Add more icons as needed
    };

    // Function to fetch weather data based on city name
    const search = async (city) => {
        try {
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            // Log the data for debugging
            console.log(data);

            // Check if the response contains valid weather data (status code 200)
            if (data.cod === 200) {
                const icon = allIcons[data.weather[0].icon] || clear_icon; // Default to clear icon if no matching icon is found
                setWeatherData({
                    humidity: data.main.humidity,
                    windspeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
                setErrorMessage(""); // Clear any previous error messages
            } else {
                setWeatherData(null); // Clear weather data
                setErrorMessage("City not found. Please enter a valid city name."); // Set an error message
            }
        } catch (error) {
            console.error("Error fetching weather data:", error); // Log any errors
            setErrorMessage("Failed to fetch weather data. Please try again later."); // Set a user-friendly error message
        }
    };

    // Use effect to fetch weather data for an initial city (e.g., "Lagos") on component mount
    useEffect(() => {
        search("Lagos"); // Change to a valid city name
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search for a city...' />
                <button
                    type="button" // Ensure button type is set to button
                    onClick={() => {
                        const city = inputRef.current.value;
                        if (city) {
                            console.log("Searching for:", city); // Debug log
                            search(city);
                        } else {
                            setErrorMessage("Please enter a city name"); // Handle empty input
                        }
                    }}
                >
                    Search
                </button>
            </div>

            {/* Conditional rendering to handle errors and display weather data */}
            {errorMessage && <p className="error">{errorMessage}</p>}

            {weatherData ? (
                <>
                    <img src={weatherData.icon} className='weather-icon' alt="Weather Icon" />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity_icon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind_icon} alt="Wind Speed Icon" />
                            <div>
                                <p>{weatherData.windspeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p> // Show loading text or handle error
            )}
        </div>
    );
}

export default Weather;

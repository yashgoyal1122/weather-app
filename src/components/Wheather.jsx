
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import "./Wheather.css"
import search_icon from "../assets/search.png"
import clear from "../assets/clear.png"
import humidity from "../assets/humidity.png"
import rain from "../assets/rain.png"
import cloudy from "../assets/cloud.png"
import snow from "../assets/snow.png"
import wind from "../assets/wind.png"
import drizzle from "../assets/drizzle.png"

const Wheather = () => {

  const inputRef = useRef()
  const allIcons = {
    "O1d": clear,
    "O1n": clear,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }
  const [WeatherData, setWeatherData] = useState(false)

  const search = async (city) => {

    try {
      if (city === "") {
        alert("Enter city name");
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      setWeatherData(false)
      console.error("Error in Fetching weather data");
    }
  }

  useEffect(() => {
    search('sawai madhopur')
  }, [])


  return (
    <div className='weather'>
      <div className="searchBar">
        <input type="text" ref={inputRef} id='input' placeholder='Search City' />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      <img src={WeatherData.icon} alt="" className='weatherIcon' />
      <p className='temperature'>{WeatherData.temperature}°C</p>
      <p className='location'>{WeatherData.location}</p>
      <div className="weatherData">
        <div className="col1">
          <img src={humidity} alt="" />
          <div>
            <p>{WeatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col2">
          <img src={wind} alt="" />
          <div>
            <p>{WeatherData.windSpeed} km/hr</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wheather

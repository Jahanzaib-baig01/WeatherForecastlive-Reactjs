import React, { useEffect, useState } from 'react';
import './css/styles.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import LiveDateTime from './LiveDateTime';

const LiveTemp = () => {

  const [city,setCity]=useState(null);
  const [wind, setWind] = useState(null);
  const [weather, setWeather] = useState(null);
  const [clouds, setClouds] = useState(null);
  const [search,setSearch]=useState("Lahore");

  useEffect( ()=>{
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=37d5cbfe539132039fd4b2f98eef6095`;
      const res = await fetch(url);
      const resjson = await res.json();
      // console.log(resjson);
      // setCity(resjson.main);
      const { main, wind, weather,clouds } = resjson;
      setCity(main);
      setWind(wind);
      if (weather && weather.length > 0) {
        setWeather(weather[0]);
      } else {
        setWeather(null);
      }
      setClouds(clouds);
    }
    fetchApi();
  },[search])

  return (
    <div className="box">
      <h1>Weather Forecast</h1>
        <div className='input'>
                <input
                    type='search'
                    className='inputfield'
                    value={search}
                    onChange={(event)=>{
                        setSearch(event.target.value)
                    }}
                />
            </div>
            <br /><br />
            {
              !city ? (
                <p>No Data Found</p>
              ) : (
                <div>
                <div className='centered-locationdiv'>
            <h2 className='location'>
            <FaMapMarkerAlt className="location-icon" />
                {search}
            </h2>    
        </div> 
        <hr /> 
        <div className='temp'>
            <h1>
              {city.temp}&deg; C 
            </h1>
            <h5 className="temperature">Min: {city.temp_min}° C   |   Max: {city.temp_max}° C</h5>
            
            <p className="temperature">Humidity: {city.humidity} %</p>
            <p className="temperature">Wind Speed: {wind.speed} m/s </p>
            <h6 className="temperature">Weather: {weather ? weather.main : 'N/A' }</h6>
            <p className='temperature'>Cloudiness: {clouds ? `${clouds.all}%` : 'N/A'}</p>
            <p className="temperature">{weather ? `${weather.description} | ${weather.icon}` : 'N/A'}</p>
            <LiveDateTime/>
        </div> 
        {/* <div className="rain">
                  <img src="../images/icons8-rain.gif" alt="rain animation" />
        </div> */}
        </div>
              )}
             
    </div>
  );
}

export default LiveTemp;
import React, {useState} from 'react';
import './Weather.css'


function Weather() {
  const now = new Date()
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')
  const [wrong, setWrong] = useState('')
  const api_key = '7b6ccb5b8d1102ca915e2e6bd8f9a6b9'

  let months = [
    'January', 
    'February',
    'March', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December',
    'April', 
  ]


  const getWether = async (e) => {
    if(e.target.value !== ''){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(res => res.ok ? res : Promise.reject(res))
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('')
          setWrong('')
        })
        .catch((err) =>{
            setWeather('')
            setWrong('City not found :(')
            console.log('Error:' + err.messege)
          })
      }
      else{
        setWrong('ошибка')
        setCity('city not found')
      }
  }

  return (
    <div className="cart">
      <div className="search_city">
      <input type="text"
      placeholder='Search of city'
      onChange={(e)=>setCity(e.target.value)}
      value={city}
      />
      <div onClick={getWether} className="search_icon">
      <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      </div>
      {(typeof weather.main != 'undefined')?(
      <div className='result'>
        <div className='result_weather'>
          <div className='country'>        
          <i className="fa-solid fa-city"></i> {weather.name}, <span>{weather.sys.country}</span> 
          <p>{now.getDate()} {months[now.getMonth()-1]}  <span>{now.getHours()}:{now.getMinutes()}</span  ></p>
          </div>
          <div className='temp'>
          {Math.round(weather.main.temp)}<span>°C</span> 
          <div className="description">
          {weather.weather[0].description}
          </div>
          </div>
          
          <div className='weather'>
            <div>
              <p>Feel like</p>
              {Math.round(weather.main.feels_like)}<span>°C</span>
            </div>
            <div>
              <p>Wind speed</p>
              {weather.wind.speed}m/s
            </div>
            <div>
              <p>Humidity</p>
              {weather.main.humidity}%
            </div>
          </div>
        </div>
      </div>
      
      ):(<div className='wrong'>
      <p>{wrong}</p> 
       </div>)}
    </div>
  );
}

export default Weather;

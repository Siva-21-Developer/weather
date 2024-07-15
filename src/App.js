import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faWater, faLocation, faAdd, faTemperatureHalf, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import weather from './assets/4205986.jpg';
import { useEffect, useState } from 'react';

function App() {
  const [weathers, setWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [city, setCity] = useState('');
  const [useCity, setUseCity] = useState(false);
  
  const search = async (latitude, longitude, cityName) => {
    try {
      const urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=9cb852cdfd104e8e33bc55feb445d9d2`;
      const urlByCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9cb852cdfd104e8e33bc55feb445d9d2`;
      const response = await fetch(useCity ? urlByCity : urlByCoords);
      const data = await response.json();
      
      setWeather({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        max: Math.floor(data.main.temp_max),
        min: Math.floor(data.main.temp_min),
        weather: data.weather[0].main,
        wind: data.wind.speed,
        city: data.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLon(longitude);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  useEffect(() => {
    if (useCity && city) {
      search(null, null, city);
    } else if (!useCity && lat !== null && lon !== null) {
      search(lat, lon);
    }
  }, [lat, lon, city, useCity]);

  const locations =()=>
  {
    setUseCity(false);
  }
  const add = () => {
    setUseCity(true);
  };

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const keys = (event, keys) => {
    return event.ctrlKey && event.shiftKey && event.key === keys;
  };

  document.onkeydown = (event) => {
    if (
      event.keyCode === 123 ||
      keys(event, "I") ||
      keys(event, "J") ||
      keys(event, "C") ||
      (event.ctrlKey && event.keyCode === "U".charCodeAt(0))
    )
      return false;
  };

  return (
    <div className='App'>
      <main>
        <div className="container">
          <div className='img-cons'>
            <img src={weather} alt='weather' />
          </div>
          <div className="Location">
            <div>
              <FontAwesomeIcon icon={faLocation} onClick={locations} style={{'cursor':'pointer'}}/>
              <h3>{weathers?.city}</h3>
            </div>
            <div className='inputcon'>
              <input type='text' value={city} onChange={(event)=>(setCity(event.target.value))}/>
            </div>
            <div>
              <FontAwesomeIcon icon={faAdd} onClick={add} style={{'cursor':'pointer'}}/>
            </div>
          </div>
          <div className="Degeree">
            <div className="cel">
              <h1>{weathers?.temp}</h1>
              <h5>°c</h5>
            </div>
            <div className="updown">
              <FontAwesomeIcon icon={faTemperatureHalf} />
              <h5><FontAwesomeIcon icon={faArrowDown} /> {weathers?.min}° / {weathers?.max}° <FontAwesomeIcon icon={faArrowUp} /></h5>
            </div>
          </div>
          <div className="Details">
            <h3>{weathers?.weather}</h3>
          </div>
        </div>

        <div className="content">
          <aside>
            <div className="weather">
              <FontAwesomeIcon icon={faWind} className='icons' />
              <h4>{weathers?.wind} km/h</h4>
            </div>
            <h2>Wind</h2>
          </aside>
          <aside>
            <div className="weather">
              <FontAwesomeIcon icon={faWater} className='icons' />
              <h4>{weathers?.humidity}%</h4>
            </div>
            <h2>Humidity</h2>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;

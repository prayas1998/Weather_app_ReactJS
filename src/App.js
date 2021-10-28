import React, { useState, useEffect }  from 'react';
import './App.css';
import Weather from './components/Weather';
import 'weather-icons/css/weather-icons.css';
import Form from './components/Form';

// api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const apiKey = "62d46a06f392d1519ac3f905898ec3b6";


function App() {

  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [main, setMain] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [temp_max, setTemp_Max] = useState(undefined);
  const [temp_min, setTemp_Min] = useState(undefined);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  
  const weatherIcon = {
    Thunderstorm : "wi-thunderstorm",
    Rain: "wi-storm-rain",
    Clouds: "wi-day-fog",
    Atmosphere: "wi-fog",
    Drizzle: "wi-sleet",
    Clear: "wi-day-sunny",
    Snow: "wi-snow"
  }
    
  const getWeather = async (e) => {
    
    e.preventDefault(); // Check StackOverflow

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if(country && city){
      const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
      const response = await apiCall.json();
      console.log(response);
      setCity(response.name);
      setCountry(response.sys.country);
      setCelsius(convertTemp(response.main.temp));
      setTemp_Max(convertTemp(response.main.temp_max));
      setTemp_Min(convertTemp(response.main.temp_min));
      setDescription(titleCase(response.weather[0].description));
      setError(false);
  
      // Setting icons according to weather :-
      get_weatherIcon(weatherIcon, response.weather[0].id);
    }else{
      setError(true);
    }
  }

  const get_weatherIcon = (icons, rangeId) => {
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(weatherIcon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(weatherIcon.Clouds);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(weatherIcon.Clear);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(weatherIcon.Snow);
        break;
      default:
        setIcon(weatherIcon.Clouds);
    }
  }

  const convertTemp = (temp) => {
      return Math.floor(temp - (273.15)); // To convert double value to int.
  }

  function titleCase(str) {         // To Capitalize all first letters of the string
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

  // useEffect(() => {
  //   getWeather();
  // }, [])
  
  return (
    <>
    <div className = "App">
      <Form getWeather = {getWeather} error = {error}/>
      <Weather city = {city} country = {country} celsius = {celsius} description = {description} temp_max = {temp_max} temp_min = {temp_min} icon = {icon}/>
    </div>
    </>
  );
}

export default App;

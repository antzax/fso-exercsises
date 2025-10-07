import axios from "axios";
import { useEffect, useState } from "react";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng;
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => console.log(err));
  }, [country]);

  if (!weather) {
    return null;
  }

  const weatherIcon = weather.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={weatherIconUrl} alt={weather.weather[0].description} />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;

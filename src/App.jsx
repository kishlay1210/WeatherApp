import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import SearchSection from "./components/SearchSection";
import { weatherCodes } from "./constants";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const filterHourlyForecast = (hourlyData) => {
  setHourlyForecasts(hourlyData);
};

  // Fetches weather details based on API
  const getWeatherDetails = async(API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
     
      //Extract Current weather data
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) => weatherCodes[icon].includes(data.current.condition.code));
      
      setCurrentWeather({ temperature, description, weatherIcon })
      
      // Combine hourly data from forecast days
      const combinedHourlyData = [...data.forecast.forecastday[0].hour];
      filterHourlyForecast(combinedHourlyData);
      // console.log(combinedHourlyData);
      
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="container">
      {/*Search Section*/}
      <SearchSection getWeatherDetails={getWeatherDetails}/>

      {/*Weather Section*/}
      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather}/>

        {/*Hourly Weather forecast list*/}
        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecasts.map((hourlyWeather) => (
              <HourlyWeatherItem key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}/>
            ))}
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

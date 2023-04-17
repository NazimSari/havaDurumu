import React, { useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { WeatherContext } from "../context/WeatherContext";

const API_KEY = "090593e9844c9d502af6427a4df99cb8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const lang = navigator.language.split("-")[0];
console.log({ lang });
function Hava() {
  const { selectedCity, weather, handleCitySelect, setWeather } =
    useContext(WeatherContext);
  const getBackgroundColor = () => {
    if (weather && weather.length > 0) {
      const temperature = weather[0].main.temp;
      if (temperature >= 30) {
        return "#FF5733"; // kırmızı
      } else if (temperature >= 20) {
        return "#FFC300"; // sarı
      } else {
        return "#87CEEB"; // mavi
      }
    } else {
      return "#ffffff"; // beyaz
    }
  };

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(
          `${BASE_URL}?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=${lang}`
        )
        .then((response) => {
          const filteredData = response.data.list.filter(
            (item, index) => index % 8 === 0
          );
          setWeather(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCity, setWeather]);
  return (
    <div>
      <h3 className="title">{`Seçilen şehir: ${selectedCity}`}</h3>
      <Dropdown onSelect={handleCitySelect} />
      {weather ? (
        <div className="card-container">
          {weather.map((weather) => (
            <div
              className="card"
              style={{ backgroundColor: getBackgroundColor() }}
              key={weather.dt}
            >
              <img
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
              />

              <h4>{weather.weather[0].description.toUpperCase()}</h4>
              <p>{`En Yüksek: ${Math.round(weather.main.temp_max)}°C`}</p>
              <p>{`En Düşük: ${Math.round(weather.main.temp_min)}°C`}</p>
              {/* <h3>{weather.dt}</h3> */}
              <h3>
                {new Date(weather.dt * 1000).toLocaleDateString("tr-TR", {
                  weekday: "long",
                })}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p>Şehir seçiniz...</p>
      )}
    </div>
  );
}

export default Hava;

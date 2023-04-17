import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

const WeatherContextProvider = (props) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <WeatherContext.Provider
      value={{ selectedCity, weather, handleCitySelect, setWeather }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;

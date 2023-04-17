import React, { useState, useEffect } from "react";
import axios from "axios";
const CITY_LIST_URL =
  "https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json";

const Dropdown = (props) => {
  const { onSelect } = props;
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get(CITY_LIST_URL)
      .then((response) => setCities(response.data))
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onSelect(city);
  };

  return (
    <select
      className="city-select"
      value={selectedCity}
      onChange={handleChange}
    >
      <option value="">Şehir seçin</option>
      {cities.map((city, index) => (
        <option key={index} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

import "./App.css";
import Hava from "./components/Hava";
import WeatherContextProvider from "./context/WeatherContext";
function App() {
  return (
    <div>
      <WeatherContextProvider>
        <Hava />
      </WeatherContextProvider>
    </div>
  );
}

export default App;

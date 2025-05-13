import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'

const API_Endpoint = "http://api.weatherapi.com/v1/current.json";

function App() {
   const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMetric, setcurrentMetric] = useState('C');

  const handleMetric = () => {
    if (currentMetric == "C") {
      setcurrentMetric("F")
    } else {
      setcurrentMetric("C")
    }
  }

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setResult(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(API_Endpoint, {
        params: {
          key: "beb1437d1a924cfd994183806251304",
          q: search,
        }
      });
      console.log(response.data);
      setResult(response.data);

    } catch (err) {
      console.error("Error fetching weather:", err);
      if (err.response) {
        console.error(`API Error: ${err.response.data.message || err.response.statusText}`);
        setResult(null);
      } else if (err.request) {
        console.error('Network Error: Could not reach the weather API server.');
        setResult(null);
      } else {
        console.error(`Error: ${err.message}`);
        setResult(null);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="weatherContainer">
        <form onSubmit={handleFormSubmit} className="search-form">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Enter a city or location"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>


        <div className="weatherDetails">
          {loading ? (
            <div>Loading Weather Data....</div>
          ) : result ? (
            <div className="items">
              <h2 className='location'>{result.location.name},{result.location.region}</h2>
              {currentMetric == "C" ? (
                <div
                  onClick={handleMetric}
                  className="cursor-pointer   p-2 rounded-md hover:bg-blue-200 transition duration-300"
                >
                  <p className="temp">Temperature: {result.current.temp_c}°C</p>
                  <p className="feelsLike">Feels like: {result.current.feelslike_c}°C</p>
                  <p className="toggleHint">Tap to toggle between °C and °F</p>
                </div>
              ) : (
                <div
                  onClick={handleMetric}
                  className="cursor-pointer   p-2 rounded-md hover:bg-red-300 transition duration-300"
                >
                  <p className="temp">Temperature: {result.current.temp_f}°F</p>
                  <p className="feelsLike">Feels like: {result.current.feelslike_f}°F</p>
                  <p className="toggleHint">Tap to toggle between °C and °F</p>
                </div>
              )}

              <p className='humidity'>Humidity: {result.current.humidity}</p>
            </div>
          ) : (
            <div>
              <p>No weather data available. Please search for a location.</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default App

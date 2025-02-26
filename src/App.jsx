import React, { useState } from "react"
import SearchBar from "./components/SearchBar"
import WeatherDisplay from "./components/WeatherDisplay"
import ForecastDisplay from "./components/ForecastDisplay"
import { fetchWeather } from "./services/weatherApi"

const App = () => {
  const [location, setLocation] = useState("")
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (searchLocation) => {
    setLocation(searchLocation)
    setLoading(true)
    setError(null)

    try {
      const data = await fetchWeather(searchLocation)
      setWeatherData(data)
    } catch (error) {
      setError(error.message)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold text-center text-blue-800 mb-8'>
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} />

        {location && (
          <div className='text-center text-gray-700 mb-4'>
            Showing weather for:{" "}
            <span className='font-semibold'>{location}</span>
          </div>
        )}

        {loading && (
          <div className='text-center py-4'>Loading weather data...</div>
        )}

        {error && (
          <div className='text-center py-4 text-red-500'>Error: {error}</div>
        )}

        {weatherData && !loading && !error && (
          <>
            <WeatherDisplay weatherData={weatherData} />
            <ForecastDisplay weatherData={weatherData} />
          </>
        )}
      </div>
    </div>
  )
}

export default App

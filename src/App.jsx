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
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-2 sm:p-4 md:p-6'>
      <div className='max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto'>
        <header className='bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg shadow-lg p-6 mb-6'>
          <h1 className='text-3xl md:text-4xl font-bold text-center text-cyan-200 mb-8'>
            Weather Dashboard
          </h1>

          <p className='text-center text-blue-100 mb-6'>
            Get current weather and forecast for any location
          </p>

          <SearchBar onSearch={handleSearch} />
        </header>
        {location && (
          <div className='text-center text-gray-700 mb-4'>
            Showing weather for:{" "}
            <span className='font-semibold'>{location}</span>
          </div>
        )}

        {loading && (
          <div className='text-center py-8 bg-white bg-opacity-50 rounded-lg shadow-sm'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto'></div>
            <p className='mt-2 text-gray-700'>Loading Weather Data...</p>
          </div>
        )}

        {error && (
          <div className='text-center text-red-600 bg-red-100 p-6 rounded-lg my-4 border-l-4 border-red-500 shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Error</h3>
            <p>{error}</p>
            <p className='mt-2 text-sm'>
              Please check the city name and try again.
            </p>
          </div>
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

import { Heart, HeartOff } from "lucide-react"
import React, { useEffect, useState } from "react"

const WeatherDisplay = ({ weatherData }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "",
  })

  if (!weatherData) {
    return null
  }

  // Correctly access the weather data properties
  // The weatherData object contains current weather data directly, not nested
  const temp = Math.round(weatherData.main.temp)
  const feelsLike = Math.round(weatherData.main.feels_like)
  const weatherIcon = weatherData.weather[0].icon
  const weatherDescription = weatherData.weather[0].description

  useEffect(() => {
    if (!weatherData) return

    // The location name is directly in weatherData, not in weatherData.current
    const locationName = weatherData.name
    const savedFavorites = localStorage.getItem("weatherFavorites")

    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setIsFavorite(favorites.includes(locationName))
    }
  }, [weatherData])

  const toggleFavorite = () => {
    if (!weatherData) return

    // The location name is directly in weatherData, not in weatherData.current
    const locationName = weatherData.name
    let favorites = []

    try {
      const savedFavorites = localStorage.getItem("weatherFavorites")
      if (savedFavorites) {
        favorites = JSON.parse(savedFavorites)
      }

      if (isFavorite) {
        favorites = favorites.filter((fav) => fav !== locationName)
      } else {
        favorites.push(locationName)
      }

      localStorage.setItem("weatherFavorites", JSON.stringify(favorites))
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error("Could not access localStorage:", error)

      setNotification({
        visible: true,
        message:
          "Unable to save favorite. This might happen in private browsing mode or if cookies are disabled.",
        type: "error",
      })

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ visible: false, message: "", type: "" })
      }, 5000)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6'>
      <div className='flex flex-col sm:flex-row items-center sm:justify-between'>
        <div className='text-center sm:text-left mb-4 sm:mb-0'>
          <h2 className='text-2xl font-bold text-gray-800'>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className='text-gray-600 capitalize'>{weatherDescription}</p>
        </div>

        <button
          className={`ml-2 p-2 rounded-full transition-colors duration-300 ${
            isFavorite
              ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
          onClick={toggleFavorite}
        >
          {isFavorite ? <Heart /> : <HeartOff />}
        </button>

        <div className='flex items-center'>
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={weatherDescription}
            className='w-16 h-16'
          />
          <span className='text-4xl font-bold text-gray-800 ml-2'>
            {temp} °C
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
        <div className='bg-blue-50 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100'>
          <p className='text-sm text-gray-500'>Feels Like</p>
          <p className='text-xl font-semibold'>{feelsLike} °C</p>
        </div>

        <div className='bg-blue-50 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100'>
          <p className='text-sm text-gray-500'>Humidity</p>
          <p className='text-xl font-semibold'>{weatherData.main.humidity}%</p>
        </div>

        <div className='bg-blue-50 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100'>
          <p className='text-sm text-gray-500'>Wind</p>
          <p className='text-xl font-semibold'>{weatherData.wind.speed} m/s</p>
        </div>

        <div className='bg-blue-50 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-blue-100'>
          <p className='text-sm text-gray-500'>Pressure</p>
          <p className='text-xl font-semibold'>
            {weatherData.main.pressure} hPa
          </p>
        </div>
      </div>

      {notification.visible && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            notification.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  )
}

export default WeatherDisplay

import React from "react"

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) {
    return null
  }

  const { current } = weatherData
  const temp = Math.round(current.main.temp)
  const feelsLike = Math.round(current.main.feels_like)
  const weatherIcon = current.weather[0].icon
  const weatherDescription = current.weather[0].description

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>
            {current.name}, {current.sys.country}
          </h2>
          <p className='text-gray-600 capitalize'>{weatherDescription}</p>
        </div>

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
        <div className='bg-blue-50 p-3 rounded-lg'>
          <p className='text-sm text-gray-500'>Feels Like</p>
          <p className='text-xl font-semibold'>{feelsLike} °C</p>
        </div>

        <div className='bg-blue-50 p-3 rounded-lg'>
          <p className='text-sm text-gray-500'>Humidity</p>
          <p className='text-xl font-semibold'>{current.main.humidity}%</p>
        </div>

        <div className='bg-blue-50 p-3 rounded-lg'>
          <p className='text-sm text-gray-500'>Wind</p>
          <p className='text-xl font-semibold'>{current.wind.speed} m/s</p>
        </div>

        <div className='bg-blue-50 p-3 rounded-lg'>
          <p className='text-sm text-gray-500'>Pressure</p>
          <p className='text-xl font-semibold'>{current.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay

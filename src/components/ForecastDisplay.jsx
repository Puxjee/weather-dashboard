import React from "react"

const ForecastDisplay = ({ forecast }) => {
  if (!forecast || !forecast.list) {
    return null
  }

  // Get one forecast per day (every 8th item is roughly a day)
  const dailyForecast = forecast.list
    .filter((forecast, index) => index % 8 === 0)
    .slice(0, 5)

  return (
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>5-Day Forecast</h2>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        {dailyForecast.map((forecast) => {
          const date = new Date(forecast.dt * 1000)
          const day = date.toLocaleDateString("en-US", { weekday: "short" })
          const temp = Math.round(forecast.main.temp)
          const icon = forecast.weather[0].icon
          const description = forecast.weather[0].description
          return (
            <div
              key={forecast.dt}
              className='bg-blue-50 p-3 rounded-lg text-center transition-all duration-300 hover:shadow-md hover:bg-blue-100'
            >
              <p className='font-medium'>{day}</p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
                className='w-12 h-12 mx-auto'
              />
              <p className='text-lg font-semibold'>{temp} °C</p>
              <p className='text-xs text-gray-500 capitalize'>{description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastDisplay

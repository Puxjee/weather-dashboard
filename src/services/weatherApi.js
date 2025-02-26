const API_KEY = "769f2d90707cafcf21aada644cc29b15"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeather(location) {
  try {
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`
    )

    if (!currentResponse.ok) {
      throw new Error("City not found or weather data not available")
    }

    const currentWeather = await currentResponse.json()

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${location}&units=metric&appid=${API_KEY}`
    )

    if (!forecastResponse.ok) {
      throw new Error("Forecast data unavailable")
    }

    const forecastData = await forecastResponse.json()

    return {
      current: currentWeather,
      forecast: forecastData,
    }
  } catch (error) {
    throw error
  }
}

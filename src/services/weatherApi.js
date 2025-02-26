// Make sure this file is in your services directory
const API_KEY = "6f74be1d365fd799c5936f9138ebc6b0"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeather(location) {
  try {
    // Log for debugging - you can remove this in production
    console.log(`Fetching weather for ${location}`)

    // Fetch current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(
        location
      )}&units=metric&appid=${API_KEY}`
    )

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json()
      throw new Error(
        errorData.message || "City not found or weather data not available"
      )
    }

    const currentWeather = await currentResponse.json()

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(
        location
      )}&units=metric&appid=${API_KEY}`
    )

    if (!forecastResponse.ok) {
      throw new Error("Forecast data unavailable")
    }

    const forecastData = await forecastResponse.json()

    // Return both current and forecast data
    return {
      current: currentWeather,
      forecast: forecastData,
    }
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

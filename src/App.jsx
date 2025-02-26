import React, { useState } from "react"
import SearchBar from "./components/SearchBar"

const App = () => {
  const [location, setLocation] = useState("")
  const handleSearch = (searchLocation) => {
    setLocation(searchLocation)
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
      </div>
    </div>
  )
}

export default App

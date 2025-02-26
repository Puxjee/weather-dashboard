import React, { useEffect, useState } from "react"

const FavoritesBar = ({ onSelectLocation }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("weatherFavorites")
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
      // Don't set favorites if there's an error
    }
  }, [])

  const handleSelectFavorite = (location) => {
    return () => {
      console.log(`Selected favorite: ${location}`)
      onSelectLocation(location)
    }
  }

  return (
    <div className='mb-4'>
      <h2 className='text-lg font-semibold mb-2 text-gray-700'>Favorites</h2>

      {favorites.length === 0 ? (
        <p className='text-sm text-gray-500'>
          No favorites saved yet. Search for a location and save it.
        </p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          {favorites.map((favorite, index) => (
            <button
              key={index}
              onClick={handleSelectFavorite(favorite)}
              className='bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300'
            >
              {favorite}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesBar

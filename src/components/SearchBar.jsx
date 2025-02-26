import React from "react"

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const location = e.target.elements.location.value.trim()
    if (location) {
      onSearch(location)
      e.target.elements.location.value = ""
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:flex-row gap-2 mb-6'
    >
      <input
        type='text'
        name='location'
        placeholder='Enter city name..'
        className='flex-grow px-4 py-2 rounded-l-lg sm:rounded-r-none border-2 border-blue-300 focus:outline-none focus:border-blue-500'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg sm:rounded-l-none transition-all duration-300 transform hover:scale-105'
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar

import React from 'react'

const Loader = () => {
  return (
  <div className="flex justify-center items-center h-64">
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
    </div>
  )
}

export default Loader
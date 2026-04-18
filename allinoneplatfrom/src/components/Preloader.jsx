import React from 'react'
import preload from '../images/preload.gif'

function Preloader() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <img src={preload} alt="preload" className="w-auto max-w-full" />
    </div>
  )
}

export default Preloader
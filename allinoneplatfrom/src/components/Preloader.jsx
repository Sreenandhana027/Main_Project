import React from 'react'
import preload from '../images/preload.gif'

function Preloader() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center 
                    bg-black">
      <img src={preload} alt="preload" />

    </div>
  )
}

export default Preloader

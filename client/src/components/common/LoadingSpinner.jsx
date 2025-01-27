import React from 'react'
import "./LoadingSpinner.css"

const LoadingSpinner = ({height=true}) => {
  return (
    <div className={`w-full ${height? "h-[50vh]": "max-h-max"} flex items-center justify-center`}>
        <div className="lds-dual-ring"></div>
    </div>
  )
}

export default LoadingSpinner
import React from 'react'
import { useLocation } from 'react-router-dom'
const Final = () => {
  const location=useLocation();
  const msg=location.state?.msg
  return (
    <div className='text-center mt-3'>{msg}</div>
  )
}

export default Final
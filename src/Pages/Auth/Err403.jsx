import React from 'react'
import { Link } from 'react-router-dom'

const Err403 = ({role}) => {
  return (
    <div className='text-wrapper'>
      <div className='title' data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className='subtitle'>
        Oops, You don't have permission to access this page
      </div>
      <Link to={role === '1996' ? '/dashboard/writer' : '/'}>
        {role === '1996' ? "Go To Writer Page " : "Go To Home Page"}
      </Link>
    </div>
  )
}

export default Err403

import React from 'react'
import { useSelector } from 'react-redux'

function HomeComp() {
  const handleLogout = () => {
    localStorage.removeItem("userToken")
    window.location.reload()
  }
  const { user } = useSelector((state) => ({ ...state?.user?.user }))

  return (
    <>
      <div className='d-flex justify-content-between m-4'>
        <div className='ms-5'>
          <h2>TUMMOC</h2>
        </div>
        <div className='me-5'>
          <button className='btn btn-danger' onClick={handleLogout}>LogOut</button>
        </div>
      </div>
      <h1>Hello { user?.name} !</h1>
    </>
  )
}

export default HomeComp

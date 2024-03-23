import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFavouriteContext } from '../../context/FavouriteContext'
import "../../App.css"
import { useAuthContext } from '../../context/AuthContext'

export default function Navbar() {
  let userImg = "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
  const { user, logOut } = useAuthContext()
  const navigate = useNavigate()

  const { favourite } = useFavouriteContext();


  const handleLogout = () => {
    logOut();
    alert("User Logged out!")
    navigate("/")
  }

  return (
    <div>
      <div className='nav-bar'>
        <Link to="/" className='nav-links' > <li> Home </li> </Link>
        <Link to="/episodes" className='nav-links' > <li> Episodes </li> </Link>
        <Link to="/location" className='nav-links' > <li> Location </li> </Link>

        <Link to="/favourite" className='nav-links'> 
        <li> WishList <span style={{ color: "darkblue", fontWeight: "bolder" }} >{favourite.length}</span> </li></Link>
        <div className='user-img'>
          <div style={{display:"flex", alignItems:"center", gap:"20px"}} >
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <img src={user.photoURL ? user.photoURL : userImg} alt="user" />
                <span>
                  {user.displayName ? (
                    user.displayName.length >= 7 ? `${user.displayName.substring(0, 7)}..` : user.displayName
                  ) : (
                    "lorem"
                  )}
                </span>
              </div>
            ) : (
              <img src={userImg} alt="Dummy user" />
            )}
          <div>
            {user ? (
              <span onClick={handleLogout}> LogOut </span>
            ) : (
              <Link to="/login"className='nav-links' > <li> Login </li> </Link>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

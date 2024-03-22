import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../App.scss";
import { useFavouriteContext } from "../../context/FavouriteContext";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const { favourite } = useFavouriteContext();

  const { googleSignIn, logOut, user } = useAuthContext();
  console.log(user);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      alert("SignIn Successfully!")
      navigate("/")
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogout = () => {
    logOut()
    navigate("/")
  }
  let userImg = "https://img.icons8.com/?size=100&id=23264&format=png"

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fs-3 ubuntu">
          Rick & Morty <span className="text-primary">WiKi</span>
        </Link>
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fas fa-bars open text-dark"></span>
          <span class="fas fa-times close text-dark"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav fs-5"
            style={{ displayL: "flex", alignItems: "center" }} >
            <NavLink to="/" className="nav-link">
              Characters
            </NavLink>
            <NavLink to="/episodes" className="nav-link">
              Episode
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/location"
            >
              Location
            </NavLink>
            <NavLink
              to="/favourite"
              className="nav-link"
              activeClassName="active"
            >
              Favourite {favourite.length}
            </NavLink>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "15px",
                alignItems: "center",
                justifyContent: "space-between",
              }} >
              {
                user ? (
                  <div style={{
                    display: "flex",
                    alignItems: "center", justifyContent: "center", gap: "10px"
                  }}>
                    <img
                      src={user.photoURL ? user.photoURL : userImg}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        cursor: "pointer"
                      }} />
                    <p onClick={handleLogout} style={{ cursor: "pointer", margin: "5px" }} >LogOut</p>
                  </div>
                ) : (
                  <p onClick={handleGoogleSignIn} style={{ cursor: "pointer", margin: "5px" }} >SignIn</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

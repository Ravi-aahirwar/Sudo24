import React from 'react'
import { useFavouriteContext } from '../context/FavouriteContext';
import { Link } from 'react-router-dom';
// import styles from "./Card.module.scss";
import styles from '../components/Card/Card.module.scss'
export default function Favourite() {

  const { favourite, RemoveFavourite } = useFavouriteContext()
  let page = 1

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add to Favourite</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px", margin: "10px 2rem"
        }}>
        {
          favourite.map((elm) => {
            return <div style={{ textDecoration: "none", border: "2px solid #0b5ed7" }} >
              <Link
                to={`${page}${elm.id}`}
                key={elm.id}
                style={{ textDecoration: "none" }}
              >
                <div>
                  <img src={elm.image} height={200} width={200} alt="" />
                  <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                    <div>{elm.name}</div>
                    <div className="">
                      <div>{elm.location.name}</div>
                    </div>
                  </div>
                </div>
              </Link>
              <span
                style={{
                  color: 'darkblue',
                  cursor: "pointer",
                  padding: "10px"
                }}
              ><p onClick={() => RemoveFavourite(elm.id)} > Remove From Favourite. </p></span>
            </div>
          })
        }
      </div>
      {
        favourite.length <= 0 && (
          <h1 style={{ textAlign: "center" }}> Your Favourite Page is Empty. </h1>
        )
      }
    </div>
  )
}

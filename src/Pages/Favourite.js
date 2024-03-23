import React from 'react'
import { useFavouriteContext } from '../context/FavouriteContext';
import { Link } from 'react-router-dom';
import styles from '../components/Card/Card.module.scss'
export default function Favourite() {

  const { favourite, RemoveFavourite } = useFavouriteContext()

  return (
    <div>
      <p style={{ textAlign: "center", }}>Add to Favourite</p>
      <div style={{display:"flex", alignItems:"center", margin:"15px", gap:"10px", justifyContent:"center"}} > {
        favourite.map((elm) => {
          return <div className='outer-div'>
            <Link to={`/${elm.id}`} >
              <img src={elm.image} height={30} width={30} alt={elm.name} />
            </Link>
            <p>Id: {elm.id} </p>
            <p> Name:  {elm.name} </p>
            <p> Status: {elm.status} </p>
            <p onClick={() => RemoveFavourite(elm.id)} style={{ cursor: "pointer", color: "red", fontWeight: "bolder" }}> Remove to Favourite.</p>
          </div>
        })
      }
      </div>
      {
        favourite.length <= 0 && (
          <h4> Your WishList isEmpty </h4>
        )
      }
    </div>
  )
}

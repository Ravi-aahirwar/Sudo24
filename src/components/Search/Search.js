import React from 'react'
import { useFavouriteContext } from '../../context/FavouriteContext'

const Search = ({ handleSearchValue }) => {


  return (
    <div>
      <div style={{margin:"10px 10px", marginLeft:"7rem", width:"400px"}} >
        <input type="text" style={{padding:"6px 10px", borderRadius:"5px"}} onChange={handleSearchValue} placeholder="Search" />
      </div>
    </div>
  )
}

export default Search

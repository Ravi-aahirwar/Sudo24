import React, { createContext, useContext, useEffect, useReducer } from "react";

const favouriteContext = createContext();

const FavouriteProvider = ({ children }) => {

  // let API = "https://rickandmortyapi.com/api/character"
  const initialState = {
    data: [],
    loading: false,
    error: "",
    favourite: [],
    inputVal: "",
    infoData:[]
  }
  const reducer = (state, action) => {
    if (action.type === "ADD_TO_FAVOURITE") {
      let { id, data } = action.payload;
      let existingCard = state.favourite.find((elm) => elm.id === id)
      if (existingCard) {
        alert("Card already In Favourite! Choose Another One ")
      }
      else {
        alert("Card added to Favourite :)")
        let favouriteCard;
        favouriteCard = {
          id: data[0],
          image: data[1],
          name: data[2],
          status: data[3],
          location: data[4]
        }
        return {
          ...state,
          favourite: [...state.favourite, favouriteCard]
        }
      }
    }

    if (action.type === "REMOVE_FROM_FAVOURITE") {
      let removefavourite = state.favourite.filter((elm) => (
        elm.id !== action.payload
      ))
      return {
        ...state,
        favourite: removefavourite
      }
    }

    return state;
  }



  const [state, dispatch] = useReducer(reducer, initialState)

  const addToFavourite = (id, data) => {
    dispatch({ type: "ADD_TO_FAVOURITE", payload: { id, data } })
  }

  const RemoveFavourite = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVOURITE", payload: id })
  }

  return (
    <favouriteContext.Provider
      value={{
        ...state,
        addToFavourite,
        RemoveFavourite,
      }}>
      {children}
    </favouriteContext.Provider>
  );
};

export const useFavouriteContext = () => {
  return useContext(favouriteContext);
};

export { FavouriteProvider, favouriteContext };

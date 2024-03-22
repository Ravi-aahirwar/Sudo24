import React, { createContext, useContext, useEffect, useReducer } from "react";

const favouriteContext = createContext();

const FavouriteProvider = ({ children }) => {

  let API = "https://rickandmortyapi.com/api/character"

  let ravi = "Ravi kumar Ahirwar"

  const initialState = {
    data: [],
    loading: false,
    error: "",
    favourite: [],
    inputVal: ""
  }

  const reducer = (state, action) => {
    if (action.type === "LOADING") {
      return {
        ...state,
        loading: true
      }
    }

    if (action.type === "API_ERROR") {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    if (action.type === "SET_API_DATA") {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

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


  const getAPidata = async (url) => {
    dispatch({ type: "LOADING" })
    try {
      const res = await fetch(url)
      const data = await res.json()
      dispatch({ type: "SET_API_DATA", payload: data })
    } catch (error) {
      dispatch({ type: "API_ERROR", payload: error.message })
    }
  }

  const addToFavourite = (id, data) => {
    dispatch({ type: "ADD_TO_FAVOURITE", payload: { id, data } })
  }

  const RemoveFavourite = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVOURITE", payload: id })
  }


  useEffect(() => {
    getAPidata(API)
  }, [])

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

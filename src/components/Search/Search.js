import React, { useState } from "react";
import styles from "./Search.module.scss";
import { useFavouriteContext } from "../../context/FavouriteContext";

const Search = ({ setSearch, updatePageNumber }) => {
  // const { handleSearch } = useFavouriteContext()
  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5`}
    >
      <input
        // onChange={handleSearch}
        placeholder="Search for characters"
        className={styles.input}
        type="text"
      />
      <button
        className={`${styles.btn} btn btn-primary fs-5`}
      >
        Search
      </button>
    </form>
  );
};

export default Search;

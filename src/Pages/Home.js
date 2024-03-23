// Pages/Home.js
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Search from '../components/Search/Search';
import Card from '../components/Card/Card';
import Filter from '../components/Filter/Filter';
import Pagination from '../components/Pagination/Pagination';
import { useFavouriteContext } from '../context/FavouriteContext';

const GET_CHARACTERS = gql`
  query Characters($page: Int!, $name: String, $status: String, $gender: String, $species: String) {
    characters(page: $page, filter: { name: $name, status: $status, gender: $gender, species: $species }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

const Home = () => {
  let [pageNumber, updatePageNumber] = useState(1);
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  let [species, SetSpecies] = useState("All");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: pageNumber } // 
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let { info, results } = data.characters;

  const handleSearchValue = (event) => {
    setQuery(event.target.value)
    setQuery(event.target.value.toLowerCase());
  }

  results = [...results].filter((elm) => (
    elm.name.toLowerCase().includes(query)
  ))
  const filterStatus = (status) => {
    setStatus(status)
  }
  if (status) {
    results = status === "All" ? results : [...results].filter((elm) => (
      elm.status === status
    ))
  }

  const filterSpecies = (species) => {
    SetSpecies(species)
  }

  console.log(species);
  if (species) {
    results = species === "All" ? results : [...results].filter((elm) => (
      elm.species === species
    ))
  }
  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search handleSearchValue={handleSearchValue} />
      <div className="container">
        <div className="row">
          <Filter
            pageNumber={pageNumber}
            updatePageNumber={updatePageNumber}
            filterStatus={filterStatus}
            filterSpecies={filterSpecies}
            results={results}
            status={status}
            species={species}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} />
              {
                results.length <= 0 && (
                  <h2 style={{textAlign:"center"}} >Result NOt Found</h2>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
};

export default Home;

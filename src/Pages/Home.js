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
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  let [search, setSearch] = useState("");

  const { loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page: pageNumber, name: search, status, gender, species }
  });

  let { data, inputVal } = useFavouriteContext()
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let results = inputVal ? data : data.results
  let info = data.info
  // const { info, results } = data.characters;
  // console.log(results, info);



  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
      <div className="container">
        <div className="row">
          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} />
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

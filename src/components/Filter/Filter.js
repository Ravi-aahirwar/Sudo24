import React from "react";
import Gender from "./category/Gender";
import Species from "./category/Species";
import Status from "./category/Status";
import { Button } from "bootstrap";

const Filter = ({
  // Filters
  updatePageNumber,
  filterStatus,
  filterSpecies,
  results,
  status,
  species
}) => {
  let clear = () => {
    updatePageNumber(1);
    window.location.reload(false);
  };

  const speciesData = ["All", "Human", "Alien"]
  const statusData = ["All", "Alive", "unknown", "Dead"]


  return (
    <div className="col-lg-3 col-12 mb-5">
      <div className="text-center fw-bold fs-4 mb-2"> {results?.length} Characters are Available. </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={clear}
        className="text-primary text-decoration-underline text-center mb-3"
      >
        Clear Filters
      </div>
      <div>
        {
          statusData.map((elm, i) => {
            return <button key={i}
            style={{margin:"10px", border:"none", padding:"4px 9px", color: elm === status ?"blue":"" }}
              onClick={() => filterStatus(elm)}
            >
              {elm}
            </button>
          })
        }
        <hr/>
        <div>
          {
            speciesData.map((elm, i) => {
              return <button key={i} 
              style={{margin:"10px", border:"none", padding:"4px 9px", color: elm === species ?"blue":"" }}
              onClick={() => filterSpecies(elm)}  >
                {elm}
              </button>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Filter;

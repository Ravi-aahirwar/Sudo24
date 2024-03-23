import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import CardDetails from "./CardDetails";
import { useFavouriteContext } from "../../context/FavouriteContext";

const Card = ({results }) => {
  let display;
  const { addToFavourite } = useFavouriteContext()

  if (results) {
    display = results.map((x) => {
      let { id, image, name, status, location } = x;
      const data = [id, image, name, status, location]
      const handleFavourite = () => {
        addToFavourite(id, data)
      }

      let page = "/"

      // console.log("Dataaaaa===>", id, image, name, status, location)
      return (
        <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
          <div
            className={`${styles.card} d-flex flex-column justify-content-center`}
          >
            <Link
              style={{ textDecoration: "none" }}
              to={`${page}${id}`}
              key={id}
            >
              <img className={`${styles.img} img-fluid`} src={image} alt="" />
            </Link>
            <div className={`${styles.content}`}>
              <div className="fs-5 fw-bold mb-4">{name}</div>
              <div className="">
                <div className="fs-6 fw-normal">Last Location</div>
                <span style={{ color: 'darkblue' }} ><p 
                onClick={handleFavourite}
                style={{cursor:"pointer"}}
                 > Add to Favourite </p></span>
                <div className="fs-5">{location?.name}</div>
              </div>
            </div>
          </div>

          {(() => {
            if (status === "Dead") {
              return (
                <div
                  className={`${styles.badge} position-absolute badge bg-danger`}
                >
                  {status}
                </div>
              );
            } else if (status === "Alive") {
              return (
                <div
                  className={`${styles.badge} position-absolute badge bg-success`}
                >
                  {status}
                </div>
              );
            } else {
              return (
                <div
                  className={`${styles.badge} position-absolute badge bg-secondary`}
                >
                  {status}
                </div>
              );
            }
          })()}
        </div>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return <>{display}</>;
};

export default Card;

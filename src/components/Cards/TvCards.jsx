import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../CardSlider/NextArrow";
import PrevArrow from "../CardSlider/PrevArrow";
import { posterSetting } from "./slickSetting";

import "./TvCards.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { trimShortDesc } from "../../data/methods";
import { tvListFetch } from "../../data/tmdbFetch";

const TvCards = ({ title, api }) => {
  const [tvData, setTvData] = useState([]);

  const settings = {
    ...posterSetting,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const tvData = await tvListFetch(api);
      setTvData(tvData);
    };

    fetchMovies();
  }, []);

  return (
    <div className="slider-container">
      <p className="cards-list-title">{title ? title : "Movie List"}</p>
      <Slider {...settings}>
        {tvData.map((card, index) => (
          <Link to={`/playertv/${card.id}`} key={index}>
            <div className="tv-card-container">
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
                className="tv-card-image"
                style={{ width: "230px", height: "129px" }}
              />
              <div className="tv-card-info">
                <p className="tv-card-info-rating">
                  <span>{card.vote_average.toString().slice(0, 3)}</span>
                </p>
                <h3 className="tv-card-info-title">{card.original_name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default TvCards;

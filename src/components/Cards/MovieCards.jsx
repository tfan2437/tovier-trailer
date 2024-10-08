import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../CardSlider/NextArrow";
import PrevArrow from "../CardSlider/PrevArrow";
import { posterSetting } from "./slickSetting";

import "./MovieCards.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { trimShortDesc } from "../../data/methods";
import { movieListFetch } from "../../data/tmdbFetch";

const MovieCards = ({ title, api }) => {
  const [moviesData, setMoviesData] = useState([]);

  const settings = {
    ...posterSetting,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await movieListFetch(api);
      setMoviesData(moviesData);
    };

    fetchMovies();
  }, []);

  return (
    <div className="slider-container">
      <p className="cards-list-title">{title ? title : "Movie List"}</p>
      <Slider {...settings}>
        {moviesData.map((card, index) => (
          <Link to={`/player/${card.id}`} key={index}>
            <div className="card-container">
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.poster_path}
                alt=""
                className="card-image"
              />
              <div className="card-info">
                <p className="card-info-rating">
                  <span>{card.vote_average.toString().slice(0, 3)}</span>
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                  alt=""
                />
                <h3 className="card-info-title">{card.original_title}</h3>
                <p className="card-info-disc">
                  {trimShortDesc(card.overview, 100)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCards;

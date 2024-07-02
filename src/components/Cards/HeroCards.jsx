// React Slick Import
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../CardSlider/NextArrow";
import PrevArrow from "../CardSlider/PrevArrow";
import { HeroSetting } from "./slickSetting";

import "./HeroCards.css";
import playIcon from "../../assets/icon-play.png";
import infoIcon from "../../assets/icon-info.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { heroMoviesFetch } from "../../data/tmdbFetch";
import { trimDescription } from "../../data/methods";

const HeroCards = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await heroMoviesFetch();
      setMoviesData(moviesData);
    };

    fetchMovies();
  }, []);

  const settings = {
    ...HeroSetting,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="hero-slider-container">
      <Slider {...settings}>
        {moviesData.map((card, index) => (
          <div key={index}>
            <div className="hero-card-container">
              <img
                src={
                  `https://image.tmdb.org/t/p/original/` + card.backdrop_path
                }
                alt=""
                className="hero-card-image"
              />
              <section>
                <h1>{card.original_title}</h1>
                <p>{trimDescription(card.overview, 220)}</p>
                <NavLink to={`/player/${card.id}`} className="hero-btns">
                  <button className="btn">
                    <img src={playIcon} alt="" />
                    Play
                  </button>
                  <button className="btn dark-btn">
                    <img src={infoIcon} alt="" />
                    Info
                  </button>
                </NavLink>
              </section>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCards;

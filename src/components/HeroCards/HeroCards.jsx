import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowLeft from "../../assets/icon-arrow-left.png";
import arrowRight from "../../assets/icon-arrow-right.png";
import playIcon from "../../assets/play_icon.png";
import infoIcon from "../../assets/info_icon.png";
import { NavLink } from "react-router-dom";

import "./HeroCards.css";

import { useState } from "react";
import { useEffect } from "react";

import { heroMoviesFetch } from "../../data/tmdbFetch";

const HeroCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await heroMoviesFetch();
      setApiData(moviesData);
    };

    getMovies();
  }, []);

  // Hero Slider
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <img src={arrowLeft} alt="" className={className} onClick={onClick} />
    );
  };
  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <img src={arrowRight} alt="" className={className} onClick={onClick} />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const trimSentence = (str) => {
    if (str.length <= 200) {
      return str;
    }

    let trimmedStr = str.slice(0, 200);
    const lastPeriodIndex = trimmedStr.lastIndexOf(".");

    if (lastPeriodIndex !== -1) {
      // Trim at the last period
      trimmedStr = trimmedStr.slice(0, lastPeriodIndex + 1);
    } else {
      const lastCommaIndex = trimmedStr.lastIndexOf(",");
      if (lastCommaIndex !== -1) {
        // Trim at the last comma and replace it with a period
        trimmedStr = trimmedStr.slice(0, lastCommaIndex + 1).replace(/,$/, ".");
      } else {
        // If no period or comma, just trim to 100 characters
        trimmedStr = trimmedStr + "..."; // Optionally add ellipsis to indicate truncation
      }
    }

    return trimmedStr;
  };

  return (
    <div className="hero-slider-container">
      <Slider {...settings}>
        {apiData.map((card, index) => (
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
                <p>{trimSentence(card.overview)}</p>
                <NavLink to={`/player/${card.id}`} className="hero-btns">
                  <button className="btn">
                    <img src={playIcon} alt="" />
                    Play
                  </button>
                  <button className="btn dark-btn">
                    <img src={infoIcon} alt="" />
                    More Info
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

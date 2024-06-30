import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopCards.css";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { options } from "../../data/tmdbFetch";

import arrowLeft from "../../assets/icon-arrow-left.png";
import arrowRight from "../../assets/icon-arrow-right.png";

const TopCards = ({ title, api }) => {
  const [apiData, setApiData] = useState([]);

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const moviesData = await movieTrendingFetch();
  //     setApiData(moviesData);
  //   };

  //   getMovies();
  // }, []);

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
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  // TMDB API Category: Movie Lists
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        api ? api : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="slider-container">
      <h1>{title ? title : "List"}</h1>
      <Slider {...settings}>
        {apiData.map((card, index) => (
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
                <p className="card-info-disc">{card.overview.slice(0, 90)}</p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default TopCards;

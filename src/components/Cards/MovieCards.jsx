import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCards.css";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import arrowLeft from "../../assets/icon-arrow-left.png";
import arrowRight from "../../assets/icon-arrow-right.png";

const MovieCards = ({ title, category }) => {
  const cardsData = [
    { title: "Card 1", description: "This is the first card" },
    { title: "Card 2", description: "This is the second card" },
    { title: "Card 3", description: "This is the third card" },
    { title: "Card 4", description: "This is the fourth card" },
    { title: "Card 5", description: "This is the fifth card" },
    { title: "Card 6", description: "This is the sixth card" },
    { title: "Card 7", description: "This is the seventh card" },
    { title: "Card 8", description: "This is the eighth card" },
    { title: "Card 9", description: "This is the nighth card" },
    { title: "Card 10", description: "This is the tenth card" },
  ];

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

  const [apiData, setApiData] = useState([]);

  // TBDB API Authorization
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBhMDUxY2MyYzk3NzViMTZhMDcxM2Y3YTE4MzhjMCIsIm5iZiI6MTcxOTI3OTEzNy41MjYwNDMsInN1YiI6IjY2NzkwMTBhMmRiYzYzOWYxNmY0MGRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WixP3PpUoD7TRB4lFWOGYtPCHeMtjnoGhyS2Uv328iQ",
    },
  };

  // TMDB API Category: Movie Lists
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="slider-container">
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

export default MovieCards;

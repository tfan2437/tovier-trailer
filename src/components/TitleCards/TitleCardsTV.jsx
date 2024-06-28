import "./TitleCards.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  // Horizontal Scroll for Movie Cards
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  // TBDB API Authorization
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBhMDUxY2MyYzk3NzViMTZhMDcxM2Y3YTE4MzhjMCIsIm5iZiI6MTcxOTQ1ODM2Ny4wNDQ0MzgsInN1YiI6IjY2NzkwMTBhMmRiYzYzOWYxNmY0MGRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SgruefkV0ZXKU5KenZisAJMhyT1Hs1Htb-ICEYKrjoM",
    },
  };

  // TMDB API Category: Trending / TV
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    // Horizontal Scroll

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Neoflick"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/playertv/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt=""
            />
            <p>{card.original_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

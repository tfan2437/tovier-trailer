import "./Player.css";
import backArrowIcon from "../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Player = () => {
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const { id } = useParams();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBhMDUxY2MyYzk3NzViMTZhMDcxM2Y3YTE4MzhjMCIsIm5iZiI6MTcxOTI3OTEzNy41MjYwNDMsInN1YiI6IjY2NzkwMTBhMmRiYzYzOWYxNmY0MGRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WixP3PpUoD7TRB4lFWOGYtPCHeMtjnoGhyS2Uv328iQ",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  // const handleNextTrailer = () => {
  //   if(trailerIndex)
  // };

  return (
    <div className="player">
      <NavLink to={"/"}>
        <img src={backArrowIcon} alt="" />
      </NavLink>

      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;

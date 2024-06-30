import "./Player.css";
import backArrowIcon from "../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { options } from "../../data/tmdbFetch";

const PlayerTV = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    // TV Videos
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {apiData?.key !== undefined ? (
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
      ) : (
        <div
          style={{
            position: "relative",
          }}
        >
          <h1
            onClick={() => navigate("/")}
            style={{
              opacity: "0.3",
              position: "absolute",
              left: "50vw",
              top: "50vh",
              transform: "translate(-50%, -50%)",
              fontFamily: "Druk-Wide-Bold",
              zIndex: 20,
              cursor: "pointer",
            }}
          >
            No Related Video
          </h1>
          <LoadingAnimation height={"100vh"} />
        </div>
      )}
    </>
  );
};

export default PlayerTV;

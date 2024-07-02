import "./Player.css";
import backArrowIcon from "../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { movieVideoFetch, tvVideoFetch } from "../../data/tmdbFetch";

const Player = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [videoData, setVideoData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    const videoFetch = async () => {
      const data = await movieVideoFetch(id);
      setVideoData(data);
    };

    videoFetch();
  }, []);

  return (
    <>
      {videoData?.key !== undefined ? (
        <div className="player">
          <NavLink to={"/"}>
            <img src={backArrowIcon} alt="" />
          </NavLink>

          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${videoData.key}`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>
              {videoData.name} - {videoData.type}
            </p>
            <p>{videoData.published_at.slice(0, 10)}</p>
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

export default Player;

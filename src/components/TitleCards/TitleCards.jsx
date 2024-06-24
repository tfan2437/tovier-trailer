import "./TitleCards.css";
import cardsData from "../../assets/cards/cardsData";
import { useRef } from "react";
import { useEffect } from "react";

const TitleCards = ({ title, category }) => {
  // Horizontal Scroll for Movie Cards
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  // Horizontal Scroll for Movie Cards

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Neoflick"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cardsData.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

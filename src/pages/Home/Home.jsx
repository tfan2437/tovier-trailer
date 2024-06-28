import "./Home.css";
import Navbar from "../../layout/Navbar";
import heroBanner from "../../assets/hero_banner.jpg";
import heroTitle from "../../assets/hero_title.png";
import playIcon from "../../assets/play_icon.png";
import infoIcon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import TitleCardsTV from "../../components/TitleCards/TitleCardsTV";

import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={heroBanner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={heroTitle} alt="" className="caption-img" />
          <p>
            Discover his ties to a secret ancient order, a young man living in
            modern Istanbul embarks on a quest to save the city from an immortal
            enemy.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={playIcon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={infoIcon} alt="" />
              More Info
            </button>
          </div>
          <TitleCards className="title-cards" />
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"now_playing"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"top_rated"} />
        <TitleCards title={"Top Pick for You"} category={"upcoming"} />
        <TitleCardsTV />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

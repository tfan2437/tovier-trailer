import "./Home.css";
import Navbar from "../../layout/Navbar";
import heroBanner from "../../assets/hero_banner.jpg";
import heroTitle from "../../assets/hero_title.png";
import playIcon from "../../assets/play_icon.png";
import infoIcon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import TitleCardsTV from "../../components/TitleCards/TitleCardsTV";

import Footer from "../../layout/Footer";
import MovieCards from "../../components/Cards/MovieCards";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import HeroCards from "../../components/HeroCards/HeroCards";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <HeroCards />
      <MovieCards />
      <MovieCards />
      <MovieCards />
      <MovieCards />
      <Footer />
    </div>
  );
};

export default Home;

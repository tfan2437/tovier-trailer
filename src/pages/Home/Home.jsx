import "./Home.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import MovieCards from "../../components/Cards/MovieCards";
import HeroCards from "../../components/HeroCards/HeroCards";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <HeroCards />
      <MovieCards title={"Now Playing"} api={"now_playing"} />
      <MovieCards title={"Upcoming"} api={"upcoming"} />
      <MovieCards />
      <MovieCards />
      <Footer />
    </div>
  );
};

export default Home;

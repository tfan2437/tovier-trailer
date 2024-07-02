import "./Home.css";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import MovieCards from "../../components/Cards/MovieCards";
import HeroCards from "../../components/Cards/HeroCards";
import TvCards from "../../components/Cards/TvCards";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div id="home">
        <HeroCards />
      </div>
      <div id="movies">
        <MovieCards title={"Movies For You"} api={"upcoming"} />
      </div>
      <div id="now-playing">
        <MovieCards title={"Now Playing"} api={"now_playing"} />
      </div>
      <div id="classic">
        <MovieCards title={"Top Rated Classic"} api={"top_rated"} />
      </div>
      <div id="tv-Series">
        <TvCards
          title={"Best Series"}
          api={"tv/top_rated?language=en-US&page=1"}
        />
      </div>
      <div id="trending">
        <TvCards title={"Trending"} api={"trending/tv/day?language=en-US"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

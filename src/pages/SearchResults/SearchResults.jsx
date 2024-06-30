import { Link, useParams } from "react-router-dom";
import "./SearchResults.css";
import Navbar from "../../layout/Navbar";
import { useEffect, useState } from "react";
import { options } from "../../data/tmdbFetch";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Footer from "../../layout/Footer";

const SearchResults = () => {
  const { id } = useParams();
  const keyword = id.replace(/ /g, "%20");

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchMoviesByPage = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=true&language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data.results;
  };

  const searchTvByPage = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${keyword}&include_adult=true&language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data.results;
  };

  const searchMovies = async () => {
    try {
      setIsLoading(true);
      const moviesPage1 = await searchMoviesByPage(1);
      const moviesPage2 = await searchMoviesByPage(2);
      const tvPage1 = await searchTvByPage(1);

      setSearchResults([...moviesPage1, ...moviesPage2, ...tvPage1]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [id]);

  useEffect(() => {
    if (searchResults) {
      console.log(searchResults);
    }
  }, [searchResults]);

  return (
    <div>
      <Navbar />
      <div className="results-container">
        <h2 className="results-title">
          Results of " <span>{id.toUpperCase()}</span> "
        </h2>
        {isLoading ? (
          <LoadingAnimation height={"45vh"} />
        ) : (
          <div className="results-cards">
            {searchResults &&
              searchResults
                .filter((result) => result.backdrop_path) // Filter out items with null backdrop_path
                .map((result, index) => (
                  <div key={index} className="results-card">
                    <Link>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                        alt={result.original_title}
                        className="results-card-image"
                      />
                    </Link>
                    <Link
                      to={
                        result.original_title
                          ? `/player/${result.id}`
                          : `/playertv/${result.id}`
                      }
                      className="results-info"
                    >
                      <div className="results-rate-year">
                        <p>
                          <span>
                            {result.vote_average === null
                              ? "0.0"
                              : result.vote_average.toString().slice(0, 3)}
                          </span>
                        </p>
                        <p>
                          {result.release_date
                            ? result.release_date.slice(0, 4)
                            : ""}
                          {result.first_air_date
                            ? result.first_air_date.slice(0, 4)
                            : ""}
                        </p>
                      </div>
                      <p className="results-movie-name">
                        {result.original_title
                          ? result.original_title
                          : result.original_name}
                      </p>
                    </Link>
                  </div>
                ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;

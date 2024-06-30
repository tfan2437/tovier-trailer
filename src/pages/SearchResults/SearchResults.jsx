import { useParams } from "react-router-dom";
import "./SearchResults.css";
import Navbar from "../../layout/Navbar";
import { useEffect, useState } from "react";
import { options } from "../../data/tmdbFetch";

const SearchResults = () => {
  const { id } = useParams();
  const keyword = id.replace(/ /g, "%20");

  const [searchResults, setSearchResults] = useState();

  const searchMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=true&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchMovie();
  }, [id]);

  useEffect(() => {
    if (searchResults) {
      console.log(searchResults);
    }
  }, [searchResults]);

  return (
    <div>
      <Navbar />
      <h1>Search Results of {id}</h1>
      {searchResults &&
        searchResults.map((result, index) => (
          <div key={index}>
            <p>{result.original_title}</p>
            <img
              src={
                `https://image.tmdb.org/t/p/original/` + result.backdrop_path
              }
              alt=""
              style={{ width: "100px" }}
            />
          </div>
        ))}
    </div>
  );
};

export default SearchResults;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_AUTH_KEY,
  },
};

export const heroMoviesFetch = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (err) {
    console.error(err);
    return [];
  }
};

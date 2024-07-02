export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_AUTH_KEY,
  },
};

export const searchMovie = async (keyword) => {
  keyword = keyword.replace(/ /g, "%20");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=true&language=en-US&page=1`,
      options
    );

    const data = await response.json();
    console.log(data.results.slice(0, 11));
    return data.results.slice(0, 11);
  } catch (err) {
    console.error(err);
    return [];
  }
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

export const topMoviesFetch = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      options
    );
    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const movieListFetch = async (api) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${api}?language=en-US&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const tvListFetch = async (api) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${api}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const movieVideoFetch = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    return data.results[0];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const tvVideoFetch = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    return data.results[0];
  } catch (err) {
    console.error(err);
    return [];
  }
};

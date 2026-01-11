const API_KEY = "420d2a38";

const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
  const data = await res.json();
  return data.Search || [];
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  return await res.json();
}

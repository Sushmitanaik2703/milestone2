import { useEffect, useState } from "react";
import { searchMovies } from "../utils/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import "./Home.css";

function Home() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  useEffect(() => {
    fetchMovies(true);
  }, [query]);

  const fetchMovies = async (reset = false) => {
    setLoading(true);
    const data = await searchMovies(query, reset ? 1 : page);

    if (data.length === 0) setHasMore(false);

    if (reset) {
      setMovies(data);
      setBannerMovie(data[0]);
      setPage(2);
    } else {
      setMovies((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        fetchMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const toggleFavorite = (movie) => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favs.find((m) => m.imdbID === movie.imdbID);

    if (exists) {
      favs = favs.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      favs.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorites(favs);
  };

  const isFavorite = (id) => favorites.some((m) => m.imdbID === id);

  return (
    <div className="home-page">

      {/* 🔍 SEARCH BAR */}
      <div className="search-wrapper">
        <input
          type="text"
          className="search-bar"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => {
            setMovies([]);
            setHasMore(true);
            setPage(1);
            setQuery(e.target.value);
          }}
        />
      </div>

      {/* 🎥 NETFLIX STYLE BANNER */}
      <Banner movie={bannerMovie} />

      {/* 🎬 MOVIE GRID */}
      <h2 className="section-title">Popular Movies</h2>

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </Link>

            <button
              className={`fav-btn ${isFavorite(movie.imdbID) ? "added" : ""}`}
              onClick={() => toggleFavorite(movie)}
            >
              {isFavorite(movie.imdbID) ? "✓ Added" : "♡ Add to Favorites"}
            </button>
          </div>
        ))}
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default Home;

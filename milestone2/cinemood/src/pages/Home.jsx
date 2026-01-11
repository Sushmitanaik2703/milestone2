import { useEffect, useState } from "react";
import { searchMovies } from "../utils/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "./Home.css";

function Home() {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("marvel");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBanner();
    loadMovies(1);
  }, []);

  const loadBanner = async () => {
    const data = await searchMovies("avengers", 1);
    setBannerMovies(data.slice(0, 5));
  };

  const loadMovies = async (p) => {
    setLoading(true);
    const data = await searchMovies(query, p);
    setMovies(prev => (p === 1 ? data : [...prev, ...data]));
    setLoading(false);
  };

  // Auto banner slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === bannerMovies.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerMovies]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) loadMovies(page);
  }, [page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    loadMovies(1);
  };

  const banner = bannerMovies[currentIndex];

  return (
    <div className="home-page">

      {/* SEARCH */}
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      {/* BANNER */}
      {banner && (
        <div
          className="hero"
          style={{ backgroundImage: `url(${banner.Poster})` }}
        >
          <div className="overlay">
            <h1>{banner.Title}</h1>
            <p>{banner.Year}</p>
          </div>
        </div>
      )}

      <h2 className="section-title">Popular Movies</h2>

      <div className="movies-grid">
        {movies.map(movie => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Title}</p>
            </div>
          </Link>
        ))}
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default Home;

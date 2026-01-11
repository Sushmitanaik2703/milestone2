import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../utils/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    fetchMovie();
    checkFav();
  }, [id]);

  const fetchMovie = async () => {
    const data = await getMovieDetails(id);
    setMovie(data);
  };

  const checkFav = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favs.some((m) => m.imdbID === id));
  };

  const toggleFav = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFav) {
      favs = favs.filter((m) => m.imdbID !== id);
    } else {
      favs.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFav(!isFav);
  };

  if (!movie) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div
      className="details-hero"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(2,6,23,0.95), rgba(2,6,23,0.4)), url(${movie.Poster})`
      }}
    >
      <div className="details-card">
        <img src={movie.Poster} alt={movie.Title} />

        <div className="details-info">
          <h1>{movie.Title}</h1>
          <p className="meta">
            {movie.Year} • {movie.Runtime} • ⭐ {movie.imdbRating}
          </p>
          <p className="genre">{movie.Genre}</p>

          <p className="plot">{movie.Plot}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>

          <button
            className={`fav-btn ${isFav ? "added" : ""}`}
            onClick={toggleFav}
          >
            {isFav ? "✓ Remove from Favorites" : "♡ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

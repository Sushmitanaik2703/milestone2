import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie, favorites, toggleFavorite }) {
  const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="movie-link">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="movie-poster"
        />

        <div className="movie-info">
          <h3 className="movie-title">{movie.Title}</h3>
          <p className="movie-year">{movie.Year}</p>
        </div>
      </Link>

      <button
        className={`fav-btn ${isFavorite ? "added" : ""}`}
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? "✓ Added" : "♡ Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieCard;

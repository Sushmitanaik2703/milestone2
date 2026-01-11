import { Link } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="card-link">
      <div className="movie-card">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
        />
        <h4>{movie.Title}</h4>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}

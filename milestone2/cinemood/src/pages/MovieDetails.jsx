import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../utils/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="details-text">
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <p><b>Genre:</b> {movie.Genre}</p>
        <p><b>Actors:</b> {movie.Actors}</p>
        <p><b>Rating:</b> {movie.imdbRating}</p>
        <button
          onClick={() => {
            const favs = JSON.parse(localStorage.getItem("favorites")) || [];
            if (!favs.find(m => m.imdbID === movie.imdbID)) {
              favs.push(movie);
              localStorage.setItem("favorites", JSON.stringify(favs));
            }
          }}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
}

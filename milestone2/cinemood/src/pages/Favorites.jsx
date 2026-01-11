import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  return (
    <div className="favorites-container">
      <h2>My Favorites ❤️</h2>
      <div className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

import MovieCard from "./MovieCard";
import "./MovieCarousel.css";

export default function MovieCarousel({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="carousel-section">
      <h3>{title}</h3>

      <div className="carousel">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

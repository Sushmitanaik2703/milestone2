import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  const remove = (id) => {
    const updated = favorites.filter((m) => m.imdbID !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="fav-page">
      <h2>My List 🎬</h2>

      <div className="fav-grid">
        {favorites.map((m) => (
          <div key={m.imdbID} className="fav-card">
            <Link to={`/movie/${m.imdbID}`}>
              <img src={m.Poster} alt={m.Title} />
              <h3>{m.Title}</h3>
            </Link>

            <button className="remove-btn" onClick={() => remove(m.imdbID)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

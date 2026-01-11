import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="navbar">
      <h2 className="logo">CineMood 🎬</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀ " : "🌙 "}
        </button>
      </div>
    </nav>
  );
}

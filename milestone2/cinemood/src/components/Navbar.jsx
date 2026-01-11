import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff"
      }}
    >
      <h2>Cinemood</h2>
      <div>
        <Link
          to="/"
          style={{
            marginRight: "15px",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
}

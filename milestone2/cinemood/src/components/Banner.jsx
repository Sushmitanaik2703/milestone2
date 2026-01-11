import { motion } from "framer-motion";
import "./Banner.css";

export default function Banner({ movie }) {
  if (!movie) return null;

  return (
    <motion.div
      className="banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="banner-bg"
      />

      <div className="banner-overlay">
        <h1>{movie.Title}</h1>
        <p>{movie.Plot}</p>
      </div>
    </motion.div>
  );
}

import React from "react";
import { useAuth } from "./AuthContext.jsx";
import { useWatchlist } from "./WatchlistContext.jsx";
import { Link } from "react-router-dom";
import "../blocks/watchlistButton.css";

export default function WatchlistButton({ movieId, size = "sm" }) {
  const { user } = useAuth();
  const { inWatch, toggle } = useWatchlist();
  const active = user ? inWatch(movieId) : false;
  const cls = `wlbtn wlbtn--${size} ${active ? "is-active" : ""}`;

  if (!user) {
    return (
      <Link to="/login" className={cls} title="Inicia sesión para ver después">
        ＋ Ver después
      </Link>
    );
  }
  return (
    <button
      className={cls}
      onClick={() => toggle(movieId)}
      aria-pressed={active}
    >
      {active ? "✓ En ver después" : "＋ Ver después"}
    </button>
  );
}

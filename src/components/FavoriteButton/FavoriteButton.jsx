import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { Link } from "react-router-dom";
import "../../blocks/favoriteButton.css";

export default function FavoriteButton({ movieId, size = "sm" }) {
  const { user } = useAuth();
  const { isFav, toggle } = useFavorites();
  const active = user ? isFav(movieId) : false;

  const cls = `favbtn favbtn--${size} ${active ? "is-active" : ""}`;

  if (!user) {
    return (
      <Link
        to="/login"
        className={cls}
        title="Inicia sesión para guardar favoritos"
      >
        ☆ Guardar
      </Link>
    );
  }

  return (
    <button
      className={cls}
      onClick={() => toggle(movieId)}
      aria-pressed={active}
    >
      {active ? "★ En favoritos" : "☆ Guardar"}
    </button>
  );
}

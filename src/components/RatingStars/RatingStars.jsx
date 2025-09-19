import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRatings } from "../../context/RatingsContext";
import "../../blocks/ratingStars.css";

export default function RatingStars({ movieId, size = "md" }) {
  const { user } = useAuth();
  const { get, set } = useRatings();
  const val = user ? get(movieId) : 0;

  const onSet = (n) => user && set(movieId, n);

  return (
    <div
      className={`rstars rstars--${size}`}
      role="radiogroup"
      aria-label="Mi calificación"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`rstars__star ${val >= n ? "is-on" : ""}`}
          onClick={() => onSet(n)}
          aria-checked={val === n}
          role="radio"
          title={user ? `${n} estrellas` : "Inicia sesión para calificar"}
          disabled={!user}
        >
          ★
        </button>
      ))}
      {val > 0 && user && (
        <button
          type="button"
          className="rstars__clear"
          onClick={() => onSet(0)}
          title="Quitar calificación"
        >
          ×
        </button>
      )}
    </div>
  );
}

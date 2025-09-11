import React, { useState, useEffect, useRef } from "react";
import "./MovieCard.css";
import { getMovieVideos } from "../../utils/api";

export default function MovieCard({ movie }) {
  const [open, setOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const timerRef = useRef(null);

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='342' height='513'%3E%3Crect width='100%25' height='100%25' fill='%23222222'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' text-anchor='middle' dy='.3em' font-family='sans-serif'%3ESin%20poster%3C/text%3E%3C/svg%3E";

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      try {
        const data = await getMovieVideos(movie.id);
        const yt =
          (data?.results || []).find(
            (v) =>
              v.site === "YouTube" &&
              /trailer|tráiler/i.test(v.type || "") &&
              v.key
          ) || (data?.results || []).find((v) => v.site === "YouTube" && v.key);
        if (alive && yt?.key) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${yt.key}`);
        } else if (alive) {
          setTrailerUrl("");
        }
      } catch {
        if (alive) setTrailerUrl("");
      }
    })();
    return () => {
      alive = false;
    };
  }, [open, movie?.id]);

  const onEnter = () => {
    timerRef.current = setTimeout(() => setOpen(true), 160);
  };
  const onLeave = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
  };

  return (
    <div className="mc" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <img
        className="mc__poster"
        src={poster}
        alt={movie.title}
        loading="lazy"
      />
      <h3 className="mc__title">{movie.title}</h3>

      {open && (
        <div
          className="mc__modal"
          role="dialog"
          aria-label={`Vista previa de ${movie.title}`}
        >
          <div className="mc__modal__content">
            <div className="mc__modal__header">
              <strong className="mc__modal__title">{movie.title}</strong>
              <button
                className="mc__modal__close"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            {movie.overview && (
              <p className="mc__modal__overview">{movie.overview}</p>
            )}
            <div className="mc__modal__actions">
              <button
                className="mc__btn mc__btn--primary"
                onClick={() => {
                  const q = encodeURIComponent(`${movie.title} trailer`);
                  window.open(
                    trailerUrl ||
                      `https://www.youtube.com/results?search_query=${q}`,
                    "_blank"
                  );
                }}
              >
                ▶ Reproducir tráiler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

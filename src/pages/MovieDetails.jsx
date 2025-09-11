import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../utils/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [d, v] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
        ]);
        if (!alive) return;
        setMovie(d);
        const yt =
          (v?.results || []).find(
            (x) =>
              x.site === "YouTube" &&
              /trailer|tráiler/i.test(x.type || "") &&
              x.key
          ) || (v?.results || []).find((x) => x.site === "YouTube" && x.key);
        if (yt?.key) setTrailerUrl(`https://www.youtube.com/watch?v=${yt.key}`);
      } catch (e) {
        /* noop */
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (!movie)
    return (
      <main className="md">
        <p>Cargando…</p>
      </main>
    );

  const bg = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <main className="md">
      <section
        className="md__hero"
        style={bg ? { backgroundImage: `url(${bg})` } : {}}
      >
        <div className="md__overlay">
          <h1 className="md__title">{movie.title}</h1>
          {movie.overview && <p className="md__overview">{movie.overview}</p>}
          <div className="md__actions">
            <button
              className="md__btn md__btn--primary"
              onClick={() =>
                window.open(
                  trailerUrl ||
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                      movie.title + " trailer"
                    )}`,
                  "_blank"
                )
              }
            >
              ▶ Ver tráiler
            </button>
            <Link to="/movies" className="md__btn">
              Volver a Películas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

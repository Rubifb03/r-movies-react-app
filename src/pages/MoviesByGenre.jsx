import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMoviesByGenre } from "../utils/api";
import "./MoviesByGenre.css";
import MovieCard from "../components/MovieCard/MovieCard";

const GENRE_MAP = {
  action: { id: 28, name: "Acción" },
  adventure: { id: 12, name: "Aventura" },
  animation: { id: 16, name: "Animación" },
  comedy: { id: 35, name: "Comedia" },
  crime: { id: 80, name: "Crimen" },
  documentary: { id: 99, name: "Documental" },
  drama: { id: 18, name: "Drama" },
  family: { id: 10751, name: "Familia" },
  fantasy: { id: 14, name: "Fantasía" },
  history: { id: 36, name: "Historia" },
  horror: { id: 27, name: "Terror" },
  music: { id: 10402, name: "Música" },
  mystery: { id: 9648, name: "Misterio" },
  romance: { id: 10749, name: "Romance" },
  scifi: { id: 878, name: "Ciencia ficción" },
  thriller: { id: 53, name: "Thriller" },
  war: { id: 10752, name: "Guerra" },
  western: { id: 37, name: "Western" },
  // alias convenientes:
  "science-fiction": { id: 878, name: "Ciencia ficción" },
};

export default function MoviesByGenre() {
  const { genre } = useParams(); // ej: "action"
  const navigate = useNavigate();

  const meta = useMemo(() => GENRE_MAP[genre?.toLowerCase?.() || ""], [genre]);

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  // resetear al cambiar de género
  useEffect(() => {
    setPage(1);
    setMovies([]);
    setError("");
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!meta) {
      setLoading(false);
      setError("Género no válido");
      return;
    }

    (async () => {
      try {
        const data = await getMoviesByGenre(meta.id, 1);
        setMovies(data?.results || []);
      } catch (e) {
        setError("No se pudieron cargar las películas por género.");
      } finally {
        setLoading(false);
      }
    })();
  }, [meta]);

  const loadMore = async () => {
    if (!meta) return;
    setLoadingMore(true);
    try {
      const next = page + 1;
      const data = await getMoviesByGenre(meta.id, next);
      setMovies((prev) => [...prev, ...(data?.results || [])]);
      setPage(next);
    } catch {
      // opcional: mensaje
    } finally {
      setLoadingMore(false);
    }
  };

  if (!meta) {
    return (
      <main className="mg">
        <h1 className="mg__title">Género no válido</h1>
        <p className="mg__hint">Prueba con:</p>
        <div className="mg__chips">
          {["action", "comedy", "drama", "horror", "romance", "scifi"].map(
            (g) => (
              <Link key={g} to={`/movies/${g}`} className="chip">
                {g}
              </Link>
            )
          )}
        </div>
        <p>
          <button className="mg__btn" onClick={() => navigate(-1)}>
            Volver
          </button>
        </p>
      </main>
    );
  }

  const featured = movies[0];
  const backdrop = featured?.backdrop_path || featured?.poster_path;
  const bgUrl = backdrop
    ? `url(https://image.tmdb.org/t/p/original${backdrop})`
    : "none";

  return (
    <main className="mg">
      <section className="mg__hero" style={{ backgroundImage: bgUrl }}>
        <div className="mg__hero-overlay">
          <h1 className="mg__title">{meta.name}</h1>
          {featured?.overview && (
            <p className="mg__desc">{featured.overview}</p>
          )}
          <div className="mg__actions">
            <Link to="/movies" className="mg__btn">
              Ver populares
            </Link>
          </div>
        </div>
      </section>

      {loading && <p className="mg__state">Cargando…</p>}
      {error && <p className="mg__error">{error}</p>}

      {!loading && !error && (
        <>
          <section className="mg__grid">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </section>
          <div className="mg__more">
            <button
              className="mg__btn"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Cargando…" : "Cargar más"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

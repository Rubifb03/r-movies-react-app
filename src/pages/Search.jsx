import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../utils/api";
import "./Search.css";
import MovieCard from "../components/MovieCard/MovieCard";
import FavoriteButton from "../components/FavoriteButton/FavoriteButton";
import WatchlistButton from "../context/WatchlistButton";
import RatingStars from "../components/RatingStars/RatingStars";
import { useAuth } from "../context/AuthContext";
import { getHistory, pushHistory, clearHistory } from "../utils/userdata";

function Search() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") || "";
  const [query, setQuery] = useState(initial);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [history, setHistory] = useState(getHistory(user?.id));

  async function doSearch(q) {
    const term = q.trim();
    if (!term) {
      setResults([]);
      setErr("");
      return;
    }
    try {
      setLoading(true);
      setErr("");
      const data = await searchMovies(term, 1);
      setResults(data.results || []);
      setHistory(pushHistory(user?.id, term));
    } catch (e) {
      console.error(e);
      setErr("No se pudo realizar la búsqueda");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setHistory(getHistory(user?.id));
  }, [user]);

  useEffect(() => {
    if (initial) doSearch(initial);
  }, [initial]);

  const onSubmit = (e) => {
    e.preventDefault();
    setParams(query ? { q: query } : {});
    doSearch(query);
  };

  return (
    <main className="search">
      <h1 className="search__title">Buscar películas</h1>

      <form className="search__form" onSubmit={onSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Escribe el título..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar películas por título"
        />
        <button className="search__btn" type="submit">
          Buscar
        </button>
      </form>

      {/* Historial */}
      {history?.length > 0 && (
        <div className="search__history">
          <div className="search__history-head">
            <span>Busquedas recientes:</span>
            <button
              className="search__history-clear"
              onClick={() => {
                clearHistory(user?.id);
                setHistory([]);
              }}
            >
              Limpiar
            </button>
          </div>
          <div className="search__history-chips">
            {history.map((h) => (
              <button
                key={h}
                className="search__chip"
                onClick={() => {
                  setQuery(h);
                  setParams({ q: h });
                  doSearch(h);
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p className="search__state">Buscando…</p>}
      {err && <p className="search__error">{err}</p>}

      {!loading && !err && results.length === 0 && initial && (
        <p className="search__state">
          No se encontraron resultados para “{initial}”.
        </p>
      )}

      {/* === Tarjetas simples con acciones (incluye Favoritos) === */}
      <section className="search__grid">
        {results.map((m) => (
          <article key={m.id} className="search__card">
            <img
              className="search__poster"
              loading="lazy"
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                  : "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='342' height='513'%3E%3Crect width='100%25' height='100%25' fill='%23222222'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' text-anchor='middle' dy='.3em' font-family='sans-serif'%3ESin%20poster%3C/text%3E%3C/svg%3E"
              }
              alt={m.title}
            />
            <h3 className="search__name">{m.title}</h3>

            <div className="search__actions">
              <button
                className="search__btn--trailer"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                      `${m.title} trailer`
                    )}`,
                    "_blank"
                  )
                }
              >
                Ver tráiler
              </button>
              <Link to={`/movie/${m.id}`} className="search__btn--more">
                Detalles
              </Link>
              <FavoriteButton movieId={m.id} />
              <WatchlistButton movieId={m.id} />
              <RatingStars movieId={m.id} size="sm" />
            </div>
          </article>
        ))}
      </section>

      <section className="search__grid" style={{ display: "none" }}>
        {results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </section>
    </main>
  );
}

export default Search;

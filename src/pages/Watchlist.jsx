import React, { useEffect, useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { getMovieDetails } from "../utils/api";
import MovieCard from "../components/MovieCard/MovieCard";
import "../blocks/watchlist.css";

export default function Watchlist() {
  const { ids } = useWatchlist();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const out = [];
        for (const id of ids) {
          try {
            out.push(await getMovieDetails(id));
          } catch {}
        }
        if (alive) setMovies(out);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [ids]);

  return (
    <main className="watchlist">
      <h1 className="watchlist__title">Mi lista para ver después</h1>

      {loading && <p className="watchlist__state">Cargando…</p>}
      {!loading && ids.length === 0 && (
        <p className="watchlist__state">Aún no añadiste películas.</p>
      )}

      {!loading && ids.length > 0 && (
        <section className="watchlist__grid">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </section>
      )}
    </main>
  );
}

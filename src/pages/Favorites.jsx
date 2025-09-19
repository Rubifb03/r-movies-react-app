import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { getMovieDetails } from "../utils/api";
import MovieCard from "../components/MovieCard/MovieCard";
import "../blocks/favorites.css";

export default function Favorites() {
  const { user } = useAuth();
  const { ids } = useFavorites();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const out = [];
        for (const id of ids) {
          try {
            const d = await getMovieDetails(id);
            out.push(d);
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
    <main className="favs">
      <h1 className="favs__title">
        Mis favoritos {user ? `— ${user.name || user.email}` : ""}
      </h1>

      {loading && <p className="favs__state">Cargando…</p>}
      {!loading && ids.length === 0 && (
        <p className="favs__state">
          No tienes favoritos aún. Ve a Películas y agrega algunos.
        </p>
      )}

      {!loading && ids.length > 0 && (
        <section className="favs__grid">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </section>
      )}
    </main>
  );
}

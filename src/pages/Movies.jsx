import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../utils/api";
import "./Movies.css";
import MovieCard from "../components/MovieCard/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data?.results || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("No se pudieron cargar las películas.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <main className="movies">
        <p>Cargando películas...</p>
      </main>
    );
  if (errorMsg)
    return (
      <main className="movies">
        <p>{errorMsg}</p>
      </main>
    );
  if (!movies.length)
    return (
      <main className="movies">
        <p>No hay películas para mostrar</p>
      </main>
    );

  const featuredMovie = movies[0] || {};
  const backdrop =
    featuredMovie.backdrop_path || featuredMovie.poster_path || "";
  const bgUrl = backdrop
    ? `url(https://image.tmdb.org/t/p/original${backdrop})`
    : "none";

  return (
    <main className="movies">
      <section className="movies__hero" style={{ backgroundImage: bgUrl }}>
        <div className="movies__hero-overlay">
          <h1 className="movies__hero-title">
            {featuredMovie.title || "Sin título"}
          </h1>
          {featuredMovie.overview && (
            <p className="movies__hero-desc">{featuredMovie.overview}</p>
          )}
          <div className="movies__hero-buttons">
            <button
              className="movies__btn movies__btn--play"
              disabled={!featuredMovie.title}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    (featuredMovie.title || "") + " trailer"
                  )}`,
                  "_blank"
                )
              }
            >
              ▶ Reproducir
            </button>
            <button className="movies__btn movies__btn--info">
              Más información
            </button>
          </div>
        </div>
      </section>

      <section className="movies__grid">
        {movies.slice(1, 13).map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </section>
    </main>
  );
}

export default Movies;

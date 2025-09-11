import React, { useEffect, useState } from "react";
import "./Main.css";
import { use } from "react";
import { getPopularMovies } from "../../utils/api";
import { Link } from "react-router-dom";

function Main() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPopularMovies();
        setPopular(data?.results?.slice(0, 8) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">
            Bienvenido a <span>R-Movies</span>
          </h1>
          <p className="main__subtitle">
            Explora estrenos, tendencias y clásicos. ¿Listo para maratonear?
          </p>
          <div className="main__cta">
            <Link to="/movies" className="btn btn--primary">
              Ver todas las peliculas
            </Link>
            <Link to="/movies" className="btn btn--ghost">
              Buscar por título
            </Link>
          </div>
          <p className="main__hint">
            Tip: entra a <Link to="/movies">Películas</Link> para la lista
            completa.
          </p>
        </div>
      </section>
      <section className="main__section">
        <div className="main__section-head">
          <h2>Populares ahora</h2>
          <Link to="/movies" className="link">
            Ver más
          </Link>
        </div>

        {loading ? (
          <div className="grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card card--skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid">
            {popular.map((m) => (
              <Link
                to={`/movie/${m.id}`}
                key={m.id}
                className="card"
                title={m.title}
              >
                <img
                  className="card__img"
                  loading="lazy"
                  src={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                      : "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='342' height='513'%3E%3Crect width='100%25' height='100%25' fill='%23222222'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' text-anchor='middle' dy='.3em' font-family='sans-serif'%3EPoster no disponible%3C/text%3E%3C/svg%3E"
                  }
                  alt={m.title}
                />
                <h3 className="card__title">{m.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section className="main__section">
        <div className="main__section-head">
          <h2>Explorar por género</h2>
        </div>
        <div className="chips">
          <Link to="/movies/action" className="chip">
            Acción
          </Link>
          <Link to="/movies/comedy" className="chip">
            Comedia
          </Link>
          <Link to="/movies/drama" className="chip">
            Drama
          </Link>
          <Link to="/movies/horror" className="chip">
            Terror
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Main;

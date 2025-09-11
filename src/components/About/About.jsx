import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <div className="about__logo">R</div>
        <div>
          <h1 className="about__title">Sobre R-Movies</h1>
          <p className="about__subtitle">
            Un explorador de películas hecho con React, que consume la API de
            TMDB para mostrar populares, búsqueda por título y detalles con
            acceso rápido a tráilers.
          </p>
          <div className="about__cta">
            <Link to="/movies" className="btn btn--primary">
              Ver películas
            </Link>
            <Link to="/search" className="btn btn--ghost">
              Buscar por título
            </Link>
          </div>
        </div>
      </section>

      <section className="about__grid">
        <article className="about__card">
          <h2>¿Qué es este proyecto?</h2>
          <p>
            Es una SPA (Single Page Application) construida con React + React
            Router. Muestra listados, permite buscar, ver detalles y reproducir
            tráilers en YouTube.
          </p>
          <ul className="about__list">
            <li>Home con “Populares ahora”.</li>
            <li>
              Listado general y por género (rutas como{" "}
              <code>/movies/action</code>).
            </li>
            <li>
              Búsqueda en español (<code>language=es-ES</code>).
            </li>
            <li>
              Tarjetas con “hover modal” para ver sinopsis y abrir el tráiler.
            </li>
            <li>
              Pantalla de detalle: <code>/movie/:id</code>.
            </li>
          </ul>
        </article>

        <article className="about__card">
          <h2>Tecnologías</h2>
          <ul className="about__tags">
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
            <li>TMDB API</li>
            <li>CSS modular</li>
          </ul>
        </article>

        <article className="about__card">
          <h2>Privacidad & Datos</h2>
          <p>
            La app no almacena datos personales. Solo consume datos públicos de
            TMDB (títulos, posters, sinopsis, etc.). Al abrir tráilers, te lleva
            a YouTube en una nueva pestaña.
          </p>
          <p className="about__disclaimer">
            Usa la API de TMDB pero{" "}
            <strong>no está avalada ni certificada por TMDB</strong>.
          </p>
          <p>
            Fuente de datos:{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              The Movie Database (TMDB)
            </a>
            .
          </p>
        </article>

        <article className="about__card">
          <h2>Roadmap</h2>
          <ul className="about__list">
            <li>∞ Scroll/paginación en listado y categorías.</li>
            <li>Favoritos / Watchlist en localStorage.</li>
            <li>Filtros por año, rating y orden.</li>
          </ul>
        </article>

        <article className="about__card">
          <h2>Contacto</h2>
          <p>
            ¿Ideas o bugs? Escríbeme:{" "}
            <a href="mailto:tucorreo@ejemplo.com">rubifloreano912@gmail.com</a>
          </p>
          <div className="about__cta">
            <Link to="/" className="btn">
              Ir al inicio
            </Link>
            <Link to="/movies" className="btn">
              Explorar películas
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

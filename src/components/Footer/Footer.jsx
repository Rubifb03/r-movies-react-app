import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">R</span>
          <div className="footer__meta">
            <strong>R-Movies</strong>
            <small>Explora, busca y maratonea</small>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Enlaces">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          <a
            href="https://developer.themoviedb.org/reference/intro/getting-started"
            target="_blank"
            rel="noreferrer"
          >
            API
          </a>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            React
          </a>
        </nav>

        <div className="footer__copy">
          <p>© {new Date().getFullYear()} R-Movies. Hecho por Rubí Floreano.</p>
          <p className="footer__disclaimer">
            Este producto usa la API de TMDB pero no está avalado ni certificado
            por TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState } from "react";
import "../../blocks/Header.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import House from "../../assets/images/house.png";
import Search from "../../assets/images/search.png";
import MoviesIcon from "../../assets/images/clapperboard.png";
import Aboutme from "../../assets/images/user-round.png";
import CategoriesIcon from "../../assets/images/categories.png";
import { useAuth } from "../../context/AuthContext.jsx";
import Watchlist from "../../pages/Watchlist.jsx";

function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = async () => {
    await logout();
    nav("/");
  };

  return (
    <header className="header">
      <div className="header__logo">R</div>

      <nav className="header__nav">
        <NavLink to="/" className="header__link" title="Inicio">
          <img src={House} alt="Inicio" className="header__icon" />
        </NavLink>

        <NavLink to="/movies" className="header__link" title="Películas">
          <img src={MoviesIcon} alt="Películas" className="header__icon" />
        </NavLink>

        <div className="header__categories">
          <button
            className="header__button"
            onClick={() => setShowCategories((v) => !v)}
            aria-expanded={showCategories}
            aria-controls="cats"
            title="Categorías"
          >
            <img
              src={CategoriesIcon}
              alt="Categorías"
              className="header__icon"
            />
          </button>
          {showCategories && (
            <div className="header__dropdown">
              <NavLink to="/movies/action" className="header__dropdown-link">
                Acción
              </NavLink>
              <NavLink to="/movies/comedy" className="header__dropdown-link">
                Comedia
              </NavLink>
              <NavLink to="/movies/drama" className="header__dropdown-link">
                Drama
              </NavLink>
              <NavLink to="/movies/horror" className="header__dropdown-link">
                Terror
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/search" className="header__link">
          <img src={Search} alt="Buscar" className="header__icon" />
        </NavLink>

        <NavLink to="/about" className="header__link">
          <img src={Aboutme} alt="Sobre mí" className="header__icon" />
        </NavLink>

        <div className="header__user">
          {user ? (
            <>
              <Link to="/favorites" className="header__pill">
                Favoritos
              </Link>
              <Link
                to="/watchlist"
                className="header__pill"
                title="Ver después"
              >
                Ver después
              </Link>
              <Link to="/profile" className="header__pill">
                {user.name || user.email}
              </Link>
              <button
                className="header__pill header__pill--danger"
                onClick={doLogout}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__pill">
                Entrar
              </Link>
              <Link to="/register" className="header__pill">
                Registrate
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

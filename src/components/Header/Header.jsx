import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import House from "../../assets/images/house.png";
import Search from "../../assets/images/search.png";
import MoviesIcon from "../../assets/images/clapperboard.png";
import Aboutme from "../../assets/images/user-round.png";
import CategoriesIcon from "../../assets/images/categories.png";

function Header() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <header className="header">
      <div className="header__logo">R</div>

      <nav className="header__nav">
        <NavLink to="/" className="header__link">
          <img src={House} alt="Inicio" className="header__icon" />
        </NavLink>

        <NavLink to="/movies" className="header__link">
          <img src={MoviesIcon} alt="Películas" className="header__icon" />
        </NavLink>

        <div className="header__categories">
          <button
            className="header__button"
            onClick={() => setShowCategories((v) => !v)}
            aria-expanded={showCategories}
            aria-controls="cats"
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
      </nav>
    </header>
  );
}

export default Header;

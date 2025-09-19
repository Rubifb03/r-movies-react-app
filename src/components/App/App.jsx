import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../../pages/Movies";
import Search from "../../pages/Search";
import MovieDetails from "../../pages/MovieDetails.jsx";
import MoviesByGenre from "../../pages/MoviesByGenre.jsx";
import About from "../About/About.jsx";
import Register from "../../pages/Register.jsx";
import Login from "../../pages/Login.jsx";
import Profile from "../../pages/Profile.jsx";
import Favorites from "../../pages/Favorites.jsx";
import AuthProvider, { useAuth } from "../../context/AuthContext.jsx";
import FavoritesProvider from "../../context/FavoritesContext.jsx";
import WatchlistProvider from "../../context/WatchlistContext.jsx";
import RatingsProvider from "../../context/RatingsContext.jsx";
import Watchlist from "../../pages/Watchlist.jsx";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <main>Cargando…</main>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RatingsProvider>
          <WatchlistProvider>
            <FavoritesProvider>
              <div>
                <Header />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/movies/:genre" element={<MoviesByGenre />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />

                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />

                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <PrivateRoute>
                        <Favorites />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </div>
            </FavoritesProvider>
          </WatchlistProvider>
        </RatingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

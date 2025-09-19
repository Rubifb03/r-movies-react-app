import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { useRatings } from "../context/RatingsContext";
import { getHistory } from "../utils/userdata";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { ids: favIds } = useFavorites();
  const { ids: wlIds } = useWatchlist();
  const { ratings } = useRatings();

  const history = useMemo(() => getHistory(user?.id), [user]);
  const ratingsCount = Object.keys(ratings || {}).length;

  if (!user)
    return (
      <main className="auth">
        <div className="auth__card">Inicia sesión</div>
      </main>
    );

  return (
    <main className="auth">
      <div className="profile__card">
        <h1 className="profile__title">Mi perfil</h1>

        <div className="profile__grid">
          <div>
            <div className="profile__subtitle">Información</div>
            <div className="profile__form auth__form">
              <input
                className="auth__input"
                defaultValue={user.name}
                onBlur={(e) => updateProfile({ name: e.target.value })}
                placeholder="Nombre"
              />
              <input
                className="auth__input"
                defaultValue={user.email}
                onBlur={(e) => updateProfile({ email: e.target.value })}
                placeholder="Correo"
              />
            </div>
          </div>

          <div>
            <div className="profile__subtitle">Resumen</div>
            <ul className="profile__stats">
              <li className="profile__stat">
                <span>Favoritos</span>
                <b>{favIds.length}</b>
              </li>
              <li className="profile__stat">
                <span>Ver después</span>
                <b>{wlIds.length}</b>
              </li>
              <li className="profile__stat">
                <span>Calificaciones</span>
                <b>{ratingsCount}</b>
              </li>
            </ul>
          </div>
        </div>

        <div className="profile__divider"></div>

        <div className="profile__history">
          <div className="profile__subtitle">Búsquedas recientes</div>
          {!history || history.length === 0 ? (
            <p className="auth__hint">Aún no hay historial.</p>
          ) : (
            <div className="profile__chips">
              {history.map((h) => (
                <span key={h} className="profile__chip">
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

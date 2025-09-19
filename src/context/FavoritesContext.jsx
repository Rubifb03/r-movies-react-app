import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { listFavs, setFavs, toggleFav } from "../utils/favs";

const FavoritesContext = createContext(null);
export const useFavorites = () => useContext(FavoritesContext);

export default function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (!user) return setIds([]);
    setIds(listFavs(user.id));
  }, [user]);

  const value = useMemo(
    () => ({
      ids,
      isFav: (movieId) => ids.includes(movieId),
      add(movieId) {
        if (!user) return;
        const next = Array.from(new Set([...ids, movieId]));
        setIds(next);
        setFavs(user.id, next);
      },
      remove(movieId) {
        if (!user) return;
        const next = ids.filter((id) => id !== movieId);
        setIds(next);
        setFavs(user.id, next);
      },
      toggle(movieId) {
        if (!user) return;
        const next = toggleFav(user.id, movieId);
        setIds(next);
      },
    }),
    [ids, user]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

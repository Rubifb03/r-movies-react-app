import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { listWatch, setWatch, toggleWatch } from "../utils/userdata.js";

const WatchlistContext = createContext(null);
export const useWatchlist = () => useContext(WatchlistContext);

export default function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIds(user ? listWatch(user.id) : []);
  }, [user]);

  const value = useMemo(
    () => ({
      ids,
      inWatch: (movieId) => ids.includes(movieId),
      add(movieId) {
        if (!user) return;
        const next = Array.from(new Set([...ids, movieId]));
        setIds(next);
        setWatch(user.id, next);
      },
      remove(movieId) {
        if (!user) return;
        const next = ids.filter((id) => id !== movieId);
        setIds(next);
        setWatch(user.id, next);
      },
      toggle(movieId) {
        if (!user) return;
        const next = toggleWatch(user.id, movieId);
        setIds(next);
      },
    }),
    [ids, user]
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

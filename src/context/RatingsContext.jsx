import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { getRatings, setRating } from "../utils/userdata";

const RatingsContext = createContext(null);
export const useRatings = () => useContext(RatingsContext);

export default function RatingsProvider({ children }) {
  const { user } = useAuth();
  const [map, setMap] = useState({}); // { movieId: 1..5 }

  useEffect(() => {
    setMap(user ? getRatings(user.id) : {});
  }, [user]);

  const value = useMemo(
    () => ({
      ratings: map,
      get(movieId) {
        return map[movieId] || 0;
      },
      set(movieId, value) {
        if (!user) return;
        const next = setRating(user.id, movieId, value);
        setMap(next);
      },
    }),
    [map, user]
  );

  return (
    <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>
  );
}

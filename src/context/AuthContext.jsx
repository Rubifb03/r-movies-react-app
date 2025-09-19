import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearSession,
  createUser,
  findUserByEmail,
  getSession,
  setSession,
  updateUser,
} from "../utils/storage.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s?.userId) return setLoading(false);
    // reconstruir usuario desde storage
    const u =
      (JSON.parse(localStorage.getItem("rmovies_users")) || []).find(
        (x) => x.id === s.userId
      ) || null;
    setUser(u || null);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async register({ email, name, password }) {
        const u = createUser({ email, name, password });
        setSession(u.id);
        setUser(u);
        return u;
      },
      async login({ email, password }) {
        const u = findUserByEmail(email);
        if (!u || u.password !== password)
          throw new Error("Credenciales inválidas");
        setSession(u.id);
        setUser(u);
        return u;
      },
      async logout() {
        clearSession();
        setUser(null);
      },
      async updateProfile(patch) {
        if (!user) throw new Error("No autenticado");
        const u = updateUser(user.id, patch);
        setUser(u);
        return u;
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

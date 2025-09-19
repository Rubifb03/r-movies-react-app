import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../blocks/auth.css";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      nav("/movies");
    } catch (err) {
      setError(err.message || "Credenciales inválidas");
    }
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Iniciar sesión</h1>
        <form className="auth__form" onSubmit={onSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="auth__error">{error}</p>}
          <button className="auth__btn" type="submit">
            Entrar
          </button>
        </form>
        <p className="auth__hint">
          ¿Sin cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}

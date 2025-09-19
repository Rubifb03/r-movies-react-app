import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../blocks/auth.css";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      nav("/movies");
    } catch (err) {
      setError(err.message || "Error al registrar");
    }
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Crear cuenta</h1>
        <form className="auth__form" onSubmit={onSubmit}>
          <input
            className="auth__input"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
            minLength={4}
          />
          {error && <p className="auth__error">{error}</p>}
          <button className="auth__btn" type="submit">
            Registrarme
          </button>
        </form>
        <p className="auth__hint">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}

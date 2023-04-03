import React, { useState } from "react";
import "./styles.css";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email && password) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
          alert("Erro ao criar usuário!");
          console.log("ERROR: " + error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="signup-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta!</span>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/" className="button-link">
        Já possui uma conta? Faça login!
      </Link>
    </div>
  );
};

export default Signup;

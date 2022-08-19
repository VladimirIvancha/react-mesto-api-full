import LoginRegForm from "./LoginRegForm";
import React, { useState } from "react";

function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === "email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAuth(password, email);
  }

  return (
    <div className="logIn">
      <LoginRegForm
        title="Вход"
        formsName="logIn"
        buttonText="Войти"
        onSubmit={handleSubmit}
      >
        <input
          className="loginregform__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email || ""}
          minLength="6"
          maxLength="40"
          onChange={handleChange}
          required
        ></input>
        <input
          className="loginregform__input"
          name="password"
          type="password"
          placeholder="Password"
          value={password || ""}
          minLength="6"
          maxLength="40"
          onChange={handleChange}
          required
        ></input>
      </LoginRegForm>
    </div>
  );
}

export default Login;

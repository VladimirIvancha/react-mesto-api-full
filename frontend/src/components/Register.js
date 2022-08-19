import LoginRegForm from "./LoginRegForm";
import React, { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === "email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="logIn">
      <LoginRegForm
        title="Регистрация"
        formsName="register"
        buttonText="Зарегистрироваться"
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
          value={[password] || ""}
          minLength="6"
          maxLength="40"
          onChange={handleChange}
          required
        ></input>
      </LoginRegForm>
    </div>
  );
}

export default Register;

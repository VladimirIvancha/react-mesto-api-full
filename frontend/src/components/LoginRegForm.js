import React from "react";
import { Link, Route } from "react-router-dom";

function LoginRegForm({ title, formsName, buttonText, onSubmit, children }) {
  return (
    <article className="loginregform">
      <h2 className="loginregform__title">{title}</h2>
      <form className="loginregform__form" name={formsName} onSubmit={onSubmit}>
        {children}
        <button className="loginregform__button" type="submit">
          {buttonText}
        </button>
        {
          <Route path="/sign-up">
            <Link className="loginregform__link" to="/sign-in">
              Уже зарегистрированы? Войти
            </Link>
          </Route>
        }
      </form>
    </article>
  );
}

export default LoginRegForm;

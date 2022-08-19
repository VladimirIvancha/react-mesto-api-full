import React from 'react';
import { Switch, NavLink, withRouter, Route, useLocation } from 'react-router-dom';

function Header({ email, onSignOut, loggedIn }) {
  const location = useLocation()

  return (
    <header className="header">
      <a href="#">
        <div className="header__logo"></div>
      </a>
      {loggedIn ?
        <div className="header__info">
          <p className="header__email">{email}</p>
          <NavLink to="/sign-in"
            className={`header__link ${loggedIn && 'header__link_active'}`}
            onClick={onSignOut}
          >
            Выйти
          </NavLink>
        </div>
        :
        <>
          {
            <Switch>
              <Route path='/sign-up'>
                <NavLink className="header__link_active" to='/sign-in'>Войти</NavLink>
              </Route>

              <Route path='/sign-in'>
                <NavLink className="header__link_active" to='/sign-up'>Регистрация</NavLink>
              </Route>
            </Switch>
          }
        </>
      }
    </header>
  );
}
export default withRouter(Header);
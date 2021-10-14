import { NavLink, Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import chalet from '../../assets/images/logo-ochalet.png';
import './header.scss';

const Header = ({ logged }) => {
  const role = useSelector((state) => state.user.role);
  // const role = localStorage.getItem('role');

  const adminOptions = [
    {
      key: 1, text: 'Mon profil', as: Link, to: '/profile', value: 1,
    },
    {
      key: 2, text: 'Mes annonces', as: Link, to: '/account/admin', value: 2,
    },
    {
      key: 3, text: 'Déconnexion', as: Link, to: '/signout', value: 3,
    },
  ];

  const userOptions = [
    {
      key: 1, text: 'Mon profil', as: Link, to: '/profile', value: 1,
    },
    {
      key: 2, text: 'Mes réservations', as: Link, to: '/account/user', value: 2,
    },
    {
      key: 3, text: 'Déconnexion', as: Link, to: '/signout', value: 3,
    },
  ];

  let options = adminOptions;

  const testRole = () => {
    if (role === 'admin'){
      options = adminOptions;
      return options;
    } else {
      options = userOptions;
      return options;
    }
  };

  return (

    <header className="header">
      <NavLink
        className="header__navigation__link"
        activeClassName="header__navigation__link--active"
        to="/"
        exact
      >
        <img src={chalet} alt="logo O'Chalet" className="header__logo" />
      </NavLink>
      <nav className="header__navigation">
        <NavLink
          className="header__navigation__link"
          activeClassName="header__navigation__link--active"
          to="/"
          exact
        >
          Accueil
        </NavLink>
        <NavLink
          className="header__navigation__link"
          activeClassName="header__navigation__link--active"
          to="/locations"
          exact
        >
          Annonces
        </NavLink>
        {!logged && (
        <NavLink
          className="header__navigation__link"
          activeClassName="header__navigation__link--active"
          to="/signin"
          exact
        >
          Connexion
        </NavLink>
        )}
        {!logged && (
        <NavLink
          className="header__navigation__link"
          activeClassName="header__navigation__link--active"
          to="/signup"
          exact
        >
          Inscription
        </NavLink>
        )}
        {logged && (
          <Dropdown
            className="header__navigation__link"
            text="Mon compte"
            options={testRole()}
            simple
            item
          />
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Header;

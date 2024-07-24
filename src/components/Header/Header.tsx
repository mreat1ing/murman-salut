import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderButton from 'src/ui/header-button';

import logo from '../../assets/img/logo.webp';

import './Header.scss';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__gradient" />
      <div className="header__content">
        <img className="header__image" src={logo} alt="logo" />
        <nav className="header__navigation">
          <NavLink to="/">
            <HeaderButton>Главная</HeaderButton>
          </NavLink>
          <NavLink to="/store">
            <HeaderButton>Магазин</HeaderButton>
          </NavLink>
          <NavLink to="/about">
            <HeaderButton>О нас</HeaderButton>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

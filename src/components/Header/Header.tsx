import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header: FC = () => {
  return (
    <header className="header">
      <h1>Logo</h1>
      <nav className="header__navigation">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/store">Магазин</NavLink>
        <NavLink to="/about">О нас</NavLink>
      </nav>
    </header>
  );
};

export default Header;

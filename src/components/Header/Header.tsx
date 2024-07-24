import { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderButton from 'src/ui/header-button';
import useDirection from 'src/hooks/useDirection/useDirection';

import logo from '../../assets/img/logo.webp';
import './Header.scss';
import Cart from '../Cart';

const Header: FC = () => {
  const headerContainer = useRef(document.querySelector('.header'));
  const [isExpanded, setExpanded] = useState(false);
  const [scrollDirection, scrollPosition] = useDirection();

  useEffect(() => {
    headerContainer.current = document.querySelector('.header');
  }, []);

  useEffect(() => {
    if (scrollDirection === 'up') {
      headerContainer.current?.classList.add('header--visible');
    } else if (scrollDirection === 'down') {
      headerContainer.current?.classList.remove('header--visible');
    }
    if (Number(scrollPosition) < 10) setExpanded(false);
    else if (Number(scrollPosition) > 0 && scrollDirection === 'up')
      setExpanded(true);
    else if (scrollDirection === 'down') setExpanded(false);
  }, [scrollDirection, scrollPosition]);

  return (
    <header className="header header--visible">
      <div
        className={`header__gradient ${isExpanded ? 'header__gradient--visible' : ''}`}
      />
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
          <Cart />
        </nav>
      </div>
    </header>
  );
};
export default Header;

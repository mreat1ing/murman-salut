import { FC, useEffect, useRef, useState, memo } from 'react';
import { Link, NavLink } from 'react-router-dom';

import HeaderButton from 'src/ui/header-button';
import useDirection from 'src/hooks/useDirection/useDirection';
import burgerToggle from 'src/utils/burgerToggle.utils';
import BurgerMenu from 'src/common/BurgerMenu';
import CloseButton from 'src/ui/CloseButton';

import logo from '../../assets/img/logo.png';
import './Header.scss';
import Cart from '../Cart';

const Header: FC = () => {
  const headerContainer = useRef(document.querySelector('.header'));
  const [isExpanded, setExpanded] = useState(false);
  const [scrollDirection, scrollPosition] = useDirection();
  const [navType, setNavType] = useState<string>('default');

  useEffect(() => {
    headerContainer.current = document.querySelector('.header');
  }, []);

  useEffect(() => {
    if (Number(scrollPosition) !== 0) {
      if (scrollDirection === 'up') {
        headerContainer.current?.classList.add('header--visible');
      } else if (scrollDirection === 'down') {
        headerContainer.current?.classList.remove('header--visible');
      }
    } else {headerContainer.current?.classList.add('header--visible');}
    

    if (Number(scrollPosition) < 10) setExpanded(false);
    else if (Number(scrollPosition) > 0 && scrollDirection === 'up')
      setExpanded(true);
    else if (scrollDirection === 'down') setExpanded(false);
  }, [scrollDirection, scrollPosition]);

  const onResize = () => {
    if (window.innerWidth < 900) {
      setNavType('burger');
    } else {
      setNavType('default');
    }
  };
  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="header-container">
      <header className="header header--visible">
        <div
          className={`header__gradient ${isExpanded ? 'header__gradient--visible' : ''}`}
        />
        <div className="header__content">
          <Link to="/">
            <img className="header__image" src={logo} alt="logo" />
          </Link>
          {navType === 'default' ? (
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
          ) : (
            <div className="burger">
              <div className="burger-bg" onClick={burgerToggle} />
              <BurgerMenu />
              <div className="navigation-wrapper no-border">
                <nav className="navigation-burger">
                  <CloseButton handleClick={burgerToggle} />
                  <ul
                    className="navigation-burger__list"
                    onClick={burgerToggle}
                  >
                    <li className="navigation-burger__item">
                      <NavLink to="/">
                        <HeaderButton>Главная</HeaderButton>
                      </NavLink>
                    </li>
                    <li className="navigation-burger__item">
                      <NavLink to="/store">
                        <HeaderButton>Магазин</HeaderButton>
                      </NavLink>
                    </li>
                    <li className="navigation-burger__item">
                      <NavLink to="/about">
                        <HeaderButton>О нас</HeaderButton>
                      </NavLink>
                    </li>
                    <li className="navigation-burger__item">
                      <Cart />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="background-image" />
    </div>
  );
};
export default memo(Header);

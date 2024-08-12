import { FC, useRef, useState, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import HeaderButton from 'src/ui/header-button';
import { IStore } from 'src/interfaces/store.interface';

import './Cart.scss';

const Cart: FC = () => {
  const timer = useRef<NodeJS.Timeout>();
  const [isCartHover, setCartHover] = useState<boolean>(false);
  const cartAmount = useSelector(
    (state: IStore) => state.storeItemsReducer.amountCart
  );

  const hoverHandler = (value: boolean) => {
    if (cartAmount < 1) return;
    clearTimeout(timer.current);
    if (!value) {
      document.querySelector('.header__cart-list')?.classList.add('hide');
    } else
      document.querySelector('.header__cart-list')?.classList.remove('hide');
    timer.current = setTimeout(() => setCartHover(value), 500);
  };
  return (
    <>
      <NavLink to="/cart">
        <div
          className="header__cart"
          onMouseOver={() => hoverHandler(true)}
          onMouseOut={() => hoverHandler(false)}
        >
          <HeaderButton>Корзина</HeaderButton>
          <span className="cart__count">{cartAmount || 0}</span>
        </div>
      </NavLink>
      {isCartHover && (
        <div
          className="header__cart-list"
          onMouseOver={() => hoverHandler(true)}
          onMouseOut={() => hoverHandler(false)}
        >
          <ul>
            <li>Что-то</li>
            <li>Что-то</li>
            <li>Что-то</li>
            <li>Что-то</li>
            <li>Что-то</li>
            <li>Что-то</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default memo(Cart);

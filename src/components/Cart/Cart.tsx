import { FC, useRef, useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import HeaderButton from 'src/ui/header-button';
import { IStore } from 'src/interfaces/store.interface';
import { ICartItem } from 'src/interfaces/cartItem.interface';
import burgerToggle from 'src/utils/burgerToggle.utils';

import './Cart.scss';
import HeaderCartItem from './HeaderCartItem';

const Cart: FC = () => {
  const timer = useRef<NodeJS.Timeout>();
  const [isCartHover, setCartHover] = useState<boolean>(false);
  const [navType, setNavType] = useState<string>('default');
  const items = useSelector(
    (state: IStore) => state.storeItemsReducer.cartItems
  );
  const location = window.location.pathname === '/cart';
  const cartAmount = useSelector(
    (state: IStore) => state.storeItemsReducer.amountCart
  );
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(
    Number(
      items.reduce((acc, element) => acc + element.count * element.price, 0)
    )
  );
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

  function pluralize(num: number, titles: string[]) {
    const suffix =
      titles[
        num % 10 === 1 && num % 100 !== 11
          ? 0
          : num % 10 >= 2 &&
              num % 10 <= 4 &&
              (num % 100 < 10 || num % 100 >= 20)
            ? 1
            : 2
      ];
    return suffix;
  }
  useEffect(() => {
    if (!isCartHover) {
      burgerToggle();
    } return () => burgerToggle();
  }, [isCartHover]);

  const hoverHandler = (value: boolean) => {
    if (navType === 'burger') return;
    if (items.length < 1) setCartHover(false);
    if (items.length < 1) return;
    clearTimeout(timer.current);
    if (!value) {
      document.querySelector('.header__cart-list')?.classList.add('hide');
    } else
      document.querySelector('.header__cart-list')?.classList.remove('hide');
    timer.current = setTimeout(() => setCartHover(value), 300);
  };
  const removeItemHandler = (value: boolean) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCartHover(value), 300);
    document.querySelector('.header__cart-list')?.classList.remove('hide');
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
      {isCartHover && !(items.length < 1) && !location && (
        <div
          className="header__cart-list"
          onMouseOver={() => hoverHandler(true)}
          onMouseOut={() => hoverHandler(false)}
        >
          {cartAmount && items ? (
            <ul className="header__cart-list-items">
              {items.map((item: ICartItem) => {
                return (
                  <HeaderCartItem
                    key={item.title}
                    setActive={removeItemHandler}
                  >
                    {item}
                  </HeaderCartItem>
                );
              })}
            </ul>
          ) : (
            <p className="header__cart-list-null">В корзине пока нет товаров</p>
          )}
          <div className="header__cart__sum">
            <div className="cart-list__sum-amount">
              Всего: {cartAmount + ''}{' '}
              {pluralize(Number(cartAmount), [
                'упаковка',
                'упаковки',
                'упаковок',
              ])}
            </div>
            <div className="cart-list__sum-price">
              <p>Итого: {formattedPrice} </p>
              <Link to={'/cart'} draggable={false}>
                <button className="header__cart-button">
                  Перейти в корзину
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Cart);

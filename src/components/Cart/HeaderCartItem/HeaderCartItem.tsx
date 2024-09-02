import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ICartItem } from 'src/interfaces/cartItem.interface';
import { addItemCart } from 'src/utils/ls.utils';
import placeholder from 'src/assets/img/item-placeholder.png';
import './HeaderCartItem.scss';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';
import { IStore } from 'src/interfaces/store.interface';
import Treshold from 'src/ui/icons/treshold';

interface IHeaderCartItemProps {
  children?: ICartItem;
  setActive: (e: boolean) => void;
}

const HeaderCartItem: FC<IHeaderCartItemProps> = ({ children, setActive }) => {
  const { setAmountCart, setCartItems } = useDispatchedStoreActions();
  const cartItems = useSelector(
    (state: IStore) => state.storeItemsReducer.cartItems
  );
  const location = useLocation();
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price) * Number(children?.count));

  const removeItemFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const newItems = cartItems.filter((item) => {
      if (item.title === children?.title) return false;
      return true;
    });
    const amountItems = newItems.reduce(
      (acc, element) => acc + element.count,
      0
    );
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
    setActive(false);
  };

  return (
    <li className="header-cart-item">
      <img
        className="header-cart-item__image"
        src={
          `https://murman-salut.ru/salut-catalog-icons/${children?.title.replace(/("+)|(;+)|(:+)/g, '')}.webp` ||
          placeholder
        }
        alt="placeholder"
      />
      <div className="header-cart-item__info">
        <Link to={`/store/${children?.title}`} state={{ from: location }}>
          <h3 className="header-cart-item__title">{children?.title}</h3>
        </Link>
        {children && children.title.length > 30 ? (
          <div className="header-cart-item__description">
            <span>Количество в упаковке: {children?.value}</span>
          </div>
        ) : (
          <div className="header-cart-item__description--short">
            <span>Количество в упаковке: {children?.value}</span>
          </div>
        )}
      </div>
      <div className="header-cart-item__buy-container">
        <div className="header-cart-item__money-container">
          <span className="header-cart-item__count">{children?.count}x</span>
          <button
            onClick={removeItemFromCart}
            className="header-cart-item__remove-button"
          >
            <Treshold />
          </button>
        </div>
        <div className="header-cart-item__money-container">
          <span className="header-cart-item__price">{formattedPrice}</span>
        </div>
      </div>
    </li>
  );
};

export default HeaderCartItem;

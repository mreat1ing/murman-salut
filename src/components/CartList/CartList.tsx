import { FC } from 'react';
import './CartList.scss';

import { ICartItem } from 'src/interfaces/cartItem.interface';

import CartItem from '../CartItem';

interface ICartListProps {
  items: ICartItem[];
  amount: number;
}

const CartList: FC<ICartListProps> = ({ amount, items }) => {

  return (
    <>
      {amount && items ? (
        <ul className="cart-list__list">
          {items.map((item: ICartItem) => {
            return <CartItem key={item.title}>{item}</CartItem>;
          })}
        </ul>
      ) : (
        <p className="cart-list__null">В корзине пока нет товаров</p>
      )}
    </>
  );
};

export default CartList;

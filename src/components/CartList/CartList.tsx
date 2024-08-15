import { FC } from 'react';
import './CartList.scss';
import { useSelector } from 'react-redux';

import { IStore } from 'src/interfaces/store.interface';
import { ICartItem } from 'src/interfaces/cartItem.interface';

import CartItem from '../CartItem';

const CartList: FC = () => {
  const amount = useSelector(
    (state: IStore) => state.storeItemsReducer.amountCart
  );
  const items = useSelector((state: IStore) => state.storeItemsReducer.cartItems);
  
  return (
    <div className='cart-list'>

      <h1 className='cart-list__title'>Корзина</h1>
      {amount && items ? 
        <ul className='cart-list__list'>
          {items.map((item: ICartItem) => {
            return <CartItem key={item.title}>{item}</CartItem>;
          })}
        </ul> : <p className='cart-list__null'>В корзине пока нет товаров</p>}
      <div className="cart-list__result">
        <div className="cart-list__sum">
          
        </div>
        <button className="cart-list__button">Оформить заказ</button>
      </div> 
    </div>
  );
  
};

export default CartList;
import { FC } from 'react';
import './CartContainer.scss';
import { useSelector } from 'react-redux';

import { IStore } from 'src/interfaces/store.interface';
import useDispatchedModalActions from 'src/hooks/useDispatchedModalActions/useDispatchedModalActions';
import OrderModal from 'src/modals/OrderModal';
import CartList from 'src/components/CartList/';


const CartContainer: FC = () => {
  const amount = useSelector(
    (state: IStore) => state.storeItemsReducer.amountCart
  );
  const items = useSelector(
    (state: IStore) => state.storeItemsReducer.cartItems
  );
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(
    items.reduce((acc, element) => acc + element.price * element.count, 0)
  );
  const { setModalClose, setModalOpen } = useDispatchedModalActions();
  const isModalOpen = useSelector(
    (state: IStore) => state.modalStore.isModalOpen
  );

  const pluralize = (num: number, titles: string[]) => {
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
  };

  return (
    <div className="cart-list">
      <h1 className="cart-list__title">Корзина</h1>
      <CartList amount={amount} items={items} />
      {amount && items ? (
        <div className="cart-list__result">
          <div className="cart-list__sum">
            <div className="cart-list__sum-amount">
              Всего: {amount + ''}{' '}
              {pluralize(Number(amount), ['упаковка', 'упаковки', 'упаковок'])}
            </div>
            <div className="cart-list__sum-price">Итого: {formattedPrice} </div>
          </div>
          <button className="cart-list__button" onClick={setModalOpen}>
            Оформить заказ
          </button>
        </div>
      ) : null}
      {isModalOpen && (
        <OrderModal
          handleSubmit={() => {}}
          total={formattedPrice}
          onClose={setModalClose}
        />
      )}
    </div>
  );
};

export default CartContainer;

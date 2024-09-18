import { FC, useState } from 'react';
import './CartContainer.scss';
import { useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { IStore } from 'src/interfaces/store.interface';
import useDispatchedModalActions from 'src/hooks/useDispatchedModalActions/useDispatchedModalActions';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';
import OrderModal from 'src/modals/OrderModal';
import CartList from 'src/components/CartList/';
import { sendForm } from 'src/utils/sendData.utils';

const CartContainer: FC = () => {
  const [status, setStatus] = useState('');
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
  const { setAmountCart, setCartItems } = useDispatchedStoreActions();
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
  const submitForm = (
    name: string,
    phone: string,
    email: string,
    address: string
  ) => {
    const data = {
      name: name,
      phone: phone,
      email: email,
      address: address,
      sum: items.reduce(
        (acc, element) => acc + element.price * element.count,
        0
      ),
      amount: amount,
      items: items,
    };
    sendForm(data).then((p) => {
      setStatus(p);
      if (p !== 'error') {
        setAmountCart(0);
        setCartItems([]);
      }
    });
    setModalClose();
  };

  if (status) {
    return <Navigate to={`/message/${status}`} replace />;
  }

  return (
    <>
      {amount && items ? (
        <div className="cart-list">
          <h1 className="cart-list__title">Корзина</h1>
          <CartList amount={amount} items={items} />
          <div className="cart-list__text">
            Оплата при получении товара. Каждый товар сопровождается
            сертификатом. <br />
            Срок доставки требует персонального согласования. Цена доставки:{' '}
            <br />
            Мурманск, Кола, Североморск — 200 руб. в течение 12 часов СРОЧНАЯ
            ДОСТАВКА и доставка в другие города по договорённости.
          </div>
          <div className="cart-list__result">
            <div className="cart-list__sum">
              <div className="cart-list__sum-amount">
                Всего: {amount + ''}{' '}
                {pluralize(Number(amount), [
                  'упаковка',
                  'упаковки',
                  'упаковок',
                ])}
              </div>
              <div className="cart-list__sum-price">
                Итого: {formattedPrice}{' '}
              </div>
            </div>
            <button className="cart-list__button" onClick={setModalOpen}>
              Оформить заказ
            </button>
          </div>

          {isModalOpen && (
            <OrderModal
              handleSubmit={submitForm}
              total={formattedPrice}
              onClose={setModalClose}
            />
          )}
        </div>
      ) : (
        <div className="cart-list--blank">
          <h1 className="cart-list__title--blank">Корзина</h1>
          <CartList amount={amount} items={items} />
          <NavLink className="cart-list__link--blank" to={'/store'}>В магазин</NavLink>
        </div>
      )}
    </>
  );
};

export default CartContainer;

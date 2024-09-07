import { FC, useEffect } from 'react';

import CartList from 'src/components/CartContainer';

const CartPage: FC = () => {
  useEffect(() => {
    document.body.scrollTo({
      top: 0,
    });
    document.title = 'Корзина';
  }, []);
  return <CartList />;
};

export default CartPage;

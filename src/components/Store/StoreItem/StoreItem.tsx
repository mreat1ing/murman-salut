import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import {
  addItemCart,
  removeItemCart,
  isItemInCart,
  setItemCartCount,
  getItemCartCount,
} from 'src/utils/localStore.utils';
// import { ILocalStorageCart } from 'src/interfaces/localStorage.interface';
import placeholder from 'src/assets/img/item-placeholder.png';
import CountButtons from 'src/components/CountButtons';

import './StoreItem.scss';

interface IStoreItemProps {
  children?: IStoreItem;
}

const StoreItem: FC<IStoreItemProps> = ({ children }) => {
  const [inStorage, setInStorage] = useState(false);
  const parsedChildren = JSON.stringify(children);
  const location = useLocation();
  const formatedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price));

  useEffect(() => {
    setInStorage(isItemInCart(parsedChildren));
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Link to={`/store/${children?._id}`} state={{ from: location }}>
      <li className="store-item">
        <img
          className="store-item__image"
          src={placeholder}
          alt="placeholder"
        />
        <div className="store-item__info">
          <h3 className="store-item__title">{children?.title}</h3>
          <div className="store-item__description">
            <span>Количество в упаковке: {children?.value}</span>
          </div>
        </div>
        <div className="store-item__buy-container">
          <button
            className="store-item__buy-button"
            onClick={handleButtonClick}
          >
            {inStorage ? 'В корзине' : 'Купить'}
          </button>
          <div className="store-item__money-container">
            {inStorage && <CountButtons />}
            <span className="store-item__price">{formatedPrice}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default StoreItem;

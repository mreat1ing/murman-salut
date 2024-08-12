import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  MAX_INPUT,
  DEFAULT_INPUT,
  MIN_INPUT,
} from 'src/constants/cartInputCount';
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
  const [inStorageCount, setInStorageCount] = useState(0);
  const [inputValue, setInputValue] = useState(String(inStorageCount));
  const parsedChildren = JSON.stringify(children);
  const location = useLocation();
  const formatedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price));

  useEffect(() => {
    setInStorage(isItemInCart(parsedChildren));
  }, [parsedChildren]);

  useEffect(() => {
    const cartCount = getItemCartCount(parsedChildren);
    setInStorageCount(cartCount);
    setInputValue(String(cartCount));
  }, [inStorage]);

  if (!children) return <li className="store-item"></li>;

  const removeItemFromStorage = () => {
    removeItemCart(parsedChildren);
    setInStorage(false);
    setInStorageCount(0);

    return 0;
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inStorage) {
      removeItemFromStorage();
      return;
    }
    addItemCart(parsedChildren);
    setInStorage(true);
  };

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value;
    const numberedValue = Number(value);
    if (value.startsWith('0')) {
      value = value.slice(1);
      setInputValue(value);
    }
    if (numberedValue > MAX_INPUT) {
      setInputValue(String(MAX_INPUT));
      setInStorageCount(MAX_INPUT);
      setItemCartCount(parsedChildren, MAX_INPUT);
    } else if (numberedValue < MIN_INPUT && value !== '') {
      setInputValue(String(DEFAULT_INPUT));
      setInStorageCount(DEFAULT_INPUT);
      setItemCartCount(parsedChildren, DEFAULT_INPUT);
    } else if (value === '') {
      setInputValue(value);
      setInStorageCount(DEFAULT_INPUT);
      setItemCartCount(parsedChildren, DEFAULT_INPUT);
    } else {
      setInputValue(value);
      setInStorageCount(numberedValue);
      setItemCartCount(parsedChildren, numberedValue);
    }
  };

  const handleIncreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    setInStorageCount((count) => {
      const newCount = count + 1;
      if (newCount <= MAX_INPUT) {
        setItemCartCount(parsedChildren, newCount);
        setInputValue(String(newCount));
        return newCount;
      }
      setInputValue(String(count));
      return count;
    });
  };

  const handleDecreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    setInStorageCount((count) => {
      const newCount = count - 1;
      if (newCount > MIN_INPUT) {
        setInputValue(String(newCount));
        setItemCartCount(parsedChildren, newCount);
        return newCount;
      }
      return removeItemFromStorage();
    });
  };

  return (
    <Link to={`/store/${children?.title}`} state={{ from: location }}>
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
            disabled={children?.hide}
          >
            {inStorage
              ? 'В корзине'
              : children?.hide
                ? 'Товара нет в наличии'
                : 'Купить'}
          </button>
          <div className="store-item__money-container">
            <span className="store-item__price">{formatedPrice}</span>
            {inStorage && (
              <CountButtons
                value={inputValue}
                plus={handleIncreaseCount}
                minus={handleDecreaseCount}
                input={handleChangeCount}
              />
            )}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default StoreItem;

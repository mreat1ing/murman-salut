import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  MAX_INPUT,
  DEFAULT_INPUT,
  MIN_INPUT,
} from 'src/constants/cartInputCount';
import { IStoreItem } from 'src/interfaces/storeItem.interface';
// import {
//   addItemCart,
//   removeItemCart,
//   isItemInCart,
//   setItemCartCount,
//   getItemCartCount,
// } from 'src/utils/localStore.utils';
import {
  addItemCart,
  isItemInCart,
  getItemCartCount,
} from 'src/utils/ls.utils';
// import { ILocalStorageCart } from 'src/interfaces/localStorage.interface';
import placeholder from 'src/assets/img/item-placeholder.png';
import CountButtons from 'src/common/CountButtons';
import './StoreItem.scss';
import { IStore } from 'src/interfaces/store.interface';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';

interface IStoreItemProps {
  children?: IStoreItem;
}

const StoreItem: FC<IStoreItemProps> = ({ children }) => {
  const [inStorage, setInStorage] = useState(false);
  const [inStorageCount, setInStorageCount] = useState(0);
  const [mobile, setMobile] = useState('default');
  const { setAmountCart, setCartItems } = useDispatchedStoreActions();
  const [inputValue, setInputValue] = useState(String(inStorageCount));
  const location = useLocation();
  const items = useSelector((state: IStore) => state.storeItemsReducer.items);
  const cartItems = useSelector(
    (state: IStore) => state.storeItemsReducer.cartItems
  );
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price));

  useEffect(() => {
    if (children) {
      setInStorage(isItemInCart(children?.title));
    }
  }, [children, cartItems]);

  useEffect(() => {
    let cartCount = 0;
    if (children) {
      cartCount = getItemCartCount(children?.title);
    }

    setInStorageCount(cartCount);
    setInputValue(String(cartCount));
  }, [inStorage, children]);

  const onResize = () => {
    if (window.innerWidth < 483) {
      setMobile('mobile');
    } else {
      setMobile('default');
    }
  };
  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!children) return <li className="store-item"></li>;

  const removeItemFromStorage = () => {
    const newItems = cartItems
      .map((item) => {
        let result = item;
        if (item._id === children?._id) {
          result = { ...item, count: item.count - 1 };
        }
        return result;
      })
      .filter((item) => {
        if (item.count === 0) return false;
        return true;
      });
    const amountItems = newItems.reduce(
      (acc, element) => acc + element.count,
      0
    );
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
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
    let exists = false;
    const newItems = cartItems.map((item) => {
      let result = item;
      if (item.title === children.title) {
        exists = true;
        result = { ...item, count: item.count + 1 };
      }
      return result;
    });

    if (!exists) {
      const item = items.find((el) => el.title === children.title);
      if (item) {
        newItems.push({ ...item, count: 1 });
      }
    }

    const amountItems = newItems.reduce(
      (acc, element) => acc + element.count,
      0
    );
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
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
      addItemCountFromInput(children, MAX_INPUT);
    } else if (numberedValue < MIN_INPUT && value !== '') {
      setInputValue(String(DEFAULT_INPUT));
      setInStorageCount(DEFAULT_INPUT);
      addItemCountFromInput(children, DEFAULT_INPUT);
    } else if (value === '') {
      setInputValue(value);
      setInStorageCount(DEFAULT_INPUT);
      addItemCountFromInput(children, DEFAULT_INPUT);
    } else {
      setInputValue(value);
      setInStorageCount(numberedValue);
      addItemCountFromInput(children, numberedValue);
    }
  };
  const addItemCountFromInput = (storeItem: IStoreItem, inputCount: number) => {
    let exists = false;
    const newItems = cartItems.map((item) => {
      let result = item;
      if (item.title === storeItem.title) {
        exists = true;
        result = { ...item, count: inputCount };
      }
      return result;
    });

    if (!exists) {
      const item = items.find((el) => el.title === storeItem.title);
      if (item) {
        newItems.push({ ...item, count: inputCount });
      }
    }

    const amountItems = newItems.reduce(
      (acc, element) => acc + element.count,
      0
    );
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
  };

  const handleIncreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    setInStorageCount((count) => {
      const newCount = count + 1;
      if (newCount <= MAX_INPUT) {
        const newItems = cartItems.map((item) => {
          let result = item;
          if (item._id === children?._id) {
            result = { ...item, count: item.count + 1 };
          }
          return result;
        });
        const amountItems = newItems.reduce(
          (acc, element) => acc + element.count,
          0
        );
        setCartItems(newItems);
        setAmountCart(amountItems);
        addItemCart(newItems);
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
        const newItems = cartItems
          .map((item) => {
            let result = item;
            if (item._id === children?._id) {
              result = { ...item, count: item.count - 1 };
            }
            return result;
          })
          .filter((item) => {
            if (item.count === 0) return false;
            return true;
          });
        const amountItems = newItems.reduce(
          (acc, element) => acc + element.count,
          0
        );
        setCartItems(newItems);
        setAmountCart(amountItems);
        addItemCart(newItems);
        return newCount;
      }
      return removeItemFromStorage();
    });
  };

  return (
    <li className="store-item">
      <img
        className="store-item__image"
        src={
          `https://murman-salut.ru/salut-catalog-icons/${children.title.replace(/("+)|(;+)|(:+)/g, '')}.webp` ||
          placeholder
        }
        alt="placeholder"
      />
      {mobile === 'default' ? (
        <div className="store-item__info-wrapper">
          <div className="store-item__info">
            <Link to={`/store/${children?.title}`} state={{ from: location }}>
              <h3 className="store-item__title">{children?.title}</h3>
            </Link>
            <div className="store-item__description">
              <span>Количество в упаковке: {children?.value}</span>
            </div>
          </div>
          <div className="store-item__buy-container">
            {inStorage ? (
              <CountButtons
                value={inputValue}
                plus={handleIncreaseCount}
                minus={handleDecreaseCount}
                input={handleChangeCount}
                cn={false}
              />
            ) : (
              <button
                className="store-item__buy-button"
                onClick={handleButtonClick}
                disabled={children?.hide}
              >
                {children?.hide ? 'Товара нет в наличии' : 'Купить'}
              </button>
            )}
            <div className="store-item__money-container">
              <span className="store-item__price">{formattedPrice}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="store-item__info-wrapper">
          <div className="store-item__info">
            <Link to={`/store/${children?.title}`} state={{ from: location }}>
              <h3 className="store-item__title">{children?.title}</h3>
            </Link>
          </div>
          <div className="store-item__buy-container">
            <div className="store-item__about">
              <div className="store-item__description">
                <span>Количество в упаковке: {children?.value}</span>
              </div>
              <div className="store-item__money-container">
                <span className="store-item__price">{formattedPrice}</span>
              </div>
            </div>
            {inStorage ? (
              <CountButtons
                value={inputValue}
                plus={handleIncreaseCount}
                minus={handleDecreaseCount}
                input={handleChangeCount}
                cn={false}
              />
            ) : (
              <button
                className="store-item__buy-button"
                onClick={handleButtonClick}
                disabled={children?.hide}
              >
                {children?.hide ? 'Товара нет в наличии' : 'Купить'}
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default StoreItem;

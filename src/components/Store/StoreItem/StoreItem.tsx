import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  MAX_INPUT,
  DEFAULT_INPUT,
  MIN_INPUT,
} from 'src/constants/cartInputCount';
import { IStoreItem } from 'src/interfaces/storeItem.interface';
import {
  addItemCart,
  isItemInCart,
  getItemCartCount,
} from 'src/utils/ls.utils';
import placeholder from 'src/assets/img/item-placeholder.png';
import CountButtons from 'src/common/CountButtons';
import './StoreItem.scss';
import { IStore } from 'src/interfaces/store.interface';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';

interface IStoreItemProps {
  children: IStoreItem;
}

const StoreItemTest: FC<IStoreItemProps> = ({ children }) => {
  const [inStorage, setInStorage] = useState(isItemInCart(children.title));
  const [mobile, setMobile] = useState('default');
  const { setAmountCart, setCartItems } = useDispatchedStoreActions();
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const isItemsLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isItemsLoading
  );
  const items = useSelector((state: IStore) => state.storeItemsReducer.items);
  const cartItems = useSelector(
    (state: IStore) => state.storeItemsReducer.cartItems
  );
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price));

  useEffect(() => {
    let cartCount = 0;
    if (children) {
      cartCount = getItemCartCount(children?.title);
    }
    setInputValue(String(cartCount));
  }, [children]);

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

  const handleDecreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = Number(inputValue) - 1;
    if (newCount > MIN_INPUT) {
      setInputValue(String(newCount));
      const newItems = cartItems
        .map((item) => {
          let result = item;
          if (item._id === children?._id) {
            result = { ...item, count: item.count - 1 };
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
      return newCount;
    } else {
      const newItems = cartItems
      .map((item) => {
        let result = item;
        if (item._id === children?._id) {
          result = { ...item, count: item.count - 1 };
        }
        return result;
      })
      .filter((item) => {
        if (item.count <= 0) return false;
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

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    let value = e.target.value;
    const numberedValue = Number(value);
    if (value.startsWith('0')) {
      value = value.replace(/^[0]*/gm, '');
    }
    if (numberedValue > MAX_INPUT) {
      setInputValue(String(MAX_INPUT));
      addItemCountFromInput(children, MAX_INPUT);
    } else if (numberedValue < MIN_INPUT && value !== '') {
      setInputValue(String(DEFAULT_INPUT));
      addItemCountFromInput(children, DEFAULT_INPUT);
    } else if (value === '') {
      setInputValue(value);
      addItemCountFromInput(children, DEFAULT_INPUT);
    } else {
      setInputValue(value);
      addItemCountFromInput(children, numberedValue);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    let exists = false;
    let count = '1';
    const newItems = cartItems.map((item) => {
      let result = item;
      if (item.title === children.title) {
        exists = true;
        result = { ...item, count: item.count + 1 };
        count = String(item.count + 1);
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
    setInputValue(count);
  };
  const onBlurHandler = (e: React.FocusEvent) => {
    e.preventDefault();
    const newItems = cartItems
      .map((item) => {
        let result = item;
        if (item._id === children?._id) {
          result = { ...item, count: item.count - 1 };
        }
        return result;
      })
      .filter((item) => {
        if (item.count <= 0) return false;
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
  };

  return (
    <>
      {isItemsLoading ? (
        <li className="store-item">
          <Link to={`/store/${children?.title}`} state={{ from: location }}>
            <img
              className="store-item__image"
              src={placeholder}
              alt="placeholder"
            />
          </Link>
          <h1>LOADING...</h1>
        </li>
      ) : (
        <li className="store-item">
          <Link to={`/store/${children?.title}`} state={{ from: location }}>
            <img
              className="store-item__image"
              src={
                `https://murman-salut.ru/salut-catalog-icons/${children.title.replace(/("+)|(;+)|(:+)/g, '')}.webp` ||
                placeholder
              }
              alt={children._id}
            />
          </Link>

          {mobile === 'default' ? (
            <div className="store-item__info-wrapper">
              <div className="store-item__info">
                <Link
                  to={`/store/${children?.title}`}
                  state={{ from: location }}
                >
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
                    plus={handleButtonClick}
                    minus={handleDecreaseCount}
                    input={handleChangeCount}
                    cn={false}
                    blur={onBlurHandler}
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
                <Link
                  to={`/store/${children?.title}`}
                  state={{ from: location }}
                >
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
                    plus={handleButtonClick}
                    minus={handleDecreaseCount}
                    input={handleChangeCount}
                    cn={false}
                    blur={onBlurHandler}
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
      )}
    </>
  );
};

export default StoreItemTest;

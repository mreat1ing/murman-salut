import { FC, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IStore } from 'src/interfaces/store.interface';
import { IStoreItem } from 'src/interfaces/storeItem.interface';
import CountButtons from 'src/common/CountButtons';
import {
  MAX_INPUT,
  DEFAULT_INPUT,
  MIN_INPUT,
} from 'src/constants/cartInputCount';
import {
  addItemCart,
  isItemInCart,
  getItemCartCount,
} from 'src/utils/ls.utils';
import imageIcon from 'src/assets/icons/image-icon.png';
import videoIcon from 'src/assets/icons/video-icon.png';
import placeholder from 'src/assets/img/item-placeholder.png';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';

import './ProductCard.scss';
interface IProductCardProps {
  items: IStoreItem[];
  item: IStoreItem;
}

const ProductCard: FC<IProductCardProps> = ({ items, item }) => {
  const [previewType, setPreviewType] = useState('image');
  const [inStorage, setInStorage] = useState(
    isItemInCart(item ? item.title : '')
  );
  const { setAmountCart, setCartItems } = useDispatchedStoreActions();
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const cartItems = useSelector(
    (state: IStore) => state.storeItemsReducer.cartItems
  );
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(item?.price));
  const comesFrom =
    location.state?.from?.pathname + location.state?.from?.search || '/store';

  useEffect(() => {
    let cartCount = 0;
    if (item) {
      cartCount = getItemCartCount(item?.title);
    }
    setInputValue(String(cartCount));
  }, [item]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleDecreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = Number(inputValue) - 1;
    if (newCount > MIN_INPUT) {
      setInputValue(String(newCount));
      const newItems = cartItems.map((el) => {
        let result = el;
        if (el._id === item?._id) {
          result = { ...el, count: el.count - 1 };
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
        .map((el) => {
          let result = el;
          if (el._id === item?._id) {
            result = { ...el, count: el.count - 1 };
          }
          return result;
        })
        .filter((el) => {
          if (el.count <= 0) return false;
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
    const newItems = cartItems.map((el) => {
      let result = el;
      if (el.title === storeItem.title) {
        exists = true;
        result = { ...el, count: inputCount };
      }
      return result;
    });

    if (!exists) {
      const elem = items.find((el) => el.title === storeItem.title);
      if (elem) {
        newItems.push({ ...elem, count: inputCount });
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
    let value = e.target.value;
    const numberedValue = Number(value);
    if (value.startsWith('0')) {
      value = value.replace(/^[0]*/gm, '');
    }
    if (numberedValue > MAX_INPUT) {
      setInputValue(String(MAX_INPUT));
      addItemCountFromInput(item, MAX_INPUT);
    } else if (numberedValue < MIN_INPUT && value !== '') {
      setInputValue(String(DEFAULT_INPUT));
      addItemCountFromInput(item, DEFAULT_INPUT);
    } else if (value === '') {
      setInputValue(value);
      addItemCountFromInput(item, DEFAULT_INPUT);
    } else {
      setInputValue(value);
      addItemCountFromInput(item, numberedValue);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    let exists = false;
    let count = '1';
    const newItems = cartItems.map((el) => {
      let result = el;
      if (el.title === item.title) {
        exists = true;
        result = { ...el, count: el.count + 1 };
        count = String(el.count + 1);
      }
      return result;
    });

    if (!exists) {
      const elem = items.find((el) => el.title === item.title);
      if (elem) {
        newItems.push({ ...elem, count: 1 });
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
      .map((el) => {
        let result = el;
        if (el._id === item?._id) {
          result = { ...el, count: el.count - 1 };
        }
        return result;
      })
      .filter((el) => {
        if (el.count <= 0) return false;
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
    <div className="product-card">
      <div className="product-card__preview-type">
        <button
          className={`product-card__button product-card__image-type${previewType === 'image' ? ' active' : ''}`}
          onClick={() => setPreviewType('image')}
        >
          <img width={40} height={40} src={imageIcon} alt="img" />
        </button>
        <button
          className={`product-card__button product-card__video-type${previewType === 'video' ? ' active' : ''}`}
          onClick={() => setPreviewType('video')}
        >
          <img width={30} height={30} src={videoIcon} alt="video" />
        </button>
      </div>
      <Link to={comesFrom}>
        <button className="product-card__button product-card__button-back">
          Назад
        </button>
      </Link>
      <div className={`product-card__media-container ${previewType}`}>
        {previewType === 'image' && (
          <img
            className="product-card__image"
            src={
              `https://murman-salut.ru/salut-catalog-icons/${item?.title.replace(/("+)|(;+)|(:+)/g, '')}.webp` ||
              placeholder
            }
            alt="placeholder"
          />
        )}
        {previewType === 'video' && (
          <video
            autoPlay
            className="product-card__video"
            muted
            disablePictureInPicture
            disableRemotePlayback
            controls
          >
            <source src={item?.link} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="product-card__info-wrapper">
        <div className="product-card__info">
          <h3 className="product-card__title">{item?.title}</h3>
        </div>
        <div className="product-card__buy-container">
          <div className="product-card__buy-container--group">
            <div className="product-card__description">
            <span>Количество в упаковке: {item?.value}</span>
          </div>
          <div className="product-card__money-container">
            <span className="product-card__price">Цена: {formattedPrice}</span>
          </div>
          </div>
          
          <div className="product-card__buy-button--group">
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
              className="product-card__buy-button"
              onClick={handleButtonClick}
              disabled={item?.hide}
            >
              {item?.hide ? 'Товара нет в наличии' : 'Купить'}
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

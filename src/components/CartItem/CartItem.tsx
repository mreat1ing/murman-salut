import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ICartItem } from 'src/interfaces/cartItem.interface';
import {
  MAX_INPUT,
  DEFAULT_INPUT,
  MIN_INPUT,
} from 'src/constants/cartInputCount';
import { addItemCart } from 'src/utils/ls.utils';
import placeholder from 'src/assets/img/item-placeholder.png';
import CountButtons from 'src/components/CountButtons';
import './CartItem.scss';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';
import { IStore } from 'src/interfaces/store.interface';
import Treshold from 'src/ui/icons/treshold';

interface ICartItemProps {
  children?: ICartItem;
}

const CartItem: FC<ICartItemProps> = ({ children }) => {
  // const [count, setCount] = useState(children?.count || 0);
  const [inputValue, setInputValue] = useState(String(children?.count || 0));
  const {setAmountCart, setCartItems} = useDispatchedStoreActions();
  const cartItems = useSelector((state: IStore) => state.storeItemsReducer.cartItems);
  // const amount = useSelector((state: IStore) => state.storeItemsReducer.amountCart);
  const location = useLocation();
  const formattedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price) * Number(children?.count));

  // const handleIncreaseCount = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   const newCount = count + 1;
  //   setCount(count + 1);
  //   const items = cartItems.map(item => {
  //     let result = item;
  //     if (item._id === children?._id) {
  //       result = {...item, count: item.count + 1};
  //     }
  //     return result;
  //   });
  //   const amountItems = items.reduce((acc, element) => acc + element.count, 0);
  //   setCartItems(items);
  //   setAmountCart(amountItems);
  //   addItemCart(items);
  //   setInputValue(String(newCount));
  // };

  // const handleDecreaseCount = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setCount(count-1);
  //   const items = cartItems.map(item => {
  //     let result = item;
  //     if (item._id === children?._id) {
  //       result = {...item, count: item.count - 1};
  //     }
  //     return result;
  //   }).filter(item => {
  //     if (item.count === 0) return false;
  //     return true;
  //   });
  //   const amountItems = items.reduce((acc, element) => acc + element.count, 0);
  //   setCartItems(items);
  //   setAmountCart(amountItems);
  //   addItemCart(items);
  //   setInputValue(String(count));
  // };

  const removeItemFromStorage = () => {
    const newItems = cartItems.map(item => {
      let result = item;
      if (item._id === children?._id) {
        result = {...item, count: item.count - 1};
      }
      return result;
    }).filter(item => {
      if (item.count === 0) return false;
      return true;
    });
    const amountItems = newItems.reduce((acc, element) => acc + element.count, 0);
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
  };

  const removeItemFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const newItems = cartItems.filter(item => {
      if (item.title === children?.title) return false;
      return true;
    });
    const amountItems = newItems.reduce((acc, element) => acc + element.count, 0);
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
  };

  const handleIncreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = Number(inputValue) + 1;
    if (newCount <= MAX_INPUT) {
      const newItems = cartItems.map(item => {
        let result = item;
        if (item._id === children?._id) {
          result = {...item, count: item.count + 1};
        }
        return result;
      });
      const amountItems = newItems.reduce((acc, element) => acc + element.count, 0);
      setCartItems(newItems);
      setAmountCart(amountItems);
      addItemCart(newItems);
      setInputValue(String(newCount));
    } else {
      setInputValue(inputValue);
    }  
    
  };

  const handleDecreaseCount = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = Number(inputValue) - 1;
      if (newCount > MIN_INPUT) {
        setInputValue(String(newCount));
        const newItems = cartItems.map(item => {
          let result = item;
          if (item._id === children?._id) {
            result = {...item, count: item.count - 1};
          }
          return result;
        }).filter(item => {
          if (item.count === 0) return false;
          return true;
        });
        const amountItems = newItems.reduce((acc, element) => acc + element.count, 0);
        setCartItems(newItems);
        setAmountCart(amountItems);
        addItemCart(newItems);
      }
      return removeItemFromStorage();
  };

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value;
    const numberedValue = Number(value);
    if (value.startsWith('0')) {
      value = value.slice(1);
      setInputValue(value);
    }
    if (children && (numberedValue > MAX_INPUT)) {
      setInputValue(String(MAX_INPUT));
      addItemCountFromInput(children , MAX_INPUT);
    } else if (children && (numberedValue < MIN_INPUT && value !== '')) {
      setInputValue(String(DEFAULT_INPUT));
      addItemCountFromInput(children, DEFAULT_INPUT);
    } else if (children && value === '') {
      setInputValue(value);
      addItemCountFromInput(children, DEFAULT_INPUT);
    } else if (children){
      setInputValue(value);
      addItemCountFromInput(children, numberedValue);
    }
  };
  const addItemCountFromInput = (storeItem: ICartItem, inputCount: number) => {
    const newItems = cartItems.map(item => {
      let result = item;
      if (item.title === storeItem.title) {
        result = {...item, count: inputCount};
      }
      return result;
    });

    const amountItems = newItems.reduce((acc, element) => acc + element.count, 0);
    setCartItems(newItems);
    setAmountCart(amountItems);
    addItemCart(newItems);
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
        <div className="cart-item__buy-container">
          <div className="cart-item__money-container">
          <CountButtons
            value={inputValue}
            plus={handleIncreaseCount}
            minus={handleDecreaseCount}
            input={handleChangeCount}
            cn={true}
          /> 
          <button 
              onClick={removeItemFromCart}
              className='store-item__remove-button'>
              <Treshold />
            </button> 
            </div>
          <div className="cart-item__money-container">
            <span className="cart-item__price">{formattedPrice}</span>
            
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CartItem;

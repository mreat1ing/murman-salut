import { FC, useCallback, useEffect, useRef, useState } from 'react';

import MessageIcon from 'src/assets/icons/message_icon.svg';
import './priceMessageOnScroll.scss';
import { getMessage,removeMessage } from 'src/utils/sessionStorage.utils';

const PriceMessageOnScroll: FC = () => {
  const buttonRef = useRef(null);
  const [isShowScrollTopButton, setShowScrollTopButton] = useState(false);
  const [show, setShow] = useState(getMessage());
  const [curPos, setCurPos] = useState(window.innerWidth * 0.02);

  const scrollHandler = useCallback(() => {
    const currScroll = window.scrollY;
    if (currScroll > 50) {
      setShowScrollTopButton(true);
    } else setShowScrollTopButton(false);
  }, []);

  const resizeHandler = useCallback(() => {
    const currWidth = window.innerWidth;

    if (currWidth >= 320 && currWidth <= 1920) {
      if (!(currWidth % 16)) {
        setCurPos(currWidth * 0.04);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler, scrollHandler]);

  return (
    <>
      {show && (
        <div
          ref={buttonRef}
          style={
            isShowScrollTopButton
              ? {
                  bottom: curPos + 15,
                  margin: 'auto',
                }
              : {
                  bottom: curPos - 125,
                  margin: 'auto',
                  transform: 'translateY(100px)',
                }
          }
          className={`${
            isShowScrollTopButton ? 'animate-enter' : 'animate-leave'
          } price-message`}
        >
          <div className="price-message__left">
            <div className="price-message__flex-start">
              <div className="price-message__img-wrapper">
                <img className="" src={MessageIcon} alt="" />
              </div>
              <div className="price-message__text-wrapper">
                <p className="price-message__text">
                  Цены указаны за упаковку товара
                </p>
              </div>
            </div>
          </div>
          <div className="price-message__button-wrapper">
            <button
              onClick={() => {
                setShowScrollTopButton(false);
                setShow(false);
              }}
              className=""
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                removeMessage();
                setShowScrollTopButton(false);
                setShow(false);
              }}
              className=""
            >
              Убрать
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceMessageOnScroll;

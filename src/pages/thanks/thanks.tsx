import { FC, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import './thanks.scss';
import Success from 'src/ui/icons/success';
import Error from 'src/ui/icons/error';
import Warning from 'src/ui/icons/warning';

type data = 'thanks' | 'error-user' | 'error';

const data = {
  thanks: {
    title: 'Спасибо за заказ!',
    img: 'success',
    email: 'Подверждение и номер заказа отправлены на указанный email',
    text: 'Ваш заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.',
    pay: 'Оплата при получении товара.',
  },
  'error-user': {
    title: 'Спасибо за заказ!',
    img: 'warning',
    email: 'К сожадению нам не удалось отправить вам письмо подтвердение',
    text: 'Ваш заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.',
    pay: 'Оплата при получении товара.',
  },
  error: {
    title: 'Упс, что-то пошло не так',
    img: 'error',
    email: 'К сожадению при оформлении заказа возникла ошибка',
    text: 'Мы сохранили вашу корзину, попробуйте снова или свяжитесь с нами по телефону',
    pay: '+7 911 300 26 74',
  },
};

const Thanks: FC = () => {
  useEffect(() => {
    document.body.scrollTo({
      top: 0,
    });
    document.title = 'Заказ - Кольский Салют';
  }, []);
  const { id }: { id?: data } = useParams<string>();
  const element = id && data[id];

  return (
    <div className="message">
      <h1 className="message__title">{element?.title || 'Title'}</h1>
      <div className={'message__img'}>
        {element?.img === 'success' ? (
          <Success w={150} h={150} />
        ) : element?.img === 'error' ? (
          <Error w={150} h={150} />
        ) : (
          <Warning w={150} h={150} />
        )}
      </div>
      <div className="message__text-container">
        <p className="message__email">{element?.email || 'Error'}</p>
        <p className="message__text">{element?.text || 'Text'}</p>
        {element?.img === 'error' ? (
          <NavLink to={'/cart'} replace={true}>
            <span className="store-item__buy-button">В корзину</span>
          </NavLink>
        ) : (
          <NavLink to={'/'} replace={true}>
            <span className="store-item__buy-button">На главную</span>
          </NavLink>
        )}
        <p className="message__pay">
          {element?.img === 'error' ? (
            <a className="message__pay" href="tel:+79113002674">
              +7 911 300 26 74
            </a>
          ) : (
            element?.pay || 'Pay'
          )}
        </p>
      </div>
    </div>
  );
};

export default Thanks;

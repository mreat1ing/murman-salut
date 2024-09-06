import { FC } from 'react';
import { Link } from 'react-router-dom';

import './404.scss';

const NotFound: FC = () => {
  // //TODO: replace with spinner or smth like that
  // if (isItemsLoading) return <h2>LOADING</h2>;

  return (
    <div className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <div className="not-found__text-container">
        <h3 className='not-found__text-title'>Такой страницы у нас нет.<br/> она была. а теперь нет.</h3>
        <p className='not-found__text'>Но это не трашно! Вы по прежнему можетие найти нужные товары в нашем каталоге</p>
        <Link draggable={false} to={'/store'}><span className='not-found__text-link'>перейти в каталог товаров</span></Link>
      </div>
      
      
    </div>
  );
};

export default NotFound;

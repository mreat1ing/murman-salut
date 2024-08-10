import { FC } from 'react';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import placeholder from 'src/assets/img/item-placeholder.png';

import './StoreItem.scss';

interface IStoreItemProps {
  children?: IStoreItem;
}

const StoreItem: FC<IStoreItemProps> = ({ children }) => {
  const formatedPrice = Intl.NumberFormat('RU-ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(children?.price));

  return (
    <li className="store-item">
      <img className="store-item__image" src={placeholder} alt="placeholder" />
      <div className="store-item__info">
        <h3 className="store-item__title">{children?.title}</h3>
        <div className="store-item__description">
          <a className="store-item__video-link" href={children?.link}>
            Видео
          </a>
          <span>Количество в упаковке: {children?.value}</span>
        </div>
      </div>
      <div className="store-item__buy-container">
        <button className="store-item__buy-button">Купить</button>
        <span className="store-item__price">{formatedPrice}</span>
      </div>
    </li>
  );
};

export default StoreItem;

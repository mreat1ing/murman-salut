import { FC, useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
interface ICategoryCard {
  title?: string;
  image?: string;
  value?: string;
  onClick?: () => void;
  active?: boolean;
  cn: boolean;
}

import { IStore } from 'src/interfaces/store.interface';
import './CategoryCard.scss';

const CategoryCard: FC<ICategoryCard> = ({
  title,
  value,
  image,
  onClick,
  active = true,
  cn
}) => {
  const [isActive, setActive] = useState(false);
  const curCategory = useSelector(
    (state: IStore) => state.storeItemsReducer.curCategory
  );
  const [searchParams] = useSearchParams(`category=${curCategory}`);

  useEffect(() => {
    if (searchParams.get('category') === value) {
      setActive(true);
    } else setActive(false);
  }, [searchParams, value]);

  return (
    <button
      className={ cn ? `category-card-all ${isActive ? 'active' : ''}` : `category-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      disabled={isActive && active}
    >
      {image && (
        <img
          className={`category-card__image ${image}`}
          src={image}
          alt={title}
        />
      )}
      <span className="category-card__title">{title === 'Пневмохлопушки' ? `${title.substring(0, 6) + ' ' + title.substring(6)}` : title}</span>
    </button>
  );
};

export default memo(CategoryCard);

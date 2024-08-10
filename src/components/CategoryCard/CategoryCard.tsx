import { FC, useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
interface ICategoryCard {
  title?: string;
  image?: string;
  value?: string;
  onClick?: () => void;
}

import './CategoryCard.scss';

const CategoryCard: FC<ICategoryCard> = ({ title, value, image, onClick }) => {
  const [isActive, setActive] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('category') === value) {
      setActive(true);
    } else setActive(false);
  }, [searchParams, value]);

  return (
    <button
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      disabled={isActive}
    >
      {image && (
        <img
          className={`category-card__image ${image}`}
          src={image}
          alt={title}
        />
      )}
      <span className="category-card__title">{title}</span>
    </button>
  );
};

export default memo(CategoryCard);

import { FC } from 'react';

interface ICategoryCard {
  title?: string;
  image?: string;
}

import './CategoryCard.scss';

const CategoryCard: FC<ICategoryCard> = ({ title, image }) => {
  return (
    <div className="category-card" id={`${title === 'Все' ? 'all' : ''}`}>
      {image && <div className={`category-card__image ${image}`} />}
      <span className="category-card__title">{title}</span>
    </div>
  );
};

export default CategoryCard;

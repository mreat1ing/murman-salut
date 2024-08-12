import { FC } from 'react';

import CategoryCard from 'src/components/CategoryCard';
import { CATEGORIES_COUNT } from 'src/constants/categories';

const CategorySkeleton: FC = () => {
  const categories = [];
  for (let i = 0; i < CATEGORIES_COUNT; i++) {
    categories.push(<CategoryCard key={i} />);
  }

  return <ul className="store-page__categories">{categories}</ul>;
};

export default CategorySkeleton;

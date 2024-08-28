import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './CategoriesSpinner.scss';
import { IStore } from 'src/interfaces/store.interface';
import CategoryCard from 'src/components/CategoryCard';
import CategorySkeleton from 'src/common/categorySkeleton';
import { iconFilter } from 'src/ui/icons/categoryIcons/CategoryIcons';

const CategoriesSpinner: FC = () => {
  const categories = useSelector(
    (state: IStore) => state.storeItemsReducer.categories
  );
  const categoriesLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isCategoriesLoading
  );

  return (
    <div className="categories-spinner">
      {!categoriesLoading ? (
        <ul className="category-spinner__slider">
          {categories &&
            categories.map((item) => {
              if (item.title === 'Все')
                return (
                  <li key={item.value}>
                    <Link to={'/store'}>
                      <CategoryCard
                        title={item.title}
                        value={item.title}
                        image={iconFilter(item.title)}
                        active={false}
                      />
                    </Link>
                  </li>
                );
              else {
                return (
                  <li key={item.value}>
                    <Link to={`/store?category=${item.title}`}>
                      <CategoryCard
                        title={item.title}
                        value={item.title}
                        image={iconFilter(item.title)}
                      />
                    </Link>
                  </li>
                );
              }
            })}
        </ul>
      ) : (
        <CategorySkeleton />
      )}
    </div>
  );
};

export default memo(CategoriesSpinner);

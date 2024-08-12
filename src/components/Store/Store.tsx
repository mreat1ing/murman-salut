import { FC, memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CategoryCard from 'src/components/CategoryCard';
import CategorySkeleton from 'src/common/categorySkeleton';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';
import { db } from 'src/services/db';
import { IStore } from 'src/interfaces/store.interface';

import ItemList from './ItemList';

import './Store.scss';

const Store: FC = () => {
  const [categoriesList, setCategoriesList] = useState<React.ReactElement[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setItems, setItemsLoading } = useDispatchedStoreActions();
  const categories = useSelector(
    (state: IStore) => state.storeItemsReducer.categories
  );
  const isCategoriesLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isCategoriesLoading
  );

  useEffect(() => {
    if (!categories.length) return;
    setCategoriesList(
      categories.map((el) => {
        return (
          <li key={el.value}>
            <CategoryCard
              onClick={() => setSearchParams(`category=${el.title}`)}
              title={el.title}
              value={el.title}
            />
          </li>
        );
      })
    );
  }, [categories, setSearchParams]);

  useEffect(() => {
    setItemsLoading(true);
    const items = db.loadItems();
    items.then((res) => {
      setItems(res);
      setItemsLoading(false);
    });
  }, [setItems, setItemsLoading]);

  return (
    <div className="store-page">
      {!isCategoriesLoading ? (
        <ul className="store-page__categories">{categoriesList}</ul>
      ) : (
        <CategorySkeleton />
      )}
      {searchParams.size && (
        <div className="store">
          <div className="store__header">
            <h2 className="store__title">{searchParams.get('category')}</h2>
            <select defaultValue="Сортировка">
              <option value="Сортировка" disabled hidden>
                Сортировка
              </option>
              <option>Сначала недорогие</option>
              <option>Сначала дорогие</option>
            </select>
          </div>

          <ItemList />
        </div>
      )}
    </div>
  );
};

export default memo(Store);

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
  const { setItems, setItemsLoading } = useDispatchedStoreActions();
  const categories = useSelector(
    (state: IStore) => state.storeItemsReducer.categories
  );
  const isCategoriesLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isCategoriesLoading
  );
  const items = useSelector((state: IStore) => state.storeItemsReducer.items);
  const curCategory = useSelector((state: IStore) => state.storeItemsReducer.curCategory);
  const [searchParams, setSearchParams] = useSearchParams(`category=${curCategory}`);

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
    if (items.length) return;
    setItemsLoading(true);
    const dbItems = db.loadItems();
    dbItems.then((res) => {
      setItems(res);
      setItemsLoading(false);
    });
  }, [items.length, setItems, setItemsLoading]);

  return (
    <div className="store-page">
      {isCategoriesLoading && <CategorySkeleton />}
      {!isCategoriesLoading && (
        <ul className="store-page__categories">{categoriesList}</ul>
      )}
      {searchParams.size && !isCategoriesLoading ? (
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
      ) : null}
    </div>
  );
};

export default memo(Store);

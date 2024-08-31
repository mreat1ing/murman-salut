import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CategoryCard from 'src/components/CategoryCard';
import CategorySkeleton from 'src/common/categorySkeleton';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';
import { db } from 'src/services/db';
import { IStore } from 'src/interfaces/store.interface';
import { iconFilter } from 'src/ui/icons/categoryIcons/CategoryIcons';
import { IStoreItem } from 'src/interfaces/storeItem.interface';

import ItemList from './ItemList';

import './Store.scss';

const Store: FC = () => {
  const [categoriesList, setCategoriesList] = useState<React.ReactElement[]>();
  const { setItems, setItemsLoading } = useDispatchedStoreActions();
  const [sort, setSort] = useState('Сортировка');
  const categories = useSelector(
    (state: IStore) => state.storeItemsReducer.categories
  );
  const isCategoriesLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isCategoriesLoading
  );
  const items = useSelector((state: IStore) => state.storeItemsReducer.items);
  const curCategory = useSelector(
    (state: IStore) => state.storeItemsReducer.curCategory
  );
  const [searchParams, setSearchParams] = useSearchParams(
    `category=${curCategory}`
  );
  const [listItems, setListItems] = useState(items);

  useEffect(() => {
    setSort('Сортировка');
  }, [searchParams]);

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
              image={iconFilter(el.title)}
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
  
  const filterItems = useCallback(() => {
    let list: IStoreItem[] = [];
    const copyItems = [...items];
    if (searchParams.get('category') === 'Все') return setListItems(copyItems);
    else {
      const cat = categories.find(
        (el) => el.title === searchParams.get('category')
      );
      if (cat?.subcategories) {
        for (let i = 0; i < cat.subcategories.length; i++) {
          list = list.concat(
            items.filter((item) => item.category === cat.subcategories[i].value)
          );
        }
      } else {
        list = list.concat(
          items.filter((item) => item.category === cat?.value)
        );
      }
    }
    setListItems(list);
  }, [items, searchParams, categories]);
  
  useEffect(() => {
    if (items.length) {
      filterItems();
    }
  }, [filterItems, items]);

  const sortItems = (val: string) => {
    setSort(val);
    const copyItems = listItems;
    if (val === 'min') {
      setListItems(copyItems.sort((a, b) => a.price - b.price));
    } else if (val === 'max') {
      setListItems(copyItems.sort((a, b) => a.price - b.price).reverse());
    }
  };

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
            <select onChange={(e) => sortItems(e.target.value)} value={sort}>
              <option value="Сортировка" disabled hidden>
                Сортировка
              </option>
              <option value={'min'}>Сначала недорогие</option>
              <option value={'max'}>Сначала дорогие</option>
            </select>
          </div>

          {listItems && items && sort && <ItemList items={listItems} />}
        </div>
      ) : null}
    </div>
  );
};

export default memo(Store);

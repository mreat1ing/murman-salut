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
import Select from 'src/ui/Select';

import ItemList from '../../components/Store/ItemList';

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
  const curCategory = useSelector(
    (state: IStore) => state.storeItemsReducer.curCategory
  );
  const [searchParams, setSearchParams] = useSearchParams(
    `category=${curCategory}`
  );
  const [listItems, setListItems] = useState(items);

  useEffect(() => {
    const copyItems = listItems;
    if (searchParams.get('sort') === 'min') {
      setListItems(copyItems.sort((a, b) => a.price - b.price));
    } else if (searchParams.get('sort') === 'max') {
      setListItems(copyItems.sort((a, b) => a.price - b.price).reverse());
    }
  }, [searchParams, listItems]);

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
    if (!searchParams.get('sort')) {
      setSearchParams(searchParams + '&' + `sort=${val}`);
    } else {
      setSearchParams(
        `category=${searchParams.get('category')}` + '&' + `sort=${val}`
      );
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
            <Select
              title={'Сортировка'}
              options={[
                { title: 'Сначала недорогие', id: 'first', value: 'min' },
                { title: 'Сначала дорогие', id: 'second', value: 'max' },
              ]}
              onChange={(value) => {
                sortItems(value);
              }}
              currCategory={curCategory}
            />
          </div>

          {listItems && items && (
            <ItemList
              items={
                searchParams.get('sort') === 'min'
                  ? listItems.sort((a, b) => a.price - b.price)
                  : searchParams.get('sort') === 'max'
                    ? listItems.sort((a, b) => a.price - b.price).reverse()
                    : listItems
              }
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default memo(Store);

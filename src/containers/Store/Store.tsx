import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

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
  const [swiperCategories, setSwiperCategories] =
    useState<React.ReactElement[]>();
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
        if (el.title === 'Все') {
          return (
            <li key={el.value}>
              <CategoryCard
                cn={true}
                onClick={() => setSearchParams(`category=${el.title}`)}
                title={el.title}
                value={el.title}
                image={iconFilter(el.title)}
              />
            </li>
          );
        } else {
          return (
            <li key={el.value}>
              <CategoryCard
                cn={false}
                onClick={() => setSearchParams(`category=${el.title}`)}
                title={el.title}
                value={el.title}
                image={iconFilter(el.title)}
              />
            </li>
          );
        }
      })
    );
    // setSwiperCategories(
    //   categories.map((el, index, arr) => {
    //     const newIndex = index > 0 ? index + 2 : index;
    //     const nextElem = arr[newIndex + 1] || null;
    //     const currElem = arr[newIndex];
    //     return (
    //       <SwiperSlide key={el.title}>
    //         {currElem && (
    //           <CategoryCard
    //             cn={currElem.title === 'Все'}
    //             onClick={() => setSearchParams(`category=${currElem.title}`)}
    //             title={currElem.title}
    //             value={currElem.title}
    //             image={iconFilter(currElem.title)}
    //           />
    //         )}
    //         {nextElem && (
    //           <CategoryCard
    //             cn={nextElem.title === 'Все'}
    //             onClick={() => setSearchParams(`category=${nextElem.title}`)}
    //             title={nextElem.title}
    //             value={nextElem.title}
    //             image={iconFilter(nextElem.title)}
    //           />
    //         )}
    //       </SwiperSlide>
    //     );
    //   })
    // );
    setSwiperCategories(
      categories.map((el) => {
        return (
          <SwiperSlide key={el.title}>
            <CategoryCard
              cn={el.title === 'Все'}
              onClick={() => setSearchParams(`category=${el.title}`)}
              title={el.title}
              value={el.title}
              image={iconFilter(el.title)}
            />
          </SwiperSlide>
        );
      })
    );
    // const categoriesByTwo = (array: {title: string, value: string}[]) => {
    //   // const newArray = [...array, array[0]];
    //   const size = 2;
    //   const subarray = [];
    //   for (let i = 0; i < Math.ceil(array.length / size); i++) {
    //     subarray[i] = array.slice(i * size, i * size + size);
    //   }
    //   setSwiperCategories(
    //     subarray.map((el) => {
    //       return (
    //         <SwiperSlide key={el[0].title}>
    //           <CategoryCard
    //               cn={el[0].title === 'Все'}
    //               onClick={() => setSearchParams(`category=${el[0].title}`)}
    //               title={el[0].title}
    //               value={el[0].title}
    //               image={iconFilter(el[0].title)}
    //             />
    //             {el[1] ? <CategoryCard
    //               cn={el[1].title === 'Все'}
    //               onClick={() => setSearchParams(`category=${el[1].title}`)}
    //               title={el[1].title}
    //               value={el[1].title}
    //               image={iconFilter(el[1].title)}
    //             />: null}
    //         </SwiperSlide>
    //       );
    //     })
    //   );
    // };
    // categoriesByTwo(categories);
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
      if (!cat) {
        const flattenCategories: { title: string; value: string }[] = [];
        categories.forEach((item) => {
          if (item.subcategories) {
            item.subcategories.forEach((el) => flattenCategories.push(el));
          } else {
            flattenCategories.push(item);
          }
        });
        const cuurCat = flattenCategories.find(
          (el) => el.title === searchParams.get('category')
        );
        list = list.concat(
          items.filter((item) => item.category === cuurCat?.value)
        );
      } else {
        if (cat?.subcategories) {
          for (let i = 0; i < cat.subcategories.length; i++) {
            list = list.concat(
              items.filter(
                (item) => item.category === cat.subcategories[i].value
              )
            );
          }
        } else {
          list = list.concat(
            items.filter((item) => item.category === cat?.value)
          );
        }
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
        // <ul className="store-page__categories">{categoriesList}</ul>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          // pagination={{
          //   clickable: true,
          // }}
          grid={{ rows: 2 }}
          navigation={true}
          modules={[Navigation, Grid]}
          className="store-page__categories--swiper"
        >
          {swiperCategories}
        </Swiper>
      )}
      {searchParams.size && !isCategoriesLoading ? (
        <div className="store">
          <div className="store__header">
            <h2 className="store__title">{searchParams.get('category')}</h2>
            {/* <Select
              title={'Подкатегории'}
              options={[]}
              onChange={(value) => {
                sortItems(value);
              }}
              currCategory={curCategory}
            /> */}
            <Select
              title={'Сортировка'}
              options={[
                { title: 'Сначала недорогие', value: 'min' },
                { title: 'Сначала дорогие', value: 'max' },
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

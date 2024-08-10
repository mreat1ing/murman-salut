import { FC, useMemo, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import CategoryCard from 'src/components/CategoryCard';

import './Store.scss';
import ItemList from './ItemList';

const categories = [
  {
    title: 'Хлопушки',
    value: 'Хлопушки',
    subcategories: [
      {
        title: 'Пневмохлопушки',
        value: 'Пневмохлопушки',
        subcategories: null,
      },
    ],
  },
  {
    title: 'Салюты',
    value: 'Салюты',
    subcategories: [
      {
        title: 'Одиночные салюты',
        value: 'Одиночные салюты',
        subcategories: null,
      },
      {
        title: 'Батареи салютов',
        value: 'Батареи салютов',
        subcategories: null,
      },
      {
        title: 'Дневные салюты',
        value: 'Дневные салюты',
        subcategories: null,
      },
    ],
  },
  {
    title: 'Вертушки',
    value: 'Вертушки',
    subcategories: [
      {
        title: 'Вертушки летающие',
        value: 'Вертушки летающие',
        subcategories: null,
      },
      {
        title: 'Вертушки наземные',
        value: 'Вертушки наземные',
        subcategories: null,
      },
    ],
  },
  {
    title: 'Свечи',
    value: 'Свечи',
    subcategories: [
      {
        title: 'Римские свечи',
        value: 'Римские свечи',
        subcategories: null,
      },
      {
        title: 'Бенгальские свечи',
        value: 'Бенгальские свечи',
        subcategories: null,
      },
    ],
  },
  {
    title: 'Петарды',
    value: 'Петарды',
    subcategories: null,
  },
  {
    title: 'Ракеты',
    value: 'Ракеты',
    subcategories: null,
  },
  {
    title: 'Фонтаны',
    value: 'Фонтаны',
    subcategories: null,
  },
  {
    title: 'Комби',
    value: 'Комби',
    subcategories: null,
  },

  {
    title: 'Дымы цветные',
    value: 'Дымы цветные',
    subcategories: null,
  },
  {
    title: 'Все',
    value: 'all',
    subcategories: null,
  },
];

const Store: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesList = useMemo(
    () =>
      categories.map((el) => {
        return (
          <li key={el.value}>
            <CategoryCard
              onClick={() => setSearchParams(`category=${el.value}`)}
              title={el.title}
              value={el.value}
            />
          </li>
        );
      }),
    []
  );

  return (
    <div className="store-page">
      <ul className="store-page__categories">{categoriesList}</ul>
      {searchParams.size && (
        <div className="store">
          <div className="store__header">
            <h2 className="store__title">{searchParams.get('category')}</h2>
            <select>
              <option value="" selected disabled hidden>
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

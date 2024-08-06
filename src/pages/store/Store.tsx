import { FC } from 'react';

import './Store.scss';

import CategoryCard from 'src/components/CategoryCard';

//TODO: вынести в Redux store
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

// import ItemList from 'src/components/ItemList';

const Store: FC = () => {
  return (
    <div className="store-page">
      <ul className="store-page__categories">
        {categories.map((el) => {
          return (
            <li key={el.value}>
              <CategoryCard title={el.title} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Store;

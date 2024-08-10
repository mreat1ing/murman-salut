import { FC, useEffect, useState } from 'react';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import StoreItem from 'src/components/Store/StoreItem';

import './ItemList.scss';

const tempItems: IStoreItem[] = [
  {
    _id: 'РС1705',
    category: 'Бенгальские свечи',
    hide: false,
    link: 'https://youtu.be/n9cwvZqSq2Q',
    price: 55,
    title: 'РС1705 Бенгальский огонь-170',
    value: 10,
  },
  {
    _id: 'РС1730',
    category: 'Бенгальские свечи',
    hide: false,
    link: 'https://youtu.be/gVy3SthKDnw',
    price: 160,
    title: 'РС1730 Бенгальский огонь 300 УЛЬТРА',
    value: 4,
  },
  {
    _id: 'РС1735',
    category: 'Бенгальские свечи',
    hide: false,
    link: 'https://youtu.be/DOpDWJtbewk',
    price: 275,
    title: 'РС1735 Бенгальский огонь 450 УЛЬТРА',
    value: 4,
  },
  {
    _id: 'Р4810',
    category: 'Бенгальские свечи',
    hide: false,
    link: 'https://orfvideo.synology.me/20_21/P4810.mp4',
    price: 305,
    title: 'Р4810 фонтан настольный',
    value: 4,
  },
];

const ItemList: FC = () => {
  const [items, setItems] = useState<IStoreItem[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setItems([...tempItems]);
      setLoading(false);
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  //TODO: replace with spinner or smth like that
  if (isLoading) return <h2 style={{ textAlign: 'center' }}>LOADING...</h2>;

  return (
    <ul className="store__items">
      {items &&
        items.map((el) => {
          return <StoreItem key={el._id}>{el}</StoreItem>;
        })}
    </ul>
  );
};

export default ItemList;

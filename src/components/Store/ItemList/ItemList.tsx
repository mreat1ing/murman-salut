import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IStoreItem } from 'src/interfaces/storeItem.interface';
import { IStore } from 'src/interfaces/store.interface';
import StoreItem from 'src/components/Store/StoreItem';
import { fullStorageClear } from 'src/utils/localStore.utils';

import './ItemList.scss';

const ItemList: FC = () => {
  const [items, setItems] = useState<IStoreItem[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const itemsList = useSelector(
    (state: IStore) => state.storeItemsReducer.items
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setItems([...itemsList]);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  //TODO: replace with spinner or smth like that
  if (isLoading) return <h2 style={{ textAlign: 'center' }}>LOADING...</h2>;

  return (
    <ul className="store__items">
      <button onClick={fullStorageClear}>Clear local storage</button>
      {items &&
        items.map((el) => {
          return <StoreItem key={el._id}>{el}</StoreItem>;
        })}
    </ul>
  );
};

export default ItemList;

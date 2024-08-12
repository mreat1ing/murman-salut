import { FC } from 'react';
import { useSelector } from 'react-redux';

import { IStore } from 'src/interfaces/store.interface';
import StoreItem from 'src/components/Store/StoreItem';
import { fullStorageClear } from 'src/utils/localStore.utils';

import './ItemList.scss';

const ItemList: FC = () => {
  const isItemsLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isItemsLoading
  );
  const items = useSelector((state: IStore) => state.storeItemsReducer.items);

  //TODO: replace with spinner or smth like that
  if (isItemsLoading)
    return <h2 style={{ textAlign: 'center' }}>LOADING...</h2>;

  return (
    <ul className="store__items">
      <button onClick={fullStorageClear}>Clear local storage</button>
      {items &&
        items.map((el) => {
          return <StoreItem key={el.title}>{el}</StoreItem>;
        })}
    </ul>
  );
};

export default ItemList;

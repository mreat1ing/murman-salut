import { FC } from 'react';

import StoreItem from 'src/components/Store/StoreItem';
import { fullStorageClear } from 'src/utils/localStore.utils';
import { IStoreItem } from 'src/interfaces/storeItem.interface';

import './ItemList.scss';

interface IItemListProps {
  items: IStoreItem[];
}

const ItemList: FC<IItemListProps> = ({items}) => {
  

  // //TODO: replace with spinner or smth like that
  // if (isItemsLoading) return <h2>LOADING</h2>;

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

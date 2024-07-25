import { FC } from 'react';

import { IStoreItem } from 'src/interfaces/storeItem.interface';

import './StoreItem.scss';

interface IStoreItemProps {
  children?: IStoreItem;
}

const StoreItem: FC<IStoreItemProps> = ({ children }) => {
  return <li>{children?.title}</li>;
};

export default StoreItem;

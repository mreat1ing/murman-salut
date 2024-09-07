import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import ProductCard from 'src/components/ProductCard';
import { IStore } from 'src/interfaces/store.interface';

const defaultItemData = {
  _id: 'ID',
  category: 'Category',
  hide: false,
  link: '',
  price: 0,
  title: 'Title',
  value: 0,
};

const Card: FC = () => {
  const { id } = useParams();
  const [isLoadingStarted, setIsLoadingStarted] = useState(false);
  const items = useSelector((state: IStore) => state.storeItemsReducer.items);
  const isItemsLoading = useSelector((state: IStore) => state.storeItemsReducer.isItemsLoading);
  useEffect(() => {
    setIsLoadingStarted(true);
    document.body.scrollTo({
      top: 0,
    });
    document.title = 'Страница товара - Кольский Салют';
  }, []);
  if (isItemsLoading) {
    return <ProductCard items={[]} item={defaultItemData}/>;
  }
  const item = items.filter((el) => el.title === id)[0];

  if (!isItemsLoading && !item && isLoadingStarted) {
    return <Navigate to={'/store'} />;
  }

  return (<ProductCard items={items} item={item} /> );
};

export default Card;

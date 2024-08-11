import { useDispatch } from 'react-redux';

import {
  addItem,
  setAmountCart,
  setItems,
} from 'src/store/reducers/storeItemsReducer/actions/storeItemsActions';
import { IStoreItem } from 'src/interfaces/storeItem.interface';

const useDispatchedStoreActions = () => {
  const dispatch = useDispatch();

  return {
    addItem: (item: IStoreItem) => dispatch(addItem(item)),
    setAmountCart: (count: number) => dispatch(setAmountCart(count)),
    setItems: (items: IStoreItem[]) => dispatch(setItems(items)),
  };
};

export default useDispatchedStoreActions;

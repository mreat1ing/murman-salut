import { IModalState } from 'src/store/reducers/modalReducer/modalState.interface';
import { IStoreItems } from 'src/store/reducers/storeItemsReducer/storeItems.interface';

export interface IStore {
  modalStore: IModalState;
  storeItemsReducer: IStoreItems;
}

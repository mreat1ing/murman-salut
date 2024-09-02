import { useDispatch } from 'react-redux';

import {
  setModalClose,
  setModalOpen,
  setModalType,
} from 'src/store/reducers/modalReducer/actions/modalActions';

const useDispatchedModalActions = () => {
  const dispatch = useDispatch();

  return {
    setModalClose: () => dispatch(setModalClose()),
    setModalOpen: () => dispatch(setModalOpen()),
    setModalType: (type: string) => dispatch(setModalType(type)),
  };
};

export default useDispatchedModalActions;

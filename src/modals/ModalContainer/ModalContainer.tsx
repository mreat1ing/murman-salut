import { FC, useCallback, useEffect } from 'react';

import { ISingleChildren } from 'src/interfaces/singleChildren.interface';

import './ModalContainer.scss';

interface IModalContainer extends ISingleChildren {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const bodyElement = document.querySelector('body');

const ModalContainer: FC<IModalContainer> = ({ children, onClose }) => {
  useEffect(() => {
    bodyElement?.classList.add('modal-open');

    return () => bodyElement?.classList.remove('modal-open');
  }, []);

  const handleCloseButton = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(false);
    }
  },[onClose]);

  useEffect(() => {
    window.addEventListener('keyup', handleCloseButton);

    return () => removeEventListener('keyup', handleCloseButton);
  }, [handleCloseButton]);

  return (
    <div className="modal-wrapper" onClick={() => onClose(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => onClose(false)}>
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;

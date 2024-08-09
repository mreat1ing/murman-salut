import { FC, useEffect } from 'react';

import { ISingleChildren } from 'src/interfaces/singleChildren';

import './ModalContainer.scss';

interface IModalContainer extends ISingleChildren {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContainer: FC<IModalContainer> = ({ children, onClose }) => {
  const handleCloseButton = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleCloseButton);

    return () => removeEventListener('keyup', handleCloseButton);
  }, []);

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

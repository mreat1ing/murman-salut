import { FC } from 'react';
import { createPortal } from 'react-dom';

import ModalContainer from '../ModalContainer';

import './ImageModal.scss';

interface IImageModal {
  src: string;
  alt: string;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalContainer = document.getElementById('modals');

const ImageModal: FC<IImageModal> = ({ src, alt, onClose, open }) => {
  if (open && modalContainer) {
    return createPortal(
      <ModalContainer onClose={onClose}>
        <img src={src} alt={alt} />
      </ModalContainer>,
      modalContainer
    );
  }
  return null;
};

export default ImageModal;

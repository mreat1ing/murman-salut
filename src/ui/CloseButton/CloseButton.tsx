import { FC } from 'react';

import './CloseButton.scss';

interface ICloseButton {
  handleClick: React.EventHandler<React.MouseEvent>;
}

const CloseButton: FC<ICloseButton> = ({ handleClick }) => {
  return (
    <div className="close-button" onClick={handleClick}>
      <div className="close-button__content" />
    </div>
  );
};

export default CloseButton;
import { FC } from 'react';

import './CountButtons.scss';

// interface ICountButtons {}

const CountButtons: FC = () => {
  const handleDecreaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const hadleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const handleIncreaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="count-buttons">
      <button
        className="count-buttons__button count-buttons__button-decrease"
        onClick={handleDecreaseClick}
      >
        <i className="count-buttons__icon" />
      </button>
      <input
        className="count-buttons__input"
        onClick={hadleInputClick}
        max={999}
        min={0}
        type="number"
      />
      <button
        className="count-buttons__button count-buttons__button-increase"
        onClick={handleIncreaseClick}
      >
        <i className="count-buttons__icon" />
      </button>
    </div>
  );
};

export default CountButtons;

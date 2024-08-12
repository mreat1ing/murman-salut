import { FC } from 'react';

import { MAX_INPUT } from 'src/constants/cartInputCount';

import './CountButtons.scss';

interface ICountButtons {
  value: number | string;
  minus: React.MouseEventHandler;
  plus: React.MouseEventHandler;
  input: React.ChangeEventHandler;
}

const CountButtons: FC<ICountButtons> = ({ value, minus, plus, input }) => {
  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="count-buttons">
      <button
        className="count-buttons__button count-buttons__button-decrease"
        onClick={minus}
      >
        <i className="count-buttons__icon" />
      </button>
      <input
        className="count-buttons__input"
        onClick={handleInputClick}
        onChange={input}
        max={MAX_INPUT}
        type="number"
        value={value}
      />
      <button
        className="count-buttons__button count-buttons__button-increase"
        onClick={plus}
      >
        <i className="count-buttons__icon" />
      </button>
    </div>
  );
};

export default CountButtons;

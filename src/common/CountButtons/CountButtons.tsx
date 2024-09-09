import { FC } from 'react';

import { MAX_INPUT } from 'src/constants/cartInputCount';

import './CountButtons.scss';

interface ICountButtons {
  value: number | string;
  minus: React.MouseEventHandler;
  blur: React.FocusEventHandler;
  plus: React.MouseEventHandler;
  input: React.ChangeEventHandler;
  cn?: boolean;
}

const CountButtons: FC<ICountButtons> = ({
  value,
  minus,
  plus,
  input,
  cn = false,
  blur,
}) => {
  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className={cn ? 'count-cart-buttons' : 'count-buttons'}>
      <div
        className="count-buttons__button count-buttons__button-decrease"
        onClick={minus}
      >
        <i className="count-buttons__icon" />
      </div>
      <input
        onBlur={value === '' ? blur : () => {}}
        className="count-buttons__input"
        onClick={handleInputClick}
        onChange={input}
        max={MAX_INPUT}
        type="number"
        value={value}
      />
      <div
        className="count-buttons__button count-buttons__button-increase"
        onClick={plus}
      >
        <i className="count-buttons__icon" />
      </div>
    </div>
  );
};

export default CountButtons;

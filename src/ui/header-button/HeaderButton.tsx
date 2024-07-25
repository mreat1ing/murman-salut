import { FC, ReactElement, ReactEventHandler } from 'react';

import './HeaderButton.scss';

interface IHeaderButton {
  children?: ReactElement | string;
  onMouseOver?: ReactEventHandler;
  onMouseOut?: ReactEventHandler;
}

const HeaderButton: FC<IHeaderButton> = ({
  children,
  onMouseOut,
  onMouseOver,
}) => {
  return (
    <button
      className="header-button"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
};

export default HeaderButton;

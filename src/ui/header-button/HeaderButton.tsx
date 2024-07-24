import { FC } from 'react';

import './HeaderButton.scss';

interface IHeaderButton {
  children: string;
}

const HeaderButton: FC<IHeaderButton> = ({ children }) => {
  return <button className="header-button">{children}</button>;
};

export default HeaderButton;

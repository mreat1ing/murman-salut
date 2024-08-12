import { FC, memo } from 'react';

import { ISingleChildren } from 'src/interfaces/singleChildren.interface';

import './Main.scss';

const Main: FC<ISingleChildren> = ({ children }) => {
  return <div className="middle-container">{children}</div>;
};

export default memo(Main);

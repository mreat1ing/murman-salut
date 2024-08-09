import { FC } from 'react';

import { ISingleChildren } from 'src/interfaces/singleChildren.interface';

import './Main.scss';

const Main: FC<ISingleChildren> = ({ children }) => {
  return (
    <div className="middle-container">
      <div className="background-image" />
      {children}
    </div>
  );
};

export default Main;

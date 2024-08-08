import { FC } from 'react';

import './Main.scss';

interface IMain {
  children: React.ReactElement;
}

const Main: FC<IMain> = ({ children }) => {
  return (
    <div className="middle-container">
      <div className="background-image" />
      {children}
    </div>
  );
};

export default Main;

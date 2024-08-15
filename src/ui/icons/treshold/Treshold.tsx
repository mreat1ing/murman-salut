import { FC } from 'react';

import treshold from 'src/assets/icons/treshold.svg';
import './treshold.scss';

const Treshold: FC = () => {
  return (
    <div className="icon-treshold">
      <img className="icon-treshold" width={25} height={25} src={treshold} alt="vk-logo" />
    </div>
    
  );
};

export default Treshold;
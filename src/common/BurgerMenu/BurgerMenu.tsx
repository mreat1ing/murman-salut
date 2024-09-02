import { FC } from 'react';

import burgerToggle from 'src/utils/burgerToggle.utils';
import BurgerIcon from 'src/ui/icons/BurgerIcon/BurgerIcon';


import './BurgerMenu.scss';

const BurgerMenu: FC = () => {
  return (
    <div className="burger__button" onClick={burgerToggle}>
      <BurgerIcon width={40} height={40} />
    </div>
  );
};

export default BurgerMenu;
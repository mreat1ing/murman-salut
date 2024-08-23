import { FC } from 'react';

import vk from 'src/assets/icons/vk.svg';
import './vk.scss';

const Vk: FC = () => {
  return (
    <a
      className="icon-vk"
      href="https://vk.com/kolskysalut"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img width={35} height={35} src={vk} alt="vk-logo" />
    </a>
  );
};

export default Vk;

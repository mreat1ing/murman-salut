import batary from 'src/assets/icons/categoryIcons/ico_batary.svg';
import bengal from 'src/assets/icons/categoryIcons/ico_bengal.svg';
import comb from 'src/assets/icons/categoryIcons/ico_comb.svg';
import fly from 'src/assets/icons/categoryIcons/ico_fly.svg';
import fontan from 'src/assets/icons/categoryIcons/ico_fontan.svg';
import hlop from 'src/assets/icons/categoryIcons/ico_hlop.svg';
import petardi from 'src/assets/icons/categoryIcons/ico_petardi.svg';
import roket from 'src/assets/icons/categoryIcons/ico_roket.svg';
import smoke from 'src/assets/icons/categoryIcons/ico_smoke.svg';

const iconFilter = (title: string) => {
  switch (title) {
    case 'Хлопушки':
      return hlop;
    case 'Салюты':
      return batary;
    case 'Вертушки':
      return fly;
    case 'Свечи':
      return bengal;
    case 'Петарды':
      return petardi;
    case 'Дымы цветные':
      return smoke;
    case 'Ракеты':
      return roket;
    case 'Фонтаны':
      return fontan;
    case 'Комби':
      return comb;
    default:
      return null;
  }
};

export { iconFilter };

import batary from 'src/assets/icons/categoryIcons/ico_batary.svg';
import bengal from 'src/assets/icons/categoryIcons/ico_bengal.svg';
import comb from 'src/assets/icons/categoryIcons/ico_comb.svg';
import fly from 'src/assets/icons/categoryIcons/ico_fly.svg';
import fontan from 'src/assets/icons/categoryIcons/ico_fontan.svg';
import hlop from 'src/assets/icons/categoryIcons/ico_hlop.svg';
import petardi from 'src/assets/icons/categoryIcons/ico_petardi.svg';
import roket from 'src/assets/icons/categoryIcons/ico_roket.svg';
import smoke from 'src/assets/icons/categoryIcons/ico_smoke.svg';
import rome from 'src/assets/icons/categoryIcons/ico_rome.svg';
import torch from 'src/assets/icons/categoryIcons/ico_torch.svg';
import shari from 'src/assets/icons/categoryIcons/fest-shar2.png';
import pnevmo from 'src/assets/icons/categoryIcons/iso_pnevmo.svg';
import serpantin from 'src/assets/icons/categoryIcons/iso_serpantin.svg';
import salut from 'src/assets/icons/categoryIcons/iso_soloSalut.svg';
import nofly from 'src/assets/icons/categoryIcons/iso_nofly.svg';
import daySalut from 'src/assets/icons/categoryIcons/iso_daySalut.svg';

const iconFilter = (title: string) => {
  switch (title) {
    case 'Хлопушки':
      return hlop;
    case 'Пневмохлопушки':
      return pnevmo;
    case 'Серпантин':
      return serpantin;
    case 'Салюты':
      return rome;
    case 'Одиночные салюты':
      return salut;
    case 'Вертушки летающие':
      return fly;
    case 'Вертушки наземные':
      return nofly;
    case 'Бенгальские свечи':
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
    case 'Римские свечи':
      return torch;
    case 'Батареи салютов':
      return batary;
    case 'Дневные салюты':
      return daySalut;
    default:
      return null;
  }
};

export { iconFilter };

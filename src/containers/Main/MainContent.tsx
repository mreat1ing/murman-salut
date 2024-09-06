import { FC, memo, useEffect } from 'react';

import BgVideo from 'src/common/bgVideo';
import CategoriesSpinner from 'src/components/CategoriesList';
import { removeOredered } from 'src/utils/sessionStorage.utils';

import './MainContent.scss';

const MainContent: FC = () => {
  useEffect(() => {
    removeOredered();
  }, []);
  
  return (
    <div className="main-content">
      <div className="main-content__categories">
        <CategoriesSpinner />
      </div>

      <div className="main-content__info">
        <BgVideo />
      </div>
      <div className="main-content__delivery">
        <div className="main-content__delivery-points">
          <span>Точки розничных продаж (пункты выдачи):</span>
          <p>г. Североморск Магазин «ЛАВКА ЧУДЕС» ул. Сафонова-17</p>
          <p>г. Мурманск пр. Героев Североморцев-100 а. Пункт выдачи</p>
          <p>г. Мончегорск: ул Ленина-8, маг. ФЕЙЕРВЕРКИ</p>
          <p>
            г. Мончегорск: ул. Новопроложенная - 16, ТЦ «ТАИР» 2 этаж отдел
            КАНЦЕЛЯРИЯ
          </p>
          <p>г. Апатиты магазин УПАКОШКА ул. Космонавтов -36</p>
          <p>
            г. Кандалакша Магазин «Индустрия праздника» Привокзальная площадь-1
          </p>
        </div>
        <iframe
          className="main-content__delivery-map"
          title={'Пункты выдачи заказов'}
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A45cc2f28132f945a8e0beb490436c4ca7a5e093b7d00b154d6e0aeee153425a0&amp;source=constructor"
        ></iframe>
      </div>
    </div>
  );
};

export default memo(MainContent);

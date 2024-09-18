import { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BgVideo from 'src/common/bgVideo';
import CategoriesSpinner from 'src/components/CategoriesList';
import { removeOredered } from 'src/utils/sessionStorage.utils';
import { IStore } from 'src/interfaces/store.interface';
import './MainContent.scss';
import { PLACES_COUNT } from 'src/constants/points';


const MainContent: FC = () => {
  const [link, setLink] = useState<string>('');
  const [places, setPlaces] = useState<{value: string}[]>([]);
  const isPointsLoading = useSelector(
    (state: IStore) => state.storeItemsReducer.isPointsLoading
  );
  const points = useSelector((state: IStore) => state.storeItemsReducer.points);

  useEffect(() => {
    removeOredered();
  }, []);
  useEffect(() => {
    if (typeof points['map'] !== 'undefined' && !isPointsLoading) {  
    if (points.map && points.places) {
      setLink(points.map.link);
      setPlaces(points.places);
    }    
    }
  }, [points, isPointsLoading]);

  const normalizedPlaces = places.map((el) => {
    return (<p key={el.value}>{el.value}</p>);
  });
  const skeleton = Array(PLACES_COUNT).fill('Загрузка...').map((el, i) => {
    return (<p key={i}>{el}</p>);
  });


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
          {isPointsLoading ? skeleton : normalizedPlaces}
        </div>
        <iframe
          className="main-content__delivery-map"
          title={'Пункты выдачи заказов'}
          src={link}
        ></iframe>
      </div>
    </div>
  );
};

export default memo(MainContent);

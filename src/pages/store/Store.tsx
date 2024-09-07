import { FC, useEffect } from 'react';

import Store from 'src/containers/Store';

const StorePage: FC = () => {
  useEffect(() => {
    document.body.scrollTo({
      top: 0,
    });
    document.title = 'Магазин - Кольский Салют';
  }, []);
  return <Store />;
};

export default StorePage;

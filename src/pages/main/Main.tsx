import { FC, useEffect } from 'react';

import MainContent from 'src/containers/Main/';

const MainPage: FC = () => {
  useEffect(() => {
    document.body.scrollTo({
      top: 0,
    });
    document.title = 'Кольский Салют';
  }, []);
  return <MainContent />;
};

export default MainPage;

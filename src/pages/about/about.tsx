import { FC, useEffect } from 'react';

import AboutUs from 'src/components/AboutUs';

const About: FC = () => {
  useEffect(() => {
    document.body.scrollTo({
      top: 0,
    });
    document.title = 'О компании - Кольский Салют';
  }, []);
  return <AboutUs />;
};

export default About;

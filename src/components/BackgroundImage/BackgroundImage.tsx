import { FC } from 'react';

import './BackgroundImage.scss';

interface IBackgroundImage {
  imageSrc: string;
  alt: string;
}

const BackgroundImage: FC<IBackgroundImage> = ({ imageSrc, alt }) => {
  return (
    <div className="background-image">
      <img className="background-image__image" src={imageSrc} alt={alt} />
    </div>
  );
};

export default BackgroundImage;

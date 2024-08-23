import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import videoBg from 'src/assets/video/fireworksBg.mp4';

import './BgVideo.scss';

const BgVideo: FC = () => {
  useEffect(() => {
    const component = document.querySelector('.bg-video__text-wrapper');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        component?.classList.add('render-animation');
        observer.disconnect();
      }
    });

    component && observer.observe(component);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video: HTMLVideoElement | null =
      document.querySelector('.bg-video__video');

    try {
      setTimeout(() => video?.play(), 0);
    } catch (error) {
      return;
    }
  }, []);

  return (
    <div className="bg-video">
      <div className="bg-video__video-wrapper">
        <video
          className="bg-video__video"
          preload="auto"
          playsInline
          loop
          muted
        >
          <source src={videoBg} />
        </video>
      </div>
      <div className="bg-video__text-wrapper">
        <div className="bg-video__content">
          <p className="bg-video__city shadow">Фейерверки Мурманск</p>
          <h2 className="bg-video__title shadow">Продажа<br/>проведение</h2>
          <p className="bg-video__description shadow">
            Срочная доставка от 1 часа
          </p>
          <div className="bg-video__button-wrapper"><Link to={'/store'}><button className="bg-video__button">Заказать</button></Link></div>
        </div>
      </div>
    </div>
  );
};

export default BgVideo;
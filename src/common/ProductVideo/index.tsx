/* eslint-disable no-case-declarations */
import { FC, useEffect } from 'react';

interface IProductVideoProps {
  link: string;
}

const ProductVideo: FC<IProductVideoProps> = ({ link }) => {
  useEffect(() => {
    window.addEventListener('message', function (event) {
      const message = typeof event.data === 'string' && JSON.parse(event.data);


      switch (message.type) {
        case 'player:ready':
          const element = document.getElementById(
            'rutube_video'
          ) as HTMLIFrameElement;
          if (element) {
            const contentWindow = element.contentWindow;
            contentWindow?.postMessage(
              JSON.stringify({ type: 'player:play', data: {} }),
              '*'
            );
            contentWindow?.postMessage(
              JSON.stringify({ type: 'player:mute', data: {} }),
              '*'
            );
            contentWindow?.postMessage(
              JSON.stringify({ type: 'player:setCurrentTime', data: {time: 0}}),
              '*'
            );
          }

          break;
        default: break;
      }
    });
  }, []);

  return (
    <iframe
      title="avc"
      id="rutube_video"
      className="product-card__video"
      src={link}
      allow="clipboard-write; autoplay"
      allowFullScreen
    ></iframe>
  );
};

export default ProductVideo;

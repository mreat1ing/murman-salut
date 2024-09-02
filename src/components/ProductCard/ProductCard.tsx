import { FC, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IStore } from 'src/interfaces/store.interface';
import imageIcon from 'src/assets/icons/image-icon.png';
import videoIcon from 'src/assets/icons/video-icon.png';
import placeholder from 'src/assets/img/item-placeholder.png';

import './ProductCard.scss';

const ProductCard: FC = () => {
  const [previewType, setPreviewType] = useState('image');
  const { id } = useParams();
  const item = useSelector((state: IStore) =>
    state.storeItemsReducer.items.find((el) => el.title === id)
  );
  const location = useLocation();
  const comesFrom =
    location.state?.from?.pathname + location.state?.from?.search || '/store';

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="product-card">
      <div className="product-card__preview-type">
        <button
          className={`product-card__button product-card__image-type${previewType === 'image' ? ' active' : ''}`}
          onClick={() => setPreviewType('image')}
        >
          <img width={40} height={40} src={imageIcon} alt="img" />
        </button>
        <button
          className={`product-card__button product-card__video-type${previewType === 'video' ? ' active' : ''}`}
          onClick={() => setPreviewType('video')}
        >
          <img width={30} height={30} src={videoIcon} alt="video" />
        </button>
      </div>
      <Link to={comesFrom}>
        <button className="product-card__button product-card__button-back">
          Назад
        </button>
      </Link>
      <div className={`product-card__media-container ${previewType}`}>
        {previewType === 'image' && (
          <img
            className="product-card__image"
            src={
              `https://murman-salut.ru/salut-catalog-icons/${item?.title.replace(/("+)|(;+)|(:+)/g, '')}.webp` ||
              placeholder
            }
            alt="placeholder"
          />
        )}
        {previewType === 'video' && (
          <video
            autoPlay
            className="product-card__video"
            muted
            disablePictureInPicture
            disableRemotePlayback
            controls
          >
            <source src={item?.link} type="video/mp4" />
          </video>
        )}
      </div>
      <h3 className="product-card__title">{item?.title}</h3>
    </div>
  );
};

export default ProductCard;

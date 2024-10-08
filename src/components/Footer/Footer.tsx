import { FC, memo } from 'react';

import './Footer.scss';
import Vk from 'src/ui/icons/vk';

const Footer: FC = () => {
  const curYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer__socials">
          <div className="footer__message">
            <span className="footer__message-question">
              Мы всегда готовы вам помочь.
            </span>
            <a href="mailto:salut.ks@gmail.com">Задать вопрос</a>
            <div className="footer__socials-icons">
              <Vk />
            </div>
          </div>
        </div>
        <div className="footer__info">
          <div className="footer__copyright-left">
            <span className="footer__copyright">
              © 2004–{curYear} Кольский салют 18+
            </span>
            <br />
            <span className="footer__copyright-text">
              Продажа в Мурманской области развлекательной пиротехники лучших
              российских производителей <br />
              ООО «Кольский салют», адрес местонахождения: 183040, Мурманская
              обл., г. Мурманск, ул. Александрова, д. 16, пом. 9 <br />
              Адрес для обращений пользователей:{' '}
              <a href="mailto:salut.ks@gmail.com">salut.ks@gmail.com</a>
            </span>
          </div>
          <div className="footer__contacts-right">
            <p>
              ПРОДАЖА БЫТОВОЙ ПИРОТЕХНИКИ <br />
              <a href="tel:8152702674">(8 152) 70-26-74</a>
              <a href="tel:+79113002674"> +7 911 300 26 74</a>
            </p>
            <p>
              ОРГАНИЗАЦИЯ ПИРОТЕХНИЧЕСКОГО ШОУ <br />
              <a href="tel:8152781280">(8 152) 78-12-80</a>
              <a href="tel:+79217081280"> +7 921 708 12 80</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(Footer);

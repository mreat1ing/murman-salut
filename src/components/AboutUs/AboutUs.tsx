import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import ImageModal from 'src/modals/ImageModal';
import useDispatchedModalActions from 'src/hooks/useDispatchedModalActions/useDispatchedModalActions';
import { IState } from 'src/interfaces/state.interface';

import licenseSmall from '../../assets/img/licence-small.webp';
import licenseBig from '../../assets/img/licence-big.webp';
import certificatSmall from '../../assets/img/certificate-small.webp';
import certificatBig from '../../assets/img/certificate-big.webp';
import cerKatSmall from '../../assets/img/cer-kat-small.webp';
import cerKatBig from '../../assets/img/cer-kat-big.webp';

import './AboutUs.scss';

const AboutUs: FC = () => {
  const { setModalClose, setModalOpen, setModalType } =
    useDispatchedModalActions();
  const isModalOpen = useSelector((state: IState) => state.isModalOpen);
  const modalType = useSelector((state: IState) => state.typeOfModal) || '';
  const [curModal, setCurModal] = useState('');

  const handleImage = (name: string, image: any) => {
    setModalType(name);
    setModalOpen();
    setCurModal(image);
  };

  return (
    <section className="About-us">
      <h1 className="About-us__title">О НАС</h1>
      <p className="About-us__description">
        ООО КОЛЬСКИЙ САЛЮТ осуществляет следующие виды деятельности: - оптовая и
        интернет-торговля развлекательными пиротехническими изделиями бытового
        назначения; - показ профессиональных пиротехнических шоу (высотных,
        парковых, сценических, в том числе в закрытых помещениях). Компания
        создана в 2004 году, когда и стала первой на Кольском полуострове
        гражданской лицензированной организацией, осуществляющей показы высотных
        и сценических фейерверков на профессиональной основе. Высокий уровень
        подготовки работников и использование лучших, сертифицированных
        материалов и оборудования стали залогом устойчивого развития компании и
        авторитета среди заказчиков и покупателей. Среди постоянных заказчиков
        практически все муниципалитеты и крупнейшие предприятия Мурманской
        области. С появлением в Мурманске ООО «Кольский Салют» с прилавков
        области очень быстро была вытеснена контрафактная пиротехника бытового
        назначения и сегодня по всей территории полуострова, благодаря нашей
        компании, можно найти качественную продукцию старейших и крупнейших
        отечественных производителей пиротехники из Сергиева Посада, работающих
        на научно-производственной базе НИИ ПРИКЛАДНОЙ ХИМИИ, таких как «РУССКАЯ
        ПИРОТЕХНИКА», «РУССКИЙ ФЕЙЕРВЕРК», ТРОИЦКИЙ СНАРЯЖАТЕЛЬНЫЙ ЗАВОД.
      </p>
      <p className="About-us__org-info">
        ООО «КОЛЬСКИЙ САЛЮТ» ИНН 5190123399 ОГРН 1045100153438
      </p>
      <hr />
      <p className="About-us__license">Лицензии и сертификаты</p>
      <div className="About-us__license--pics">
        <img
          src={licenseSmall}
          alt="license"
          onClick={() => handleImage('license', licenseBig)}
        />
        <img
          src={certificatSmall}
          alt="license"
          onClick={() => handleImage('certificat', certificatBig)}
        />
        <img
          src={cerKatSmall}
          alt="license"
          onClick={() => handleImage('cerKat', cerKatBig)}
        />
      </div>
      {isModalOpen && (
        <ImageModal src={curModal} alt={modalType} onClose={setModalClose} />
      )}
    </section>
  );
};

export default AboutUs;

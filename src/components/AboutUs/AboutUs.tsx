import { FC } from 'react';

import licenseSmall from '../../assets/img/licence-small.webp';
import licenseBig from '../../assets/img/licence-big.webp';
import certificatSmall from '../../assets/img/certificate-small.webp';
import certificatBig from '../../assets/img/certificate-big.webp';
import cerKatSmall from '../../assets/img/cer-kat-small.webp';
import cerKatBig from '../../assets/img/cer-kat-big.webp';
import './AboutUs.scss';

const AboutUs: FC = () => {
    return (
        <section className='About-us'>
            <h1 className='About-us__title'>О НАС</h1>
            <p className='About-us__description'>
                <span>ООО КОЛЬСКИЙ САЛЮТ осуществляет следующие виды деятельности:</span>
                - оптовая и интернет-торговля развлекательными пиротехническими изделиями бытового назначения;
                - показ профессиональных пиротехнических шоу (высотных, парковых, сценических, в том числе в закрытых помещениях).
                Компания создана в 2004 году, когда и стала первой на Кольском полуострове гражданской лицензированной организацией, 
                осуществляющей показы высотных и сценических фейерверков на профессиональной основе. Высокий уровень подготовки работников 
                и использование лучших, сертифицированных материалов и оборудования стали залогом устойчивого развития компании и 
                авторитета среди заказчиков и покупателей. Среди постоянных заказчиков практически все муниципалитеты и крупнейшие 
                предприятия Мурманской области. С появлением в Мурманске ООО «Кольский Салют» с прилавков области очень быстро была 
                вытеснена контрафактная пиротехника бытового назначения и сегодня по всей территории полуострова, благодаря нашей компании, 
                можно найти качественную продукцию старейших и крупнейших отечественных производителей пиротехники из Сергиева Посада, 
                работающих на научно-производственной базе НИИ ПРИКЛАДНОЙ ХИМИИ, таких как «РУССКАЯ ПИРОТЕХНИКА», «РУССКИЙ ФЕЙЕРВЕРК», 
                ТРОИЦКИЙ СНАРЯЖАТЕЛЬНЫЙ ЗАВОД.
            </p>
            <p className='About-us__org-info'>ООО «КОЛЬСКИЙ САЛЮТ» ИНН 5190123399 ОГРН 1045100153438</p>
            <hr />
            <p className='About-us__license'>Лицензии и сертификаты</p>
            <div className="About-us__license--pics">
                <img src={licenseSmall} alt="license" />
                <img src={certificatSmall} alt="license" />
                <img src={cerKatSmall} alt="license" />
            </div>
        </section>
    );
  };
  
  export default AboutUs;
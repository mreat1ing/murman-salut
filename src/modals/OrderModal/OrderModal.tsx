import { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import ModalContainer from 'src/modals/ModalContainer';
import {
  updateFormItems,
  getItems,
} from 'src/utils/sessionStorage.utils';

import './OrderModal.scss';

interface IOrderModal {
  handleSubmit: () => void;
  total: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalContainer = document.getElementById('modals');

const OrderModal: FC<IOrderModal> = ({ handleSubmit, total, onClose }) => {
  const formItems = getItems();
  const [name, setName] = useState<string>(formItems.name || '');
  const [phone, setPhone] = useState<string>(formItems.phone || '');
  const [email, setEmail] = useState<string>(formItems.email || '');
  const [address, setAddress] = useState<string>(formItems.address || '');
  const [age, setAge] = useState<boolean>(formItems.age || false);
  const onChange = (id: string, value: string | boolean) => {
    if (id === 'name' && typeof value === 'string') {
      setName(value);
      const formData = {
        name: value,
        phone: phone,
        email: email,
        address: address,
        age: age,
      };
      updateFormItems({ items: formData });
    }
    if (id === 'phone' && typeof value === 'string') {
      setPhone(value);
      const formData = {
        name: name,
        phone: value,
        email: email,
        address: address,
        age: age,
      };
      updateFormItems({ items: formData });
    }
    if (id === 'email' && typeof value === 'string') {
      setEmail(value);
      const formData = {
        name: name,
        phone: phone,
        email: value,
        address: address,
        age: age,
      };
      updateFormItems({ items: formData });
    }
    if (id === 'address' && typeof value === 'string') {
      setAddress(value);
      const formData = {
        name: name,
        phone: phone,
        email: email,
        address: value,
        age: age,
      };
      updateFormItems({ items: formData });
    }
    if (id === 'age' && typeof value === 'boolean') {
      setAge(value);
      const formData = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        age: value,
      };
      updateFormItems({ items: formData });
    }
  };

  if (modalContainer) {
    return createPortal(
      <ModalContainer onClose={onClose}>
        <form className={'order-modal'} onSubmit={handleSubmit}>
          <div className={'order-modal__items-wrapper'}>
            <h2 className="order-modal__title">Оформление заказа</h2>
            <div className={'order-modal__item'}>
              <label htmlFor={'name'} className={'order-modal__item-label'}>
                Имя:{' '}
              </label>
              <input
                className={'order-modal__item-input'}
                placeholder="Иванов Иван"
                id="name"
                value={name || ''}
                minLength={2}
                maxLength={30}
                required={true}
                onChange={(e) => onChange('name', e.target.value)}
              />
            </div>
            <div className={'order-modal__item'}>
              <label htmlFor="phone" className={'order-modal__item-label'}>
                Телефон:{' '}
              </label>
              <input
                className={'order-modal__item-input'}
                placeholder="+79999999999"
                type="tel"
                id="phone"
                value={phone || ''}
                minLength={11}
                maxLength={14}
                required={true}
                onChange={(e) => onChange('phone', e.target.value)}
              />
            </div>
            <div className={'order-modal__item'}>
              <label htmlFor="email" className={'order-modal__item-label'}>
                Email адрес:{' '}
              </label>
              <input
                className={'order-modal__item-input'}
                placeholder="example@email.com"
                id="email"
                value={email || ''}
                minLength={7}
                maxLength={35}
                checked={age || false}
                required={true}
                onChange={(e) => onChange('email', e.target.value)}
              />
            </div>

            <div className={'order-modal__item'}>
              <label htmlFor="address" className={'order-modal__item-label'}>
                Адрес для доставки, или самовывоз:{' '}
              </label>
              <input
                className={'order-modal__item-input'}
                placeholder="Мурманск, Ленина 12 кв 12"
                id="address"
                value={address || ''}
                minLength={5}
                maxLength={70}
                required={true}
                onChange={(e) => onChange('address', e.target.value)}
              />
            </div>
            <div className={'order-modal__item-age'}>
              <input
                className={'order-modal__item-input'}
                type="checkbox"
                id="age"
                checked={age || false}
                required={true}
                onChange={(e) => onChange('age', e.target.checked)}
              />
              <label htmlFor="age" className={'order-modal__item-label'}>
                Мне есть 18 лет{' '}
              </label>
            </div>
            <div className={'order-modal__sum'}>
              <div className="order-modal__sum-price">Итого: {total}</div>
              <button
                className={'order-modal__submit bg-video__button'}
                type="submit"
                disabled={false}
              >
                Оформить
              </button>
            </div>
          </div>
        </form>
      </ModalContainer>,
      modalContainer
    );
  }
  return null;
};

export default OrderModal;

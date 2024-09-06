import { FC, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Select.scss';

interface IOption {
  title: string;
  value: string;
  id: string;
}

interface ISelectProps {
  title: string;
  options: IOption[];
  onChange: (value: string) => void;
  currCategory: string;
}

const Select: FC<ISelectProps> = ({ title, options, onChange, currCategory }) => {
  const [value, setValue] = useState(title);
  const currRef = useRef<HTMLUListElement>(null);
  const [searchParams] = useSearchParams();
  const dropDownHandler = () => {
    currRef.current?.classList.toggle('active');
  };
  useEffect(() => {
    if (!searchParams.get('sort')) {
      setValue(title);
    }
    if (searchParams.get('category') !== currCategory) {
      currRef.current?.classList.remove('active');
    }
  }, [searchParams, title, currCategory]);

  return (
    <div className={`select${value !== title ? ' ' + 'selected' : ''}`}>
      {/* <input readOnly className='select__title' name="select" value={value} onClick={dropDownHandler} /> */}
      <button className='select__title' onClick={dropDownHandler}>{value}</button>
      <ul ref={currRef} className="select__dropdown">
        {options.map((el) => (
          <li
            className='select__item'
            key={el.id}
            id={el.id}
            onClick={() => {
              setValue(el.title);
              onChange(el.value);
              dropDownHandler();
            }}
          >
            {el.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

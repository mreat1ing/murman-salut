import { FC, useState } from 'react';

interface IInput {
  placeholder?: string;
  length?: number;
  className: string;
  initValue?: string;
  inputId: string;
  type?: string;
}

export const Input: FC<IInput> = ({
  placeholder,
  type = 'text',
  inputId,
  initValue,
  className,
  length,
}) => {
  const [value, setValue] = useState(initValue);

  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      id={inputId}
      onChange={(e) => setValue(e.target.value)}
      required={true}
      minLength={length || 2}
    />
  );
};

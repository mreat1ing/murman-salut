import { FC } from 'react';

interface IBurgerIcon {
  width?: string | number;
  height?: string | number;
  fill?: string;
  className?: string;
}

const BurgerIcon: FC<IBurgerIcon> = ({ className, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className ? className : ''}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18L20 18"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BurgerIcon;

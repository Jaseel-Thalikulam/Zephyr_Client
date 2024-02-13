import React from 'react';
import { IconProps } from '../interfaces/IiconProps';


const MicrosoftIcon: React.FC<IconProps> = ({ xmlnsXlink, ...rest }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink" // Change xmlns:xlink to xmlnsXlink
    viewBox="0 0 256 256" // Remove the comma from the viewBox attribute
    width="16"
    height="16"
  >
    <g transform="translate(-49.92,-49.92) scale(1.39,1.39)">
      <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
        <g transform="scale(5.33333,5.33333)">
          <path transform="translate(28,28) rotate(-180)" d="M6,6h16v16h-16z" fill="#ff5722"></path>
          <path transform="translate(68,28) rotate(-180)" d="M26,6h16v16h-16z" fill="#4caf50"></path>
          <path transform="translate(68,68) rotate(-180)" d="M26,26h16v16h-16z" fill="#ffc107"></path>
          <path transform="translate(28,68) rotate(-180)" d="M6,26h16v16h-16z" fill="#03a9f4"></path>
        </g>
      </g>
    </g>
  </svg>
);

export default MicrosoftIcon;
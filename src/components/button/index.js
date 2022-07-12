import React from 'react';
import s from './style.module.scss';

const Button = ({ buttonText, onClick }) => {
  return (
    <div className={s.container}>
      <button
        className={s.button}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
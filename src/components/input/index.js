import React from 'react';
import s from './style.module.scss';

const Input = ({ placeholder, value, onChange, readonly, isActive }) => {
  return (
    <div className={`${s.container} ${isActive ? s.hidden : ''}`}>
      <input
        type="number"
        className={s.input}
        placeholder={0}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
      <div className={s.borderContainer}>
        <div className={s.border}></div>
      </div>
    </div>
  );
};

export default Input;
import React, { useRef } from 'react';

import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';

import s from './style.module.scss';

const Input = ({ value, onChange, readonly }) => {
  const refContainer = useRef(null);
  const refIcon = useRef(null);
  const onClickCopyButton = () => {
    navigator.clipboard.writeText(`${value}`);
    refIcon.current.classList.remove(s.icon);
    refContainer.current.classList.remove(s.clickedCopy);
    setTimeout(() => {
      refIcon.current.classList.add(s.icon);
      refContainer.current.classList.add(s.clickedCopy);
    }, 0);
  };

  return (
    <div className={s.container} ref={refContainer}>
      <div className={s.inputContainer}>
        <input
          type="number"
          className={s.input}
          placeholder={0}
          value={value}
          onChange={onChange}
          readOnly={readonly}
        />
        <div role="presentation" className={s.copyIcon} onClick={onClickCopyButton}>
          <CopyIcon ref={refIcon} />
        </div>
      </div>
      <div className={s.borderContainer}>
        <div className={s.border} />
      </div>
    </div>
  );
};

export default Input;

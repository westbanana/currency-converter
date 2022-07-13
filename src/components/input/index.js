import React, { useState, useRef } from 'react';
import s from './style.module.scss';
import copyIcon from "../../assets/icons/copy.svg";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";

const Input = ({ value, onChange, readonly, isActive }) => {
  const [isClicked, setIsClicked] = useState(false);
  const refContainer = useRef(null);
  const refIcon = useRef(null);

  const onClickCopyButton = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(`${value}`);
    refIcon.current.classList.remove(s.icon)
    refContainer.current.classList.remove(s.clickedCopy)
    setTimeout(() => {
      refIcon.current.classList.add(s.icon);
      refContainer.current.classList.add(s.clickedCopy);
      setIsClicked(false)
    },0);
  }

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
        <button className={s.copyIcon} onClick={onClickCopyButton}>
          {/*<img alt='copy-icon' src={copyIcon}/>*/}
          <CopyIcon ref={refIcon} />
        </button>
      </div>
      <div className={s.borderContainer}>
        <div className={s.border}></div>
      </div>
    </div>
  );
};

export default Input;
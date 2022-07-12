import React, { useState, useRef } from 'react';
import s from './style.module.scss';
import copyIcon from "../../assets/icons/copy.svg";

const Input = ({ value, onChange, readonly, isActive }) => {
  const [isClicked, setIsClicked] = useState(false);
  const refContainer = useRef(null);
  const refButton = useRef(null);

  const onClickCopyButton = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(`${value}`);
    refContainer.current.classList.remove(s.clickedCopy)
    refButton.current.classList.remove(s.clickedIcon)
    setTimeout(() => {
      refContainer.current.classList.add(s.clickedCopy);
      refButton.current.classList.add(s.clickedIcon);
      setIsClicked(false)
    },0);
  }

  console.log(isClicked)

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
        <button ref={refButton} className={s.copyIcon} onClick={onClickCopyButton}>
          <img alt='copy-icon' src={copyIcon}/>
        </button>
      </div>
      <div className={s.borderContainer}>
        <div className={s.border}></div>
      </div>
    </div>
  );
};

export default Input;
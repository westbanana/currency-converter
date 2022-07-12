import React, {useEffect, useRef, useState} from 'react';
import s from './style.module.scss';
import icoOpen from  '../../assets/icons/open-select.svg'
import {useClickAway} from "react-use";

// TODO: *share url save currency and amount. readme info about project + url heroku, fixed search value initialization and swap value
const Dropdown = ({ options, value, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || {
    value: "",
    label: ""
  });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef(null);

  useClickAway(ref, () => {
    if(expanded){
      if(searchValue !== selectedOption.value){
        setSearchValue(selectedOption.value)
      }
      setExpanded(false);
    }
  });

  useEffect(() => {
    if (options.length) {
      setDropdownOptions(options)
    }
  }, [options])

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value])

  useEffect(() => {
    if (selectedOption) {
      setSearchValue(selectedOption.value)
    }
  },[selectedOption])

  const onClickOption = (item) => {
    setSelectedOption(item)
    onChange(item);
    setSearchValue(item.value);
    setExpanded(false)
  }

  const onClickInput = () => {
    setExpanded(true)
  }

  const onChangeInput = (e) => {
    setSearchValue(e.target.value)
    const filteredOptions = options.filter((item) => {
      if (item.value.toLowerCase().includes(e.target.value.toLowerCase()) || item.label.toLowerCase().includes(e.target.value.toLowerCase())) {
        return item
      }
    });
    setDropdownOptions(filteredOptions);
  }

  return (
    <div className={s.container} ref={ref}>
      <div className={s.inputContainer}>
        <input value={searchValue} className={s.input} onChange={onChangeInput} onClick={() => onClickInput()} />
        <div className={s.arrowContainer} onClick={ () => setExpanded(!expanded)}>
          <img
            src={icoOpen}
            className={`${expanded ? s.open : s.close}`}
          />
        </div>
      </div>
      {expanded && (
        <div className={s.selectMenu}>
          {dropdownOptions.length ? (
            dropdownOptions.map((item) => (
                <div key={item.value} className={s.currency} onClick={() => onClickOption(item)}>
                  <span className={s.value}>{item.value}</span>
                  <span className={s.label}>{item.label}</span>
                </div>
            ))
          ): (
            <div className={s.noOptions}>
              <span className={s.noOptionsDescription}>No options</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
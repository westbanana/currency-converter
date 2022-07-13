import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Dropdown from "../Dropdown";
import Input from "../input";
import newImage from "../../assets/icons/new-arrow.svg";

const MainScreen = () => {
  const [result, setResult] = useState(0);
  const [fromSelect, setFromSelect] = useState({});
  const [toSelect, setToSelect] = useState({});
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const refFirstArrow = useRef(null);
  const refSecondArrow = useRef(null);
  const refInput = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // TODO: QUERY URL
  const convert = (fromCurrency, toCurrency, value, callback) => {
    fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${value}`)
      .then(response => response.json())
      .then(response => callback(response.result))
  }

  const getCurrencies = () => {
    fetch('https://api.exchangerate.host/symbols')
      .then(response => response.json())
      .then(response => {
        setCurrencies(Object.values(response.symbols).map((e) => {
          if (e.code === 'USD') {
            setFromSelect({
              value: e.code,
              label: e.description,
            })
          }
          if (e.code === 'UAH') {
            setToSelect({
              value: e.code,
              label: e.description,
            })
          }
          return {
            value: e.code,
            label: e.description,
          }
        }))
      })
  }

  useEffect(() => {
    if(amount) {
      convert(fromSelect.value, toSelect.value, amount, setResult);
    }
    if (fromSelect && toSelect) {
      setSearchParams({
        from: fromSelect.value,
        to: toSelect.value
      });
    }
  },[fromSelect, toSelect])

  useEffect(() => {
    getCurrencies()
    if(searchParams.get('from') && searchParams.get('to')){
      setFromSelect(currencies[searchParams.get('from')])
      setToSelect(currencies[searchParams.get('to')])
    }
  }, [])

  const onChangeAmount = (e) => {
    if (e.target.value) {
      convert(fromSelect.value, toSelect.value, e.target.value, setResult);
    } else {
      setResult('')
    }
    setAmount(e.target.value);
  }

  const onChangeResult = (e) => {
    if (e.target.value) {
      convert(toSelect.value, fromSelect.value, e.target.value, setAmount);
    } else {
      setAmount('')
    }
    setResult(e.target.value);
  }


  const swapCurrency = () => {
    setFromSelect(toSelect);
    setToSelect(fromSelect);
    if (amount) {
      convert(toSelect.value, fromSelect.value, amount, setResult);
    }
    refFirstArrow.current.classList.remove('first-arrow-rotate');
    refSecondArrow.current.classList.remove('second-arrow-rotate');
    setTimeout(() => {
      refFirstArrow.current.classList.add('first-arrow-rotate');
      refSecondArrow.current.classList.add('second-arrow-rotate');
    }, 0)
  }

  return (
    <div className="App">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className='container'>
        <div className='fromContainer'>
          <Dropdown
            options={currencies}
            onChange={setFromSelect}
            value={fromSelect}
          />
          <div className="inputContainer">
            <Input  placeholder={0} value={amount} onChange={onChangeAmount} />
          </div>
        </div>
        <div className='arrow-container' onClick={swapCurrency}>
          <img alt='arrow' ref={refFirstArrow} src={newImage} className='first-arrow' />
          <img alt='arrow' ref={refSecondArrow} src={newImage} className='second-arrow' />
        </div>
        <div className='toContainer'>
          <Dropdown
            options={currencies}
            onChange={setToSelect}
            value={toSelect}
          />
          <div className="inputContainer">
            <Input value={result} onChange={onChangeResult}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
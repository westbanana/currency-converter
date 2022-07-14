import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import newImage from 'assets/icons/new-arrow.svg';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';

const MainScreen = () => {
  const [result, setResult] = useState(0);
  const [fromSelect, setFromSelect] = useState({});
  const [toSelect, setToSelect] = useState({});
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const refFirstArrow = useRef(null);
  const refSecondArrow = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const convert = (fromCurrency, toCurrency, value, callback) => {
    if (value) {
      fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${value}`)
        .then((response) => response.json())
        .then((response) => callback(response.result));
    }
  };

  const setDefaultCurrencies = (tickers) => {
    if (searchParams.get('from')) {
      const fromTicker = tickers[searchParams.get('from')];
      if (fromTicker) {
        setFromSelect({
          value: fromTicker.code,
          label: fromTicker.description,
        });
      } else if (tickers.USD) {
        setFromSelect({
          value: tickers.USD.code,
          label: tickers.USD.description,
        });
      }
    } else if (tickers.USD) {
      setFromSelect({
        value: tickers.USD.code,
        label: tickers.USD.description,
      });
    }

    if (searchParams.get('to')) {
      const toTicker = tickers[searchParams.get('to')];
      if (shit) {
        setToSelect({
          value: toTicker.code,
          label: toTicker.description,
        });
      } else if (tickers.UAH) {
        setToSelect({
          value: tickers.UAH.code,
          label: tickers.UAH.description,
        });
      }
    } else if (tickers.UAH) {
      setToSelect({
        value: tickers.UAH.code,
        label: tickers.UAH.description,
      });
    }

    if (searchParams.get('amount')) {
      setAmount(searchParams.get('amount'));
    } else {
      setAmount(1);
    }
  };

  const getCurrencies = () => {
    fetch('https://api.exchangerate.host/symbols')
      .then((response) => response.json())
      .then((response) => {
        setDefaultCurrencies(response.symbols);
        setCurrencies(
          Object.values(response.symbols).map((e) => ({
            value: e.code,
            label: e.description,
          })),
        );
      });
  };

  useEffect(() => {
    if (amount) {
      convert(fromSelect.value, toSelect.value, amount, setResult);
    }
    if (fromSelect && toSelect) {
      setSearchParams({
        from: fromSelect.value,
        to: toSelect.value,
        amount,
      });
    }
  }, [fromSelect, toSelect, amount]);

  useEffect(() => {
    getCurrencies();
  }, []);

  const onChangeAmount = (e) => {
    if (e.target.value) {
      convert(fromSelect.value, toSelect.value, e.target.value, setResult);
    } else {
      setResult('');
    }
    setAmount(e.target.value);
  };

  const onChangeResult = (e) => {
    if (e.target.value) {
      convert(toSelect.value, fromSelect.value, e.target.value, setAmount);
    } else {
      setAmount('');
    }
    setResult(e.target.value);
  };

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
    }, 0);
  };

  return (
    <div className="App">
      <div className="area">
        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div className="container">
        <div className="fromContainer">
          <Dropdown
            options={currencies}
            onChange={setFromSelect}
            value={fromSelect}
          />
          <div className="inputContainer">
            <Input placeholder={0} value={amount} onChange={onChangeAmount} />
          </div>
        </div>
        <div role="presentation" className="arrow-container" onClick={swapCurrency}>
          <img alt="arrow" ref={refFirstArrow} src={newImage} className="first-arrow" />
          <img alt="arrow" ref={refSecondArrow} src={newImage} className="second-arrow" />
        </div>
        <div className="toContainer">
          <Dropdown
            options={currencies}
            onChange={setToSelect}
            value={toSelect}
          />
          <div className="inputContainer">
            <Input value={result} onChange={onChangeResult} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

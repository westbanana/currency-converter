import './App.css';
import React, {useEffect, useRef, useState} from "react";
import Input from "./components/input";
import newImage from "./assets/icons/new-arrow.svg";
import copyIcon from "./assets/icons/copy.svg";
import Dropdown from "./components/Dropdown";
import Select from "react-select/base";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

function App() {
  const [result, setResult] = useState(0);
  const [fromSelect, setFromSelect] = useState({});
  const [toSelect, setToSelect] = useState({});
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const refFirstArrow = useRef(null);
  const refSecondArrow = useRef(null);
  const refCopy = useRef(null)

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
    getCurrencies()
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
    refFirstArrow.current.classList.remove('first-arrow-rotate')
    refSecondArrow.current.classList.remove('second-arrow-rotate')
    setTimeout(() => {
      refFirstArrow.current.classList.add('first-arrow-rotate')
      refSecondArrow.current.classList.add('second-arrow-rotate')
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
            <button className={`${isClicked ? 'clickedIcon' : 'copyIcon'}`} onClick={() => {
              navigator.clipboard.writeText(`${amount}`);
              setIsClicked(true);
              setTimeout(() => {
                setIsClicked(false)
              },300);
            }}>
              <img alt='copy-icon' src={copyIcon}/>
            </button>
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
            <button  className={`${isClicked ? 'clickedIcon' : 'copyIcon'}`} onClick={() => {
              navigator.clipboard.writeText(`${result}`);
              setIsClicked(true);
              setTimeout(() => {
                setIsClicked(false)
              },300);
            }}>
              <img alt='copy-icon' src={copyIcon}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

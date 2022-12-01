import { useState, useEffect } from 'react';
import { BsCurrencyExchange } from 'react-icons/bs';
import Switcher from './Switcher';
import styles from './CurrencyCalc.module.css';

function CurrencyCalc({
  currencyCode,
  currencyRow,
  getCurrencyCode,
  sumChange,
  getSum,
  convertWayTo,
  changeConvertWayto,
  calculate,
  total,
}) {
  const [currencyEnter, setCurrencyEnter] = useState(currencyCode);
  const [sumEnter, setSumEnter] = useState(sumChange);
  const [currencyNameEnter, setCurrencyNameEnter] = useState('');

  useEffect(() => {
    setCurrencyEnter(currencyCode);
  }, [currencyCode]);

  useEffect(() => {
    setCurrencyNameEnter(() => {
      if (Object.keys(currencyRow).length !== 0) {
        return `rate is ${currencyRow.Value}/${currencyRow.Nominal}`;
      }
    });
  }, [currencyRow]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    calculate(currencyEnter);
  };

  const sumName = () => (convertWayTo ? 'RUB' : currencyEnter);
  const totalName = () => (!convertWayTo ? 'RUB' : currencyEnter);

  const changeConvertWay = () => {
    setSumEnter(0);
    changeConvertWayto();
  };

  return (
    <div className={styles.calc}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <label>
          Enter currency code
          <div className={styles.input}>
            <input
              type="text"
              value={currencyEnter}
              onChange={(e) => setCurrencyEnter(e.target.value.toUpperCase())}
              onBlur={() => getCurrencyCode(currencyEnter)}
            />
            <span>{currencyNameEnter}</span>
          </div>
        </label>
        <label>
          Enter sum
          <div className={styles.input}>
            <input
              type="text"
              value={sumEnter}
              onChange={(e) => setSumEnter(+e.target.value)}
              onBlur={() => getSum(sumEnter)}
            />
            <span>{sumName()}</span>
          </div>
        </label>
        <Switcher
          convertTo={convertWayTo}
          changeConvert={() => changeConvertWay()}
        />
        <button type="submit" className={styles.btn}>
          <BsCurrencyExchange />
        </button>
      </form>
      <div className={styles.total}>
        {total.toFixed(2)}
        <span>{totalName()}</span>
      </div>
    </div>
  );
}
export default CurrencyCalc;

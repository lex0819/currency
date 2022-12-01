import { useState, useEffect } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import CurrencyTable from './CurrencyTable';
import CurrencyCalc from './CurrencyCalc';
import styles from './Currency.module.css';
// import data from './data/cbr';

function Currency() {
  const [rates, setRates] = useState([]); //table currency list
  const [date, setDate] = useState(''); //actual date of course
  const [error, setError] = useState(''); //error of upload
  const [isLoading, setIsLoading] = useState(true); //loader while uploading
  const [currency, setCurrency] = useState(''); //user's choice of currency for culculate
  const [sum, setSum] = useState(0); // user's enter how mutch he want to change
  const [total, setTotal] = useState(0); //result of calculating
  const [convertWay, setConvertWay] = useState(false); //from RUB to currency or back
  const [currencyRow, setCurrencyRow] = useState({});

  //async upload DATA from server CentroBank of Russia
  const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
  const jsonCurrency = async () => {
    try {
      const servRes = await fetch(url);
      const jsonRes = await servRes.json();
      const currencyRes = await jsonRes.Valute;
      const curDate = await jsonRes.Date;
      const currencyArray = Object.values(currencyRes);
      setRates(currencyArray);
      setDate(curDate);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    jsonCurrency();
  }, []);

  //set inputs on Calculator
  function getCurrencyCodeHandler(currencyCode) {
    setCurrency(currencyCode);
    const findCode = findCodeHandler(currencyCode);
    if (findCode) {
      setCurrencyRow(findCode);
    }
  }
  function getSumHandler(sum) {
    setSum(sum);
  }

  //find row of choising currency
  function findCodeHandler(currency) {
    return rates.find((rate) => {
      return rate.CharCode === currency;
    });
  }

  //calculate total price
  const calculateHandler = (currency) => {
    const findCode = findCodeHandler(currency);
    if (findCode) {
      if (!convertWay) {
        setTotal((sum / findCode.Nominal) * findCode.Value);
      } else {
        setTotal((sum * findCode.Nominal) / findCode.Value);
      }
    } else {
      setTotal(0);
      setCurrency('');
    }
  };

  //change exchnge direction rub->cur or cur->rub
  const changeConvertWayHandler = () => {
    setConvertWay(!convertWay);
    setSum(0);
    setTotal(0);
  };

  return (
    <>
      <h2 className={styles.header}>
        Currency exchange rate from the official website of the Central Bank of
        the Russian Federation for <span>{date.substring(0, 10)}</span>
      </h2>
      {isLoading && (
        <h2>
          <ImSpinner6 className={styles.spinner} />
        </h2>
      )}
      {error && <h2>Server doesn't response. Error: {error}</h2>}
      {rates && (
        <div className={styles.container}>
          <CurrencyTable
            rates={rates}
            getCurrencyCode={getCurrencyCodeHandler}
          />
          <CurrencyCalc
            currencyRow={currencyRow}
            currencyCode={currency}
            getCurrencyCode={getCurrencyCodeHandler}
            sumChange={sum}
            getSum={getSumHandler}
            convertWayTo={convertWay}
            changeConvertWayto={changeConvertWayHandler}
            calculate={calculateHandler}
            total={total}
          />
        </div>
      )}
    </>
  );
}
export default Currency;

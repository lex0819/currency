import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CurrencyList from '../store/cbrf.js';
import { ImSpinner6 } from 'react-icons/im';
import CurrencyTable from './CurrencyTable.jsx';
import CurrencyCalc from './CurrencyCalc.jsx';
import styles from './Currency.module.css';
// import data from './data/cbr';

function Currency() {
  useEffect(() => {
    // console.log('from useEffect');
    CurrencyList.jsonCurrency(CurrencyList.url);
  }, []);

  return (
    <>
      <h2 className={styles.header}>
        Currency exchange rate from the official website of the Central Bank of
        the Russian Federation for
        <span>{CurrencyList.date.substring(0, 10)}</span>
      </h2>
      {CurrencyList.isLoading && (
        <h2>
          <ImSpinner6 className={styles.spinner} />
        </h2>
      )}
      {CurrencyList.error && (
        <h2>Server doesn't response. Error: {CurrencyList.error}</h2>
      )}
      {CurrencyList.rates && (
        <div className={styles.container}>
          <CurrencyTable />
          <CurrencyCalc />
        </div>
      )}
    </>
  );
}
export default observer(Currency);

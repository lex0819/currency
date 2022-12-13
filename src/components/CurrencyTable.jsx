import { observer } from 'mobx-react-lite';
import CurrencyList from '../store/cbrf.js';
import Row from './Row.jsx';
import styles from './CurrencyTable.module.css';

function CurrencyTable() {
  const setNewCurrency = (choicedCurrency) => {
    CurrencyList.choicedCurrency = choicedCurrency;
    CurrencyList.choicedCurrencyData = CurrencyList.findCodeHandler(
      choicedCurrency,
      CurrencyList.rates
    );
    // console.log(CurrencyList.choicedCurrencyData);
    CurrencyList.showAllCurrency = !CurrencyList.showAllCurrency;
  };

  return (
    <>
      {
        /* CurrencyList.showAllCurrency && */ <table
          className={`${styles.table} ${
            CurrencyList.showAllCurrency ? styles.table_active : ''
          }`}
        >
          <thead>
            <tr>
              <td>Name</td>
              <td>Code</td>
              <td>rub</td>
              <td>currency</td>
            </tr>
          </thead>
          <tbody>
            {CurrencyList.rates.map((currency) => (
              <Row
                key={currency.CharCode}
                {...currency}
                getCurrency={setNewCurrency}
              />
            ))}
          </tbody>
        </table>
      }
    </>
  );
}
export default observer(CurrencyTable);

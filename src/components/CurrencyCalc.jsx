import { observer } from 'mobx-react-lite';
import CurrencyList from '../store/cbrf.js';
import Switcher from './Switcher.jsx';
import styles from './CurrencyCalc.module.css';

function CurrencyCalc() {
  const sumName = () =>
    CurrencyList.convertWay ? 'RUB' : CurrencyList.choicedCurrency;
  const totalName = () =>
    !CurrencyList.convertWay ? 'RUB' : CurrencyList.choicedCurrency;

  return (
    <div className={styles.calc}>
      <label>
        Choose currency
        <div className={styles.input}>
          <div
            onClick={() => CurrencyList.setShowAllCurrency()}
            className={styles.fakeInput}
          >
            <strong>{CurrencyList.choicedCurrency}</strong>
            <span>
              {CurrencyList.choicedCurrencyData.Value} /
              {CurrencyList.choicedCurrencyData.Nominal}
            </span>
          </div>
          <span>{CurrencyList.choicedCurrencyData.Name}</span>
        </div>
      </label>
      <label>
        Enter sum
        <div className={styles.input}>
          <input
            type="text"
            value={CurrencyList.sum}
            onChange={(e) => CurrencyList.setSum(+e.target.value)}
          />
          <span>{sumName()}</span>
        </div>
      </label>
      <Switcher />
      <div className={styles.total}>
        {CurrencyList.total.toFixed(2)}
        <span>{totalName()}</span>
      </div>
    </div>
  );
}
export default observer(CurrencyCalc);

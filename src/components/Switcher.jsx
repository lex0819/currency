import { observer } from 'mobx-react-lite';
import CurrencyList from '../store/cbrf.js';
import styles from './Switcher.module.css';

function Switcher() {
  return (
    <div className={styles.container}>
      <div className={styles.switchBox}>
        <span id="off">{`Currency to RUB`}</span>
        <label className={styles.switcher}>
          <input
            type="checkbox"
            checked={CurrencyList.convertWay}
            onChange={() => CurrencyList.changeConvertWay()}
          />
          <span className={styles.slider}></span>
        </label>
        <span id="on">{`RUB to Currency`}</span>
      </div>
    </div>
  );
}
export default observer(Switcher);

import styles from './Switcher.module.css';

function Switcher({ convertTo, changeConvert }) {
  return (
    <div className={styles.container}>
      <div className={styles.switchBox}>
        <span id="off">{`Currency to RUB`}</span>
        <label className={styles.switcher}>
          <input
            type="checkbox"
            checked={convertTo}
            onChange={() => changeConvert()}
          />
          <span className={styles.slider}></span>
        </label>
        <span id="on">{`RUB to Currency`}</span>
      </div>
    </div>
  );
}
export default Switcher;

import Row from './Row';
import styles from './CurrencyTable.module.css';

function CurrencyTable({ rates, getCurrencyCode }) {
  /* const getCurrency = (x) => {
    console.log(x);
    return x;
  }; */
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Code</td>
          <td>rub</td>
          <td>currency</td>
        </tr>
      </thead>
      <tbody>
        {rates.map((currency) => (
          <Row
            key={currency.CharCode}
            {...currency}
            getCurrency={getCurrencyCode}
          />
        ))}
      </tbody>
    </table>
  );
}
export default CurrencyTable;

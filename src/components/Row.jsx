import CurrencyList from '../store/cbrf.js';

function Row({ CharCode, Name, Value, Nominal, getCurrency }) {
  const isChoicedCurrency = () => {
    return CurrencyList.choicedCurrency === CharCode;
  };

  return (
    <tr
      onClick={() => getCurrency(CharCode)}
      style={
        isChoicedCurrency()
          ? { backgroundColor: 'lightpink' }
          : { backgroundColor: '' }
      }
    >
      <td style={{ width: 150 + 'px' }}>{Name}</td>
      <td style={{ width: 30 + ' px' }}>{CharCode}</td>
      <td style={{ width: 50 + 'px' }}>{Value}</td>
      <td style={{ width: 50 + 'px' }}>{Nominal}</td>
    </tr>
  );
}
export default Row;

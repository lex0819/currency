function Row({ CharCode, Name, Value, Nominal, getCurrency }) {
  return (
    <tr onClick={() => getCurrency(CharCode)}>
      <td style={{ width: 150 + 'px' }}>{Name}</td>
      <td style={{ width: 30 + ' px' }}>{CharCode}</td>
      <td style={{ width: 50 + 'px' }}>{Value}</td>
      <td style={{ width: 50 + 'px' }}>{Nominal}</td>
    </tr>
  );
}
export default Row;

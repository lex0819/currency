import { useEffect } from 'react';

function Test() {
  useEffect(() => {
    console.log('Hi from Test useEffect');
  }, []);
  return <div>test</div>;
}
export default Test;

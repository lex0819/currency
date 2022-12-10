import { makeAutoObservable } from 'mobx';
class CurrencyList {
  url = 'https://www.cbr-xml-daily.ru/daily_json.js';

  rates = []; //массив всех валют, каждая валюта один объект в строку
  date = ''; //дата с сервиса ЦБРФ
  error = ''; //ошибка загрузки
  isLoading = true; //спиннер пока загружается если медленно
  choicedCurrency = 'USD'; //доллар США выбран по дефолту
  choicedCurrencyData = {}; //вся строка с долларом и другой валютой
  sum = 0; //сумма для обмена, вводит пользователь
  convertWay = false; //куда менять с рублей в валюту или наоборот с валюты в рубли
  showAllCurrency = false; //показать/скрыть всю таблицу с валютами

  constructor() {
    makeAutoObservable(this);
  }

  //find row of choising currency
  findCodeHandler(currency, rates) {
    return rates.find((rate) => {
      return rate.CharCode === currency;
    });
  }

  //async upload DATA from server CentroBank of Russia
  //загрузка делается один раз в головном компоненте Currency в хуке useEffect()
  //сразу заполняю весь store, все поля класса, чтоб потом ото всюду брать данные
  async jsonCurrency(url) {
    try {
      const servRes = await fetch(url);
      const jsonRes = await servRes.json();
      const currencyRes = await jsonRes.Valute;
      const curDate = await jsonRes.Date;
      const currencyArray = Object.values(currencyRes);
      this.rates = [...currencyArray];
      this.date = curDate;
      this.choicedCurrencyData = this.findCodeHandler(
        this.choicedCurrency,
        this.rates
      );
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  //calculate total price match function 'get' it's auto calculate
  get total() {
    if (!this.convertWay) {
      return (
        (this.sum / this.choicedCurrencyData.Nominal) *
        this.choicedCurrencyData.Value
      );
    } else {
      return (
        (this.sum * this.choicedCurrencyData.Nominal) /
        this.choicedCurrencyData.Value
      );
    }
  }

  //change exchnge direction rub->cur or cur->rub
  changeConvertWay() {
    this.convertWay = !this.convertWay;
    this.sum = 0;
  }

  //set sum
  setSum(newSum) {
    this.sum = newSum;
  }

  //change show/hide table of currency
  setShowAllCurrency() {
    this.showAllCurrency = !this.showAllCurrency;
  }
}
export default new CurrencyList();

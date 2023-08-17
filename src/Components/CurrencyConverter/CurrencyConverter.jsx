import './CurrencyConverter.css';
import { useContext, useState } from 'react';
import CurrencyContext from '../Functionality/CurrencyContext';

export default function CurrencyConverter() {
  const [convertAmount, setConvertAmount] = useState(Number);
  const [from, setFrom] = useState(undefined);
  const [to, setTo] = useState(undefined);
  const [value, setValue] = useState('');
  const { rates, wallets, setWallets } = useContext(CurrencyContext);
  const walletNames = Object.keys(wallets);

  function format(num) {
    return parseInt(num, 10);
  }

  function convert() {
    setValue(format((convertAmount * rates[to]) / rates[from]));
  }

  function transfer() {
    if (convertAmount > wallets[from].balance) {
      setValue('Balance is too low to transfer');
    } else {
      setWallets((oldWallet) => {
        return {
          ...oldWallet,
          [to]: {
            ...wallets[to],
            balance:
              wallets[to].balance +
              format((convertAmount * rates[to]) / rates[from]),
          },
        };
      });
      setWallets((oldWallet) => {
        return {
          ...oldWallet,
          [from]: {
            ...wallets[from],
            balance: wallets[from].balance - convertAmount,
          },
        };
      });
    }
  }

  return (
    <form className="currencyConverter_container">
      <div className="converter">
        <div className="amount">
          <h5>Amount</h5>
          <input
            type="text"
            placeholder="How much do you want to convert"
            className="converter_input"
            onChange={(e) => {
              e.preventDefault();
              setConvertAmount(e.target.value);
            }}
          />
        </div>
        <div className="from">
          <h5 key={walletNames?.sign}>From</h5>
          <select
            name="Currencies"
            id="currencyFrom"
            className="converter_input"
            value={from}
            onChange={(e) => {
              e.preventDefault();
              setFrom(e.target.value);
            }}
          >
            <option disabled selected defaultValue>
              Select Currency
            </option>
            {walletNames.map((wallet) => {
              return (
                <option value={wallet} key={wallet.sign}>
                  {wallet}
                </option>
              );
            })}
          </select>
        </div>
        <div className="icon">
          <i className="fa fa-arrows-h" id="fontAw" />
        </div>
        <div className="to">
          <h5>To</h5>
          <select
            name="Currencies"
            id="currencyTo"
            className="converter_input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option disabled selected defaultValue>
              Select Currency
            </option>
            {walletNames.map((wallet) => {
              return (
                <option value={wallet} key={wallet.sign}>
                  {wallet}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="btnElt">
        <button type="button" id="convertBtn" onClick={convert}>
          convert
        </button>
        <button type="button" id="transferBtn" onClick={transfer}>
          transfer
        </button>
      </div>
      <div className="displayConverted">{value}</div>
    </form>
  );
}

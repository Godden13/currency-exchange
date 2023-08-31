import { useState, useContext, useMemo } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import AddCurrency from '../AddCurrency/AddCurrency';
import CurrencyCard from '../CurrencyCards/CurrencyCard';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import CurrencyContext from '../Functionality/CurrencyContext';
import './Wallet.css';

export default function Wallet() {
  const { rates, wallets } = useContext(CurrencyContext);
  const walletNames = Object.keys(wallets);
  const [defaultWallet, setDefaultWallet] = useState(wallets.USD.sign);
  const [darkMode, setDarkMode] = useState(false);

  const mainBalance = useMemo(() => {
    let newBalance = 0;
    Object.values(wallets).forEach((wallet) => {
      newBalance +=
        (wallet.balance * rates[defaultWallet]) / rates[wallet.sign];
    });
    return newBalance;
  }, [wallets, rates, defaultWallet]);

  function format(num) {
    return Math.ceil(num);
  }

  return (
    <div className="wallet_container">
      <header className="head">
        <span />
        <h1>Basic Wallet</h1>
        {darkMode ? (
          <FaSun
            className="theme-icon-sun"
            title="switch to  mode"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          />
        ) : (
          <FaMoon
            className="theme-icon-moon"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            title="switch to Dark mode"
          />
        )}
      </header>
      <div className="wallet_header">
        <h3>
          {format(mainBalance)}
          <select
            onChange={(e) => {
              setDefaultWallet(e.target.value);
            }}
          >
            {walletNames.map((def) => (
              <option key={def.name}>{def}</option>
            ))}
          </select>
        </h3>
        <div className="converter">
          <CurrencyConverter />
        </div>
      </div>
      <div className="wallet_currency_balance">
        <CurrencyCard />
      </div>
      <AddCurrency />
    </div>
  );
}

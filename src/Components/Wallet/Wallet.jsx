/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { useState, useContext, useMemo } from 'react';
import AddCurrency from '../AddCurrency/AddCurrency';
import CurrencyCard from '../CurrencyCards/CurrencyCard';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import CurrencyContext from '../Functionality/CurrencyContext';
import './Wallet.css';

export default function Wallet() {
  const { rates, wallets, setWallets } = useContext(CurrencyContext);
  const walletNames = Object.keys(wallets);
  const [defaultWallet, setDefaultWallet] = useState(wallets.USD.sign);

  const mainBalance = useMemo(() => {
    let newBalance = 0;
    Object.values(wallets).forEach((wallet) => {
      newBalance +=
        (wallet.balance * rates[defaultWallet]) / rates[wallet.sign];
    });
    return newBalance;
  }, [wallets, rates, setWallets]);

  function format(num) {
    return parseInt(num, 10);
  }

  return (
    <div className="wallet_container">
      <h1>Basic Wallet</h1>
      <div className="wallet_header">
        <h3>
          {format(mainBalance)}
          <select
            onChange={(e) => {
              setDefaultWallet(e.target.value);
            }}
          >
            {walletNames.map((def, index) => (
              <option key={index}>{def}</option>
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

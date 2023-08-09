import { useContext } from 'react';
import CurrencyContext from '../Functionality/CurrencyContext';
import './CurrencyCard.css';

export default function CurrencyCard() {
  const { wallets } = useContext(CurrencyContext);
  const walletNames = Object.values(wallets);

  return (
    <div className="currencyCard">
      {walletNames.map((wallet) => {
        return (
          <div className="currencyCard_part" key={wallet.sign}>
            <h3>{wallet.sign}</h3>
            <h4>{wallet.balance}</h4>
          </div>
        );
      })}
    </div>
  );
}

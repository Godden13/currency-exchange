/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import CurrencyContext from './Components/Functionality/CurrencyContext';
import Wallet from './Components/Wallet/Wallet';

function App() {
  const [rates, setRates] = useState({});
  const [wallets, setWallets] = useState({
    USD: {
      sign: 'USD',
      balance: 10000,
    },
    EUR: {
      sign: 'EUR',
      balance: 10000,
    },
    XAF: {
      sign: 'XAF',
      balance: 10000,
    },
  });

  const values = useMemo(
    () => ({ rates, wallets, setWallets }),
    [wallets, rates, setWallets]
  );

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: { accept: 'application/json' },
      };

      await fetch(
        'https://api.fastforex.io/fetch-all?from=USD&api_key=83fc203d94-0d03e481a1-rqkck6',
        options
      )
        .then((response) => response.json())
        .then((response) => setRates(response.results))
        .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <CurrencyContext.Provider value={values}>
        <Wallet />
      </CurrencyContext.Provider>
    </div>
  );
}

export default App;

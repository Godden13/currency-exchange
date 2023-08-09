/* eslint-disable no-console */
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import CurrencyContext from './Components/Functionality/CurrencyContext';
import Wallet from './Components/Wallet/Wallet';

function App() {
  const [rates, setRates] = useState({});
  const [wallets, setWallets] = useState({
    USD: {
      sign: 'USD',
      balance: 0,
    },
    EUR: {
      sign: 'EUR',
      balance: 0,
    },
    XAF: {
      sign: 'XAF',
      balance: 0,
    },
  });

  const values = useMemo(
    () => ({ rates, wallets, setWallets }),
    [wallets, rates, setWallets]
  );

  // Fetch the api from apilayer.com

  useEffect(async () => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append('apikey', '509oS1FzzvlWgMtCfc0aLcUPNWisEsqe');

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };

      await fetch(
        'https://api.apilayer.com/fixer/latest?base=usd',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setRates(result.rates));
      // .catch((error) => console.log('error', error));
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

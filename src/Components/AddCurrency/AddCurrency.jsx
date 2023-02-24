/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext } from 'react';
import CurrencyContext from '../Functionality/CurrencyContext';
import './AddCurrency.css';

export default function AddCurrency() {
  const [add, setAdd] = useState(false);
  const { rates, setWallets } = useContext(CurrencyContext);
  const realRates = Object.keys(rates);

  const toggleAdd = () => {
    setAdd(!add);
  };

  const addWallet = (newWallet, newAmount) => {
    setWallets((oldWallet) => {
      return {
        ...oldWallet,
        [newWallet]: {
          sign: newWallet,
          balance:
            (oldWallet[newWallet]?.balance || 0) + parseInt(newAmount, 10),
        },
      };
    });
  };

  return (
    <div className="addCurrency">
      <button type="button" onClick={toggleAdd} className="add-btn">
        Add Wallet
      </button>

      {add && (
        <form
          className="modal"
          onSubmit={(e) => {
            e.preventDefault();
            addWallet(e.target.addWallet.value, e.target.amount.value);
          }}
        >
          <div className="overlay">
            <div className="rr">
              <h2>Add/Modify Wallet</h2>
              <div className="inputs">
                <input type="number" id="amount" />
                <select name="add-wallet" id="addWallet">
                  <option selected disabled value>
                    Select Currency
                  </option>
                  {realRates.map((realRate) => {
                    return (
                      <option value={realRate} key={realRate}>
                        {realRate}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="addBtn">
                <button type="submit">Add</button>
                <button className="close-btn" type="button" onClick={toggleAdd}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

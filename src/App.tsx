import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import CryptoList from './components/CryptoList';
import CurrencySelector from './components/CurrencySelector';
import Footer from './components/Footer';
import ExchangeBanner from './components/ExchangeBanner';
import { fetchCryptoPrices } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currency, setCurrency] = useState<string>('USD');
  const [prices, setPrices] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchPrices = async () => {
      const data = await fetchCryptoPrices(currency);
      setPrices(data);
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [currency]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <h1>Crypto Price Pocket</h1>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
      <div className="main-content">
        <CryptoList prices={prices} currency={currency} />
      </div>
      <div className="fixed-bottom-section">
        <ExchangeBanner />
        <Footer />
      </div>
    </div>
  );
};

export default App;
import React from 'react';
import './CurrencySelector.css';

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onCurrencyChange }) => {
  const currencies = ['USD', 'CAD', 'EUR', 'AUD', 'JPY'];

  return (
    <div className="currency-selector">
      {currencies.map((curr) => (
        <button
          key={curr}
          className={`currency-icon ${currency === curr ? 'active' : ''}`}
          onClick={() => onCurrencyChange(curr)}
        >
          {curr}
        </button>
      ))}
    </div>
  );
};

export default CurrencySelector;
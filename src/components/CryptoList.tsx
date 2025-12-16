import React from 'react';
import './CryptoList.css';
import coinsData from '../data/coins.json';

interface CryptoListProps {
  prices: Record<string, any>;
  currency: string;
}

const CryptoList: React.FC<CryptoListProps> = ({ prices, currency }) => {
  const cryptos = coinsData;

  const getPrice = (id: string): string => {
    const price = prices[id]?.[currency.toLowerCase()];
    return typeof price === 'number' ? price.toFixed(3) : 'N/A';
  };

  const getPriceChange = (id: string): string => {
    const change = prices[id]?.price_change_percentage_24h;
    return typeof change === 'number' ? (change >= 0 ? '+' : '') + change.toFixed(2) : 'N/A';
  };

  const getPriceChangeColor = (change: string): string => {
    if (change === 'N/A') return 'inherit';
    return parseFloat(change) >= 0 ? 'var(--positive-color)' : 'var(--negative-color)';
  };

  return (
    <div className="crypto-list-wrapper">
      <div className="crypto-list">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-banner">
            <div className="crypto-info">
              <img
                src={crypto.imageUrl}
                alt={`${crypto.symbol} icon`}
                className="crypto-thumb"
              />
              <span className="crypto-symbol">{crypto.symbol}</span>
            </div>
            <div className="crypto-price-info">
              <span className="crypto-price">{getPrice(crypto.id)} {currency}</span>
              <span
                className="crypto-price-change"
                style={{ color: getPriceChangeColor(getPriceChange(crypto.id)) }}
              >
                {getPriceChange(crypto.id)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
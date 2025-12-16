import React, { useState } from 'react';
import './ExchangeBanner.css';
import exchangesData from '../data/exchanges.json';

const ExchangeBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const exchanges = exchangesData;

  return (
    <div className={`exchange-banner ${isOpen ? 'expanded' : ''}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="banner-toggle">
        <span>Non-KYC Exchanges</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="exchange-links">
          {exchanges.map((exchange) => (
            <a
              key={exchange.name}
              href={exchange.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {exchange.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeBanner;
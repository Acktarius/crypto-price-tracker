import axios from 'axios';
import coinsData from '../data/coins.json';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const coinData: Record<string, { symbol: string }> = coinsData.reduce((acc, coin) => {
  acc[coin.id] = { symbol: coin.symbol };
  return acc;
}, {} as Record<string, { symbol: string }>);

export const fetchCryptoPrices = async (currency: string): Promise<Record<string, any>> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: Object.keys(coinData).join(','),
        vs_currencies: currency.toLowerCase(),
        include_24hr_change: true
      },
    });
    
    return Object.entries(response.data).reduce((acc: Record<string, any>, [coinId, data]: [string, any]) => {
      acc[coinId] = {
        [currency.toLowerCase()]: data[currency.toLowerCase()],
        price_change_percentage_24h: data[`${currency.toLowerCase()}_24h_change`],
        symbol: coinData[coinId].symbol
      };
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return {};
  }
};
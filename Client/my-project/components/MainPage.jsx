import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const API_URL = "http://localhost:3008/api/v1/crypto/cryptocurrencies";

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        setCryptoData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to fetch cryptocurrency data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-indigo-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-xl">{error}</div>
    );

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        Cryptocurrency Market
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cryptoData.slice(0, 20).map((coin) => (
          <div
            key={coin.symbol}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://cryptologos.cc/logos/${coin.name
                      .toLowerCase()
                      .replace(
                        " ",
                        "-"
                      )}-${coin.symbol.toLowerCase()}-logo.png`}
                    alt={`${coin.name} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/40/40";
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {coin.name}
                    </h2>
                    <span className="text-sm font-medium text-indigo-500">
                      {coin.symbol}
                    </span>
                  </div>
                </div>
                {coin.price > 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-500" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-indigo-500 mr-1" />
                  <span className="text-2xl font-extrabold text-gray-900">
                    {coin.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <p className="text-indigo-500 font-medium">24h Volume</p>
                  <p className="font-bold text-gray-700">
                    ${coin.volume_24h.toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg">
                  <p className="text-purple-500 font-medium">Market Cap</p>
                  <p className="font-bold text-gray-700">
                    ${coin.market_cap.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDashboard;

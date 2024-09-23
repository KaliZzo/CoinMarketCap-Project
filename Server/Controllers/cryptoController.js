const axios = require("axios");
require("dotenv").config();

exports.cryptoData = async (req, res) => {
  try {
    console.log("Fetching data from CoinMarketCap API...");
    console.log("API Key:", process.env.APIKEY ? "Set" : "Not set");
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.APIKEY,
        },
      }
    );

    console.log("Data fetched successfully. Processing...");
    const coinsData = response.data.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.quote.USD.price,
      volume_24h: coin.quote.USD.volume_24h,
      market_cap: coin.quote.USD.market_cap,
    }));

    res.status(200).json({
      status: "success",
      data: coinsData,
    });
  } catch (err) {
    console.error("Error in cryptoData controller:", err);
    if (err.response) {
      console.error("CoinMarketCap API error response:", err.response.data);
    }
    res.status(500).json({
      error: "Failed to fetch cryptocurrency data",
      details: err.response ? err.response.data : err.message,
    });
  }
};

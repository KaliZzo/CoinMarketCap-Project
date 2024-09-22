const axios = require("axios");
require("dotenv").config();

exports.cryptoData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.APIKEY,
        },
      }
    );

    // שליפת הנתונים הדרושים
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
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cryptocurrency data" });
  }
};

//Packges
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

//Middlewares
app.use(cors());

app.get("/api/currency", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hitbtc.com/api/3/public/currency"
    );
    res.json(response.data);
    console.log();
  } catch (error) {
    console.log("Error fatching data from HitBTC", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

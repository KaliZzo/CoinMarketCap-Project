// Packages
const express = require("express");
const cors = require("cors");
const cryptoRouter = require("./Routes/CryptoRoutes.js");

// Express
const app = express();

// Global Middleware:
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Hello From the Middleware");
  next();
});

// Routes
app.use("/api/v1/crypto", cryptoRouter);

module.exports = app;

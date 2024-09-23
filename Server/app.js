const express = require("express");
const cors = require("cors");
const cryptoRouter = require("./Routes/CryptoRoutes.js");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins for now. In production, specify your frontend URL.
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/crypto", cryptoRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;

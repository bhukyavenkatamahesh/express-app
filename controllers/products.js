const axios = require("axios");
const express = require("express");
const { CryptoModel } = require("../db/connect");

const router = express.Router();

const getAllProducts = async (req, res) => {
  try {
    // Clear existing data
    //await CryptoModel.deleteMany({});

    // Fetch data from the API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const dataArray = Object.values(response.data);

    // Sort the data
    dataArray.sort((a, b) => b.last - a.last);

    // Extract top 10 results
    const top10 = dataArray.slice(0, 10);
    // console.log(top10);
    // Save to database
    await Promise.all(
      top10.map(async (crypto) => {
        const newCrypto = new CryptoModel({
          name: crypto.name,
          last: crypto.last,
          buy: crypto.buy,
          sell: crypto.sell,
          volume: crypto.volume,
          base_unit: crypto.baseAsset,
        });
        await newCrypto.save();
      })
    );

    res.json({ message: "Data fetched and stored successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProductsTesting = async (req, res) => {
  try {
    // Fetch data from MongoDB
    const storedData = await CryptoModel.find().limit(10);

    // Calculate difference and savings for each crypto entry
    storedData.forEach((crypto) => {
      // Calculate the difference
      crypto.difference =
        (((crypto.sell - crypto.buy) / crypto.buy) * 100).toFixed(2) + "%";

      // Calculate the savings
      crypto.savings = (crypto.sell - crypto.buy).toFixed(2);
    });

    // Render the data to the frontend
    res.render("data", { storedData });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllProducts, getAllProductsTesting };

// routes/index.js

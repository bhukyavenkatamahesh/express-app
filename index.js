const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const product_routes = require("./routes/products");
const { connectDB } = require("./db/connect");
const axios = require("axios");
const router = express.Router();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", product_routes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`${PORT} yes i am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

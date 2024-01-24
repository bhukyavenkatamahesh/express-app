const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/backend");
};

const cryptoSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CryptoModel = mongoose.model("Crypto", cryptoSchema);

module.exports = { CryptoModel, connectDB };

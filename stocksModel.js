const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
  Symbol: String,
  description: String,
  type: String,
  sector: String,
  style: String,
  dow: Boolean,
  iwm: Boolean,
  spy: Boolean,
  qqq: Boolean,
  close: String,
  percentChange: Number,
  priceChange: Number,
  fiveDay: Number,
  bullish: Boolean,
  // Add other fields as needed to match your object structure
});

const StocksModel = mongoose.model('StocksModel', stocksSchema);

module.exports = StocksModel
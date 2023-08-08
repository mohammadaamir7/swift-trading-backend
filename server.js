const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const Cron = require("node-cron");
const { getData, checkTrend, initializeData } = require("./helpers.js");
const {
  getTodayStocksTrends,
  getYesterdayStocksTrends,
  setTodayStocksTrends,
  setYesterdayStocksTrends,
} = require("./sharedData.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

initializeData()

app.get("/getStocksData", async (req, res) => {
  try {
    res.json({
      todayStocks: getTodayStocksTrends(),
      yesterdayStocks: getYesterdayStocksTrends(),
    });
  } catch (err) {
    console.log(err);
  }
});

Cron.schedule("0 0 * * *", async () => {
  console.log('cron')
  const data = await getData()
  const todayData = (await checkTrend(false, data)).sort((a, b) => b.percentChange - a.percentChange)
  const yesterdayData = (await checkTrend(true, data)).sort((a, b) => b.percentChange - a.percentChange)

  setTodayStocksTrends(todayData)
  setYesterdayStocksTrends(yesterdayData)
  console.log('getTodayStocksTrends : ', getTodayStocksTrends())
  console.log('getYesterdayStocksTrends : ', getYesterdayStocksTrends())
}).start()

app.listen(port, console.log(`Server started on port ${port}`));

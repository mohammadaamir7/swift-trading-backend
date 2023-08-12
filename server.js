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
const timezone = "America/New_York";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

initializeData();

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

Cron.schedule(
  "20 19 * * *",
  async () => {
    console.log("Cron job running")
    const data = await getData();
    const todayData = (await checkTrend(false, data)).sort(
      (a, b) => b.percentChange - a.percentChange
    );
    const yesterdayData = (await checkTrend(true, data)).sort(
      (a, b) => b.percentChange - a.percentChange
    );
    console.log("todayData : ", todayData)
    console.log("yesterdayData : ", yesterdayData)
    setTodayStocksTrends(todayData);
    setYesterdayStocksTrends(yesterdayData);
  },
  {
    timezone,
  }
).start();

app.listen(port, console.log(`Server started on port ${port}`));

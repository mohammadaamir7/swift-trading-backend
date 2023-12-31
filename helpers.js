const axios = require("axios");
const stocksData = require("./new-data");
const {
  setTodayStocksTrends,
  setYesterdayStocksTrends,
} = require("./sharedData.js");

const calculateStockSentiment = (position, days, stockStats) => {
  const dataLength = Object.keys(stockStats).length - position - 1;
  if (dataLength >= days + 1) {
    let sellingPressure = [];
    let buyingPressure = [];
    for (let ind = position + 1; ind <= position + days + 1; ind++) {
      if (Object.values(stockStats)) {
        const currentValue = Object.values(stockStats)[ind];
        const previousValue = Object.values(stockStats)[ind + 1];
        if (currentValue && previousValue) {
          const sell =
            parseFloat(Object.values(currentValue)[2]) -
            parseFloat(Object.values(previousValue)[3]);
          const buy =
            parseFloat(Object.values(currentValue)[1]) -
            parseFloat(Object.values(previousValue)[3]);

          sell > 0
            ? sellingPressure.push(sell)
            : sellingPressure.push(
                parseFloat(Object.values(previousValue)[3]) -
                  parseFloat(Object.values(currentValue)[2])
              );
          buy > 0
            ? buyingPressure.push(buy)
            : buyingPressure.push(
                parseFloat(Object.values(previousValue)[3]) -
                  parseFloat(Object.values(currentValue)[1])
              );
        }
      } else {
        continue;
      }
    }

    const sellingAverage =
      sellingPressure.reduce((a, b) => a + b, 0) / sellingPressure.length;
    const buyingAverage =
      buyingPressure.reduce((a, b) => a + b, 0) / buyingPressure.length;
    if (sellingAverage > buyingAverage) {
      return 1;
    }
    return 0;
  } else {
    return -1;
  }
};

const calculateFiveDayReturn = (position, stockStats) => {
  const currentValue = Object.values(stockStats)[position];
  const prevValue = Object.values(stockStats)[position + 4];
  if (currentValue !== undefined && prevValue !== undefined) {
    const currentClose = parseFloat(Object.values(currentValue)[3]);
    const prevClose = parseFloat(Object.values(prevValue)[3]);
    return (currentClose - prevClose) / prevClose;
  }
};

const calculatePercentChange = (oldValue, newValue) => {
  const change = newValue - oldValue;
  const percentageChange = (change / oldValue) * 100;
  return percentageChange;
};

const getData = async () => {
  const stocksInfo = [];
  for (let index = 0; index < stocksData.length; index++) {
    try {
      const url = `http://api.marketstack.com/v1/eod?access_key=fbcc4d37fa291f8e8d972b26e005b880&limit=30&symbols=${stocksData[index].Symbol}`;
      const response = await axios.get(url);
      const obj = {
        name: stocksData[index].Symbol,
        description: stocksData[index].Name,
        type: stocksData[index].Type,
        sector: stocksData[index].Sector,
        style: stocksData[index].Style,
        dow: stocksData[index].DOW,
        iwm: stocksData[index].IWM,
        spy: stocksData[index].SPY,
        qqq: stocksData[index].QQQ,
        data: response.data,
      };
      stocksInfo.push(obj);
    } catch (err) {
      console.log("Error in getting data: ", err);
      continue;
    }
  }
  return stocksInfo;
};

const checkTrend = async (isYesterday, stocksData) => {
  const today = isYesterday ? 1 : 0;
  const yesterday = isYesterday ? 2 : 1;
  const anotherDay = isYesterday ? 3 : 2;

  const stocksTrends = [];
  for (let index = 0; index < stocksData.length; index++) {
    if (Object.values(stocksData[index]?.data)) {
      if (
        calculateStockSentiment(
          today,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 0 &&
        calculateStockSentiment(
          yesterday,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 0 &&
        calculateStockSentiment(
          anotherDay,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 1 &&
        calculateStockSentiment(
          anotherDay + 1,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 1
      ) {
        const obj = {
          Symbol: stocksData[index]?.name,
          description: stocksData[index]?.description,
          type: stocksData[index]?.type,
          sector: stocksData[index]?.sector,
          style: stocksData[index]?.style,
          dow: stocksData[index]?.dow,
          iwm: stocksData[index]?.iwm,
          spy: stocksData[index]?.spy,
          qqq: stocksData[index]?.qqq,
          close: parseFloat(
            Object.values(Object.values(stocksData[index]?.data)[1][today])[3]
          ).toFixed(2),
          percentChange: calculatePercentChange(
            Object.values(
              Object.values(stocksData[index]?.data)[1][yesterday]
            )[3],
            Object.values(Object.values(stocksData[index]?.data)[1][today])[3]
          ),
          priceChange:
            Object.values(Object.values(stocksData[index]?.data)[1][today])[3] -
            Object.values(
              Object.values(stocksData[index]?.data)[1][yesterday]
            )[3],
          fiveDay: calculateFiveDayReturn(
            today,
            Object.values(stocksData[index]?.data)[1]
          ),
          bullish: true,
        };

        stocksTrends.push(obj);
      } else if (
        calculateStockSentiment(
          today,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 1 &&
        calculateStockSentiment(
          yesterday,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 1 &&
        calculateStockSentiment(
          anotherDay,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 0 &&
        calculateStockSentiment(
          anotherDay + 1,
          23,
          Object.values(stocksData[index]?.data)[1]
        ) == 0
      ) {
        const obj = {
          Symbol: stocksData[index]?.name,
          description: stocksData[index]?.description,
          type: stocksData[index]?.type,
          sector: stocksData[index]?.sector,
          style: stocksData[index]?.style,
          dow: stocksData[index]?.dow,
          iwm: stocksData[index]?.iwm,
          spy: stocksData[index]?.spy,
          qqq: stocksData[index]?.qqq,
          close: parseFloat(
            Object.values(Object.values(stocksData[index]?.data)[1][today])[3]
          ).toFixed(2),
          percentChange: calculatePercentChange(
            Object.values(
              Object.values(stocksData[index]?.data)[1][yesterday]
            )[3],
            Object.values(Object.values(stocksData[index]?.data)[1][today])[3]
          ),
          priceChange:
            Object.values(Object.values(stocksData[index]?.data)[1][today])[3] -
            Object.values(
              Object.values(stocksData[index]?.data)[1][yesterday]
            )[3],
          fiveDay: calculateFiveDayReturn(
            today,
            Object.values(stocksData[index]?.data)[1]
          ),
          bullish: false,
        };

        stocksTrends.push(obj);
      }
    } else {
      continue;
    }
  }

  return stocksTrends;
};

const initializeData = async () => {
  const data = await getData();
  const todayData = (await checkTrend(false, data)).sort(
    (a, b) => b.percentChange - a.percentChange
  );
  const yesterdayData = (await checkTrend(true, data)).sort(
    (a, b) => b.percentChange - a.percentChange
  );
  setTodayStocksTrends(todayData);
  setYesterdayStocksTrends(yesterdayData);
};

const removeNullValues = (query) => {
  for (const key in query) {
    if (query[key] === null || query[key] === "" || query[key] === "null") {
      delete query[key];
    }
  }
};

module.exports = {
  calculateStockSentiment,
  calculateFiveDayReturn,
  calculatePercentChange,
  getData,
  checkTrend,
  initializeData,
  removeNullValues
};

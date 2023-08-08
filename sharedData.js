let todayStocksTrends = [];
let yesterdayStocksTrends = [];

const getTodayStocksTrends = () => todayStocksTrends;
const setTodayStocksTrends = (newValue) => (todayStocksTrends = newValue);
const getYesterdayStocksTrends = () => yesterdayStocksTrends;
const setYesterdayStocksTrends = (newValue) =>
  (yesterdayStocksTrends = newValue);

module.exports = {
  getTodayStocksTrends,
  getYesterdayStocksTrends,
  setTodayStocksTrends,
  setYesterdayStocksTrends,
};

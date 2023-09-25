let todayStocksTrends = [];
let yesterdayStocksTrends = [];

const filterStocksData = (data, query) => {
  let filteredData = [];
  if (
    Object.keys(query).includes("sectors") &&
    !Object.keys(query).includes("styles") &&
    Object.keys(query).includes("filterOptions")
  ) {
    const requiredChecks = Object.keys(JSON.parse(query.filterOptions)).filter(
      (key) => JSON.parse(query.filterOptions)[key] === true
    );

    if (requiredChecks.length == 1) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        requiredChecks.forEach((key) => {
          if (
            query.sectors.split(",").includes(stock.sector) &&
            stock[key] === true
          ) {
            matchesFilter = true;
          }
        });

        return matchesFilter;
      });
    } else {
      filteredData = data.filter(
        (stock) =>
          query.sectors.split(",").includes(stock.sector) &&
          JSON.parse(query.filterOptions).iwm === stock.iwm &&
          JSON.parse(query.filterOptions).spy === stock.spy &&
          JSON.parse(query.filterOptions).qqq === stock.qqq &&
          JSON.parse(query.filterOptions).dow === stock.dow
      );
    }
  } else if (
    !Object.keys(query).includes("sectors") &&
    Object.keys(query).includes("styles") &&
    Object.keys(query).includes("filterOptions")
  ) {
    filteredData = data.filter(
      (stock) =>
        query.styles.split(",").includes(stock.style) &&
        JSON.parse(query.filterOptions).iwm === stock.iwm &&
        JSON.parse(query.filterOptions).spy === stock.spy &&
        JSON.parse(query.filterOptions).qqq === stock.qqq &&
        JSON.parse(query.filterOptions).dow === stock.dow
    );
  } else if (
    Object.keys(query).includes("sectors") &&
    Object.keys(query).includes("styles") &&
    Object.keys(query).includes("filterOptions")
  ) {

    filteredData = data.filter(
      (stock) =>
        query.sectors.split(",").includes(stock.sector) &&
        query.styles.split(",").includes(stock.style) &&
        JSON.parse(query.filterOptions).iwm === stock.iwm &&
        JSON.parse(query.filterOptions).spy === stock.spy &&
        JSON.parse(query.filterOptions).qqq === stock.qqq &&
        JSON.parse(query.filterOptions).dow === stock.dow
    );
  } else if (
    !Object.keys(query).includes("sectors") &&
    !Object.keys(query).includes("styles") &&
    Object.keys(query).includes("filterOptions")
  ) {
    const requiredChecks = Object.keys(JSON.parse(query.filterOptions)).filter(
      (key) => JSON.parse(query.filterOptions)[key] === true
    );

    if (requiredChecks.length == 1) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        requiredChecks.forEach((key) => {
          if (
            stock[key] === true
          ) {
            matchesFilter = true;
          }
        });

        return matchesFilter;
      });
    } else {
      filteredData = data.filter(
        (stock) =>
          JSON.parse(query.filterOptions).iwm === stock.iwm &&
          JSON.parse(query.filterOptions).spy === stock.spy &&
          JSON.parse(query.filterOptions).qqq === stock.qqq &&
          JSON.parse(query.filterOptions).dow === stock.dow
      );
    }
  } else if (
    Object.keys(query).includes("sectors") &&
    !Object.keys(query).includes("styles") &&
    !Object.keys(query).includes("filterOptions")
  ) {
    filteredData = data.filter((stock) =>
      query.sectors.split(",").includes(stock.sector)
    );
  } else if (
    !Object.keys(query).includes("sectors") &&
    Object.keys(query).includes("styles") &&
    !Object.keys(query).includes("filterOptions")
  ) {
    filteredData = data.filter((stock) =>
      query.styles.split(",").includes(stock.style)
    );
  } else if (
    Object.keys(query).includes("sectors") &&
    Object.keys(query).includes("styles") &&
    !Object.keys(query).includes("filterOptions")
  ) {

    filteredData = data.filter(
      (stock) =>
        query.sectors.split(",").includes(stock.sector) &&
        query.styles.split(",").includes(stock.style)
    );
  }

  return filteredData;
};

const getTodayStocksTrends = (query) => {
  if (Object.keys(query).length > 0) {
    return filterStocksData(todayStocksTrends, query);
  } else {
    return todayStocksTrends;
  }
};

const setTodayStocksTrends = (newValue) => (todayStocksTrends = newValue);

const getYesterdayStocksTrends = (query) => {
  if (Object.keys(query).length > 0) {
    return filterStocksData(yesterdayStocksTrends, query);
  } else {
    return yesterdayStocksTrends;
  }
};

const setYesterdayStocksTrends = (newValue) =>
  (yesterdayStocksTrends = newValue);

module.exports = {
  getTodayStocksTrends,
  getYesterdayStocksTrends,
  setTodayStocksTrends,
  setYesterdayStocksTrends,
};

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
        if (
          query.sectors.split(",").includes(stock.sector) &&
          stock[requiredChecks[0]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 2) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 3) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 4) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true &&
          stock[requiredChecks[3]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    }
  } else if (
    !Object.keys(query).includes("sectors") &&
    Object.keys(query).includes("styles") &&
    Object.keys(query).includes("filterOptions")
  ) {
    const requiredChecks = Object.keys(JSON.parse(query.filterOptions)).filter(
      (key) => JSON.parse(query.filterOptions)[key] === true
    );

    if (requiredChecks.length == 1) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 2) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 3) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 4) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true &&
          stock[requiredChecks[3]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    }
  } else if (
    Object.keys(query).includes("sectors") &&
    Object.keys(query).includes("styles") &&
    Object.keys(query).includes("filterOptions")
  ) {
    const requiredChecks = Object.keys(JSON.parse(query.filterOptions)).filter(
      (key) => JSON.parse(query.filterOptions)[key] === true
    );

    if (requiredChecks.length == 1) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 2) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 3) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 4) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          query.sectors.split(",").includes(stock.sector) &&
          query.styles.split(",").includes(stock.style) &&
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true &&
          stock[requiredChecks[3]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    }
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
        if (stock[requiredChecks[0]] === true) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 2) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 3) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
    } else if (requiredChecks.length == 4) {
      filteredData = data.filter((stock) => {
        let matchesFilter = false;
        if (
          stock[requiredChecks[0]] === true &&
          stock[requiredChecks[1]] === true &&
          stock[requiredChecks[2]] === true &&
          stock[requiredChecks[3]] === true
        ) {
          matchesFilter = true;
        }

        return matchesFilter;
      });
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

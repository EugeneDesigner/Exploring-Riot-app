var appToken = "M2Y0MGZhZmQtZjQ4NS00OTU5LThkYzItOGQyMjMwMmFlOGY3"
var bus = riot.observable()
var stockMarketService = new StockMarketService(appToken, bus);


routes.stockmarket = function(id, action) {
  bus.on('newStocksEvent', function (param) {
    riot.mount('stockmarket-table', {title: 'Stocks', bus: bus, stocks: param.stocks});
    riot.mount('stockmarket-barchart', {title: 'Graph', bus: bus, stocks: param.stocks});
  });
}

'use strict';

class StockMarketService {
    constructor(appToken, bus) {
        var self = this
        this.bus = bus
        var url = "http://stockmarket.streamdata.io/prices"

    var streamdata = streamdataio.createEventSource(url, appToken, [], null)

    self.data = []

    streamdata.onData(function(data) {
      self.data = data
      self.bus.trigger('newStocksEvent', {stocks: self.data}, true)
    }).onPatch(function(patches) {
      jsonpatch.apply(self.data, patches)
      self.bus.trigger('newStocksEvent', {stocks: self.data}, true)
    }).onError(function(error) {
      console.error(error)
      self.bus.trigger('errorStocksEvent', error)
      self.streamdata.close()
    })

    streamdata.open()


   }
    // fetchJson() {
    //     var self = this;
    //
    //     function createCORSRequest(method, url) {
    //       var xhr = new XMLHttpRequest();
    //       if ("withCredentials" in xhr) {
    //         xhr.open(method, url, true);
    //       } else if (typeof XDomainRequest != "undefined") {
    //
    //         xhr = new XDomainRequest();
    //         xhr.open(method, url);
    //       } else {
    //         xhr = null
    //       }
    //       return xhr
    //     }
    //
    //     var xhr = createCORSRequest('GET', self.url)
    //     if (!xhr) {
    //       throw new Error('CORS not supported')
    //     }
    //
    //
    //
    //
    //
    //     xhr.onload = function () {
    //         var status = xhr.status;
    //
    //         if (xhr.readyState == 4 && status == 200) {
    //             var stocks = JSON.parse(xhr.responseText);
    //             self.bus.trigger('newStocksEvent', {stocks: stocks}, true);
    //
    //         } else {
    //             console.error(status);
    //             self.bus.trigger('errorStocksEvent', status);
    //
    //         }
    //     };
    //
    //     xhr.open("GET", self.url, true);
    //
    //     xhr.send();
    // }
}

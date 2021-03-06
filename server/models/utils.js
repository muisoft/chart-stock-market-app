const fetch = require('node-fetch');
const axios = require('axios');
const Stock = require('mongoose').model('Stock');

module.exports = {
    allStocks(done) {
        Stock.find({}, (err, stocks) => {
            if (err) console.error(err);
            let symbols = ["FB","AAPL"];
            if(stocks.length > 0){
               symbols = stocks.map(sym => sym.code);
            }
            fetchStock(symbols, (err, stock) => {
                if (err) console.error(err);
                return done(stock);
            })
        });
    },
    saveStock(stockcode, done) {  
        const code = stockcode;//stockcode.toUppercase();
        fetchStock(code, (err, stock) => {
            if (err) console.error(err);
            if (stock) {
                let stock = new Stock({ code: code })
                stock.save((err, saved) => {
                    if (err) console.error(err);
                    return done(saved);
                });
            }
        })
    },
    deleteStock(stockcode, done) {
        Stock.findOneAndRemove({ code: stockcode }, (stock) => {
            return done(stock);
        });
    }
}

const fetchStock = (stockCode, done) => {
    // const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockCode}&types=company,chart&range=1y`;
    const url = `${process.env.BASE_URL}/stable/stock/market/batch?symbols=${stockCode}&types=company,chart&range=1y&token=${process.env.TOKEN}`;
      //const url = 'https://api.iextrading.com/1.0/ref-data/symbols';
     axios.get(url)
         .then(res => {
             return done(null, res.data);
         })
         .catch(err => console.error(err));
 }
const fetch = require('node-fetch');
const axios = require('axios');
const Stock = require('mongoose').model('Stock');

module.exports = {
    allStocks(done) {
        Stock.find({}, (err, stocks) => {
            if (err) console.error(err);
            let symbols = stocks.map(sym => sym.code);
            fetchStock(symbols, (err, stock) => {
                if (err) console.error(err);
                return done(stock);
            })
        });
    },
    saveStock(stockcode, done) {
       /** isStockCodeExist(stockcode, (exist) => {
            if (exist) {
                let stock = new Stock({ code: stockcode })
                stock.save((err, stock) => {
                    console.log('Saved');
                    if (err) console.error(err);
                    return done(stock);
                });
            }
        })**/
        //fetchStock(stockcode, (err, stock) => {
           // if (err) console.error(err);
           // if (stock) {
                let stock = new Stock({ code: stockcode })
                stock.save((err, saved) => {
                    console.log('Saved');
                    if (err) console.error(err);
                    return done(saved);
                });
           // }
        //})
    },
    deleteStock(stockcode, done) {
        Stock.findOneAndRemove({ code: stockcode }, (stock) => {
            console.log('Deleted');
            return done(stock);
        });
    }
}

const fetchStock = (stockCode, done) => {
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockCode}&types=company,chart&range=1y`
    axios.get(url)
        .then(res => {
            return done(null, res.data);
        })
        .catch(err => console.error(err));
}
const isStockCodeExist = (stockCode, done) => {
    const isContained = symbols => symbols.some(sym => sym.symbol === stockCode);
    const url = 'https://api.iextrading.com/1.0/ref-data/symbols';
    axios.get(url)
        .then(res => done(isContained(res.data)))
        .catch(err => console.error(err));
}



/**const fetchStock1 = (stockCode, done) => {
    const date = new Date();
    const [year, month, day] = [+date.getFullYear(), 1 + +date.getMonth(), +date.getDate()];
    const start_date = `${year - 1}-${month}-${day}`;
    const end_date = `${year}-${month}-${day}`;
    const stockCode1 = 'GOOG';
    const KEY = '6qp4dRJBcBccYjBMyeCn';
    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}.json?start_date=${start_date}&order=asc&column_index=4&transformation=rdiff&api_key=${KEY}`
    axios.get(url)
        .then(res => {
            return done(null, res.data);
        })
        .catch(err => {
            return done(err);
        });
}**/


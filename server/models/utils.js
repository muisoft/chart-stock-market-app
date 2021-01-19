const fetch = require('node-fetch');
const axios = require('axios');
const Stock = require('mongoose').model('Stock');

module.exports = {
    // allStocks(done) {
    //    // console.log("Hello: " + JSON.stringify(stock[0]));
    //     Stock.find({}, (err, stocks) => {
    //         if (err) console.error(err);
    //         let symbols;
    //         console.log("Check: "+ JSON.stringify(stocks));
    //         if(stocks){
    //            symbols = stocks.map(sym => sym.code);
    //         } else {
    //             symbols = ["FB"];
    //         }
    //         // fetchStock(symbols, (err, stock) => {
    //         //     if (err) console.error(err);
    //         //     return done(stock);
    //         // })
            
    //     });
    //     //console.log("All: "+ JSON.stringify(getDatasets(stock)));
    //     fetchStock("", (err, stock) => {
    //                 if (err) console.error(err);
    //                 return done(stock);
    //             })
    // },
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

// const fetchStock = (stockCode, done) => {
   
//     return done(null, stock);//getDatasets(stock));
//     // const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockCode}&types=company,chart&range=1y`;
//     // const url = 'https://api.iextrading.com/1.0/ref-data/symbols';
//     const url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=AAPL,fb&types=company,chart&range=1m&last=5&&token=Tsk_43e57d4f746143a8a9684a86f0d57fef`;
//     // axios.get(url)
//     //     .then(res => {
//     //         return done(null, getDatasets(res.data));
//     //     })
//     //     .catch(err => console.error(err));
// }
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
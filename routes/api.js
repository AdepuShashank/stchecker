'use strict';


const StockModel = require("C:\\Users\\shash\\OneDrive\\Desktop\\Programming\\projects\\stockchecker\\routes\\models.js").Stock;
// const fetch = import("node-fetch");

async function createStock(stock, like, ip){
  const newStock = new StockModel({
    symbol : stock,
    likes: like ? [ip]: [],
  });
  const savedNew = await newStock.save();
  return savedNew;
}

async function findStock(stock){
  return await StockModel.findOne({symbol: stock}).exec();
}

async function saveStock(stock, like , ip){
  let saved = {};
  const foundStock = await findStock(stock);
  if (!foundStock){
    const createsaved = await createStock(stock, like, ip);
    saved = createsaved;
    return saved;
  }
  else{
    if (like && foundStock.likes.indexOf(ip)=== -1 ){
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
    return saved;
  }
  
}

async function getStock(stock){
  const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
  const {symbol, latestprice} = await response.json();
  return {symbol, latestprice};
}

module.exports = function (app){


  app.route("./api/stock-prices").get(async function (req, res){
    const { stock, like } = req.query;
    if (Array.isArray(stock)){
      console.log("stocks",stock);

      const{symbol, latestprice} = await getStock(stock[0]);
      const{symbol: symbol2,latestprice: latestprice2} = await getStock(stock[1]);

      const firststock = await saveStock(stock[0],like,req.ip);
      const secondstock = await saveStock(stock[1], like , req.ip);

      let stockData = [];

      if (!symbol){
        stockData.push({
          rel_likes: firststock.likes.length - secondstock.likes.length,
        });
      } else {
        stockData.push({
          stock: symbol,
          price: latestprice,
          rel_likes: firststock.likes.length - secondstock.likes.length,
        });
      }

      if (!symbol2){
        stockData.push({
          rel_likes: secondstock.likes.length - firststock.likes.length,
        });
      } else {
        stockData.push({
          stock: symbol2,
          price: latestprice2,
          rel_likes: secondstock.likes.length - firststock.likes.length,
        });
      }

      res.json({
        stockData,
      });
      return;



    }
    const { symbol, latestprice} = await getStock(stock);
    if(!symbol){
      res.json({stockData:{likes:like ?1:0}});
      return;
    }

      const oneStockData = await saveStock(symbol, like, req.ip);
      console.log("one stock data", oneStockData);

      res.json({
        stockData:{
          stock: symbol,
          price: latestprice,
          likes: oneStockData.likes.length,
        },
      });
  });
};
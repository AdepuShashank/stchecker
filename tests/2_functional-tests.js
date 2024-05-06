const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite("Function TEST" ,function(){
    suite("5 function get request test",function(){ 
        test("viewing one stock: GET req to /api/stock-prices/", function(done){
            chai 
             .request(server)
             .get("/api/stock-prices/")
             .set("content-type ", "application/json")
             .query({ stock: "TSLA"})
             .end(function(err,res){
                assert.equal(res.status,200);
                assert.equal(res.body.stockData.stock, "TSLA");
                assert.exists(res.body.stockData.price, "TSLA has a price");
                done();
            });
        });
        test("viewing one stock: GET req to /api/stock-prices/", function(done){
            chai 
             .request(server)
             .get("/api/stock-prices/")
             .set("content-type ", "application/json")
             .query({ stock: "GOLD"})
             .end(function(err,res){
                assert.equal(res.status,200);
                assert.equal(res.body.stockData.stock, "GOLD");
                assert.equal(res.body.stockData.likes, 1);
                assert.exists(res.body.stockData.price, "TSLA has a price");
                done();
            });
        });

        test("viewing the same stock again: GET req to /api/stock-prices/", function(done){
            chai 
             .request(server)
             .get("/api/stock-prices/")
             .set("content-type ", "application/json")
             .query({ stock: "GOLD", like: true})
             .end(function(err,res){
                assert.equal(res.status,200);
                assert.equal(res.body.stockData.stock, "GOLD");
                assert.equal(res.body.stockData.likes, 1);
                assert.exists(res.body.stockData.price, "TSLA has a price");
                done();
            });
        });
        
        test("viewing two stocks again: GET req to /api/stock-prices/", function(done){
            chai 
             .request(server)
             .get("/api/stock-prices/")
             .set("content-type ", "application/json")
             .query({ stock: ["AMZN","T"]})
             .end(function(err,res){
                assert.equal(res.status,200);
                assert.equal(res.body.stockData[0].stock, "AMZN");
                assert.equal(res.body.stockData[1].likes, "T");
                assert.exists(res.body.stockData[0].price, "AMZN has a price");
                assert.exists(res.body.stockData[1].price, "T has a price");
                done();
            });
        });
        
        test("viewing two stocks again and liking them: GET req to /api/stock-prices/", function(done){
            chai 
             .request(server)
             .get("/api/stock-prices/")
             .set("content-type ", "application/json")
             .query({ stock: ["AMZN","T"], like : True})
             .end(function(err,res){
                assert.equal(res.status,200);
                assert.equal(res.body.stockData[0].stock, "AMZN");
                assert.equal(res.body.stockData[1].likes, "T");
                assert.exists(res.body.stockData[0].price, "AMZN has a price");
                assert.exists(res.body.stockData[1].price, "T has a price");
                assert.exists(res.body.stockData[0].rel_likes, "Has rel_likes");
                assert.exists(res.body.stockData[1].rel_likes, "Has rel_likes");
                done();
            });
        });
    });
});


suite('Functional Tests', function() {

});

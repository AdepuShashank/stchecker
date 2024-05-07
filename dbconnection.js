const mongoose = require("mongoose");
// const DB = "mongodb+srv://shashankadepu:Shashi@8977@cluster.e8evcrr.mongodb.net/";

const DB =  "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote";


const db = mongoose.connect(process.env.DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

module.exports = db;
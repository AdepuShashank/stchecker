const mongoose = require("mongoose");

console.log(process.env.DB)


const db = mongoose.connect(process.env.DB);

module.exports = db;
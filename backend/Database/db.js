const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://127.0.0.1:27017/CashUrl").then(()=>{
    console.log("db connection success");
    
}).catch((err)=>{
    console.log("db connection failed",err);
    
})
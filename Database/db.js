const mongoose = require("mongoose");
require("dotenv").config()
module.exports = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("db connection success");
    
}).catch((err)=>{
    console.log(process.env.DB_URL);
    
    console.log("db connection failed",err.message);
    
})
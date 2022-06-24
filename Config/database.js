const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
require ("dotenv").config()
const DB = process.env.DB_URI
"mongoose.Promise=global.Promise"

const database = mongoose.connect(DB,{useNewUrlParser:true},(err)=>{

if (!err){ 
    console.log ("Mongodb connected successfully")
}
else { 
console.log("Failed to connect with mongodb"+err)
}
})


module.exports = database 
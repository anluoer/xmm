const mongoose=require("mongoose")
const db="mongodb://localhost/shop"

// 引入Schema
const glob=require("glob")
const path=require('path')
exports.initSchemas=()=>{
    glob.sync(path.resolve(__dirname,'./model','*.js')).forEach(require)
}

exports.connect=()=>{
    mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology:true})
}
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db)
})
    mongoose.connection.on('err',()=>{
        console.log(err)
        mongoose.connect(db)
})
    mongoose.connection.once('open',()=>{
        
        console.log("mongoose connected successfully")
})

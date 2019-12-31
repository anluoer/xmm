var mongoose=require('mongoose')
var Schema=mongoose.Schema
//数据库中数据的类型，模板
var productSchema=new Schema({
    id:Schema.Types.ObjectId,
    name:String,
    img:String,
    price:Number,
    company:String,
    city:String,
    type:Number
})

mongoose.model('Product',productSchema)
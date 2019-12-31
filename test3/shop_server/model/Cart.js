const mongoose=require('mongoose')
const Schema=mongoose.Schema

let ObjectId=Schema.Types.ObjectId
const addSchema=new Schema({
    id:ObjectId,
    userId:ObjectId,
    productId:{
        type:ObjectId,
        ref:'Product'
    }
})

mongoose.model('Cart',addSchema)
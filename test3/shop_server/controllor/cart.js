const mongoose=require('mongoose')
const Koa=require('koa')
const Router=require('koa-router')
let router=new Router()

router.post('/addProduct',async (ctx)=>{
    const Cart=mongoose.model('Cart')
    let cart=new Cart(ctx.request.body)
    await cart.save()
    .then(res=>{
        ctx.body={
            code:200,
            message:"成功加入购物车"
        }
    }).catch(err=>{
        ctx.body={
            code:500,
            message:"加入购物车失败"
        }
    })
})

router.get('/getCartProduct',async (ctx)=>{
    const Cart=mongoose.model('Cart')
    await Cart.find({userId:ctx.query.userId}).populate('productId').exec().then((res)=>{
        ctx.body=res
    }).catch(()=>{
        ctx.body='失败啦3'
    })
})
module.exports=router
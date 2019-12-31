//将json文件中的信息读入数据库中
const mongoose=require('mongoose')
const Koa=require('koa')
const Router=require('koa-router')
const router=new Router()
const fs=require('fs')

router.get('/insertProduct',async (ctx)=>{
    fs.readFile('./data/product.json','utf8',(err,data)=>{
        //先把读到的字符串转成对象
        data=JSON.parse(data)
        let count=0;
        //请求数据库
        const Product=mongoose.model('Product')
        //遍历数据
        data.map((value,index)=>{
            let product=new Product(value);
            product.type=Math.floor(Math.random()*8)+1;
            product.save().then((res)=>{
                count++;
                console.log('成功'+count)
            }).catch((err)=>{
                console.log('失败'+err)
            })
        })
       
        
    })
    ctx.body="导入成功"
})

router.get('/getProducts', async(ctx)=>{
    //连接数据库
    const Product=mongoose.model('Product')
    //ctx.query.start返回的是字符串，要将其转换成number
    await Product.find({type:ctx.query.typeId}).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit))
    .exec().then(res=>{
        ctx.body=res
    }).catch(err=>{
        ctx.body="失败啦1"
    })

})

router.get('/getProductDetail',async (ctx)=>{
    const Product=mongoose.model('Product')
    await Product.findOne({_id:ctx.query.id}).exec()
    .then(res=>{
        // console.log(res)
        ctx.body=res
    }).catch(err=>{
        ctx.body='失败啦2'
    })
})
module.exports=router





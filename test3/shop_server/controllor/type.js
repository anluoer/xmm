const Koa=require('koa')
const Router=require('koa-router')
const router=new Router()
const mongoose=require('mongoose')
const fs=require('fs')

//将json文件中的数据读入数据库中
router.get('/insertType',async (ctx)=>{
    fs.readFile('./data/type.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let count=0;
        const Type=mongoose.model('Type')
        
        data.map((val,index)=>{
            const type=new Type(val)
            type.save().then(()=>{
                count++
                console.log('成功'+count)
            }).catch(()=>{
                console.log('失败啦')
            })
        })
    })
    ctx.body="type导入成功"//一定不能忘记，不然返回404
})

router.get('/getTypes',async (ctx)=>{
    //将数据从数据库中取出
    const Type=mongoose.model('Type')
    await Type.find().exec().then(res=>{
        ctx.body=res
    }).catch(err=>{
        console.log('失败')
    })
})

module.exports=router
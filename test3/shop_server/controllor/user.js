const Router=require("koa-router")
let router=new Router()
const mongoose=require('mongoose')

router.post("/regUser",async ctx=>{
    console.log("请求成功");
    ctx.body="请求成功";
    const User=mongoose.model('User');
    let newUser=new User(ctx.request.body);
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:"注册成功"
        }
    }).catch((err)=>{
        ctx.body={
            code:500,
            message:err
        }
    })
})
//掌握async和await
router.post('/loginUser',async function(ctx){
    //接收前端发来的消息
    let loginUser=ctx.request.body
    userName=loginUser.userName;
    password=loginUser.password;
    //引入数据库
    const User=mongoose.model('User')
    //将前端发来的信息与数据库中的比对
    await User.findOne({userName:userName}).exec().then(async (result)=>{
        if(result){//result是个从数据库返回的对象
            let newUser=new User();
            await newUser.comparePassword(password,result.password)
            .then(isMatch=>{
                if(isMatch){
                     ctx.body={
                        message:"登录成功",
                        code:200,
                        userInfo:result
                    };
                }else{
                    ctx.body={
                    message:"登录失败",
                    code:201,
                }
                }  
            })
        }else{
            ctx.body={
                code:201
            }
        }
        })    
})


module.exports=router
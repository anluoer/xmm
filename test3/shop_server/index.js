const Koa=require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const app=new Koa();
// 解决跨域
app.use(bodyParser());
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));
//接受前端post请求



// app.use(async ctx => {
//     ctx; // 这是 Context
//     ctx.request; // 这是 koa Request
//     ctx.response; // 这是 koa Response
//   });

//加载路由

const user = require('./controllor/user.js');
const product=require('./controllor/product.js')
const type=require('./controllor/type.js')
const cart=require('./controllor/cart.js')

let router=new Router()
router.use("/user",user.routes())
router.use("/product",product.routes())
router.use("/type",type.routes())
router.use("/cart",cart.routes())

app.use(router.routes())
app.use(router.allowedMethods());





const { connect, initSchemas } = require('./init.js');
(async () => {
    await connect();
    initSchemas();
})();

// app.use(async (ctx)=>{
//     ctx.body="hello wxx"
// })
app.listen(3000,()=>{
    console.log("start server")
})
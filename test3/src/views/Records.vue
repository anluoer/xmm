<template>
    <div>
        <van-nav-bar title="商品分类"></van-nav-bar>
        <div>
            <van-row>
                <van-col span="6" class="nav">
                    <!-- 调用 changeActive(val.typeId,index)返回active的值为当前点击的index,因而active==index为true所以active被激活-->
                    <ul class="nav-container"><li @click=changeActive(val.typeId,index) :class='{active:active==index}' class="nav-detail" v-for="(val,index) in productTypes" :key="index">{{val.typeName}}</li></ul>
                </van-col>
                <van-col span="18" class="container">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list class="container-list" @load='onLoad' v-model="isLoading" :finished=finished>
                        <div @click="goDetail(item._id)" class="container-list-detail" v-for="(item,index) in productDetail" :key="index">
                            <img :src="item.img" alt="">
                            <p class="container-list-detail-name">{{item.name}}</p>
                            <p class="container-list-detail-price">￥{{item.price}}</p>
                        </div>
                        </van-list>
                    </van-pull-refresh>  
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/service.config.js'
    export default {
        data(){
            return{
                productTypes:[],
                active:0,
                typeId:1,//通过changeActive()已经将typeId改为点击时对应的typeId
                start:0,
                limit:10,
                productDetail:[],
                finished:false,
                isLoading:false,
            }
        },
        created(){
            //给后端发送axios请求，后端从数据库中查找回来再通过ctx.body=res吐给前端
            axios({
                url:url.getTypes
            }).then((res)=>{
                console.log(res)
                this.productTypes=res.data
                this.changeActive(this.typeId,this.active)//初始化商品信息，在加载完type后立马将
                //信息显示到前端
            }).catch(err=>{
                console.log(err)
            })
        },
        methods:{
            goDetail(id){
                console.log(id)
                // this.$router.push({
                //     path:'/detail',
                //     query:{
                //         id:id
                //     }
                // })
                this.$router.push(`/detail/${id}`)
            },
            changeActive(typeId,index){
                this.active=index//将active的值赋值为当前点击的index
                this.typeId=typeId
                this.productDetail=[]
                this.finished=false
                this.getProductDetail()//选中点击的后再调用而不是点击的时候调用

            },
            getProductDetail(){
                //给后端发送请求，让后端从数据库找到合适的数据再返回给前端
                this.isloading=true;
                axios({
                    url:url.getProducts,
                    method:'get',
                    params:{
                        typeId:this.typeId,
                        start:this.productDetail.length,
                        limit:this.limit,
                    }
                }).then(res=>{
                    if(res.data.length!=0){//如果请求回来的数据有值继续请求，没有的话停止
                        this.productDetail=this.productDetail.concat(res.data)
                    }else{
                        this.finished=true
                    }
                    this.isLoading=false
                    
                }).catch(err=>{
                    console.log('失败11111')
                })
            },
            onLoad(){
                setTimeout(()=>{
                    this.getProductDetail()
                    // console.log('sdfghj')
                },2000)   
            },
            onRefresh(){
                setTimeout(()=>{
                    this.productDetail=[];
                    this.getProductDetail()
                    // console.log('sdfghj')
                },2000) 
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    .nav{
        background: #eeeeee;
        &-detail{
            height:40px;
            line-height: 40px;
            text-align: center;
            padding:3px;
            border-bottom: 1px solid #fff
        }
        .active{
            background: #ffffff;
        }
    }

    .container{
        position:fixed;
        top:46px;
        right:0;
        bottom:1rem;//空出的标签栏的高度
        overflow-y:scroll;
        &-list{
            display:flex;
            flex-wrap: wrap;
            padding-bottom: 1rem;
            &-detail{
                width:40%;
                text-align: center;
                padding: 0 10px;
                img{
                    width:2rem;
                    height:2rem;
                }
                &-name{
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                
            }
        }
    }

</style>
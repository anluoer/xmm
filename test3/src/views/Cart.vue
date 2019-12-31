<template>
    <div>
        <van-nav-bar title="购物车" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
        <div>
            <van-card v-for="(item,index) in cartProduct" :key="index"  :price="item.price" :title="item.name" :thumb="item.img">
                <div slot="footer">
                    <van-button size="mini" @click="delectCart(item._id,index)">删除</van-button>
                </div>
            </van-card>
            <van-submit-bar class="subbar" :price="totleprice" button-text="提交订单" @submit="onSubmit"/>
        </div>
    
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/service.config.js'
    import {mapState} from 'vuex'
    export default {
        methods:{
            delectCart(id,index){
                this.cartProduct.splice(index,1)
            },
            onSubmit(){
                this.$toast.success('开始支付')
            }
        },
        data(){
            return{
                cartProduct:[],

            }
        },
        computed:{
            ...mapState(['userInfo']),
            totleprice(){
                return this.cartProduct.reduce((sum,elem)=>{
                    sum+=elem.price;
                    return sum
                },0)*10*10 //从0开始叠加
            }
        },
        created(){
            if(JSON.stringify(this.userInfo)==='{}'){
                this.$toast.fail('请先登录')
                this.$router.push('/mine')
            }else{
                axios({
                url:url.getCartProduct,
                method:'get',
                params:{
                    userId:this.userInfo._id
                }
            }).then(res=>{
                for(let item of res.data){
                    this.cartProduct.push(item.productId)
                }
                console.log(res)
                // this.cartProduct=res.data
            }).catch(err=>{
                console.log(err)
            })
            }
            
        }
    }
</script>

<style lang="scss" scoped>
.subbar{
    margin-bottom: 1rem;
}
</style>
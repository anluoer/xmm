<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
    <img :src="productDetail.img" alt />
    <p class="detail-name">{{productDetail.name}}</p>
    <p class="detail-price">价格：￥{{productDetail.price}}</p>
    <p class="detail-company">公司：{{productDetail.company}}</p>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="prebuy"/>
      <van-goods-action-button type="danger" text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      productDetail: {}
    };
  },
  created() {
    axios({
      url: url.getProductDetail,
      method: "get",
      params: {
        id: this.$route.params.id //将从其他页面传来的值赋值给id

      }
    })
      .then(res => {
        console.log(res);
        this.productDetail = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
      prebuy(){
          if(JSON.stringify(this.userInfo)==='{}'){
              this.$toast.fail('请先登录')
              this.$router.push('/mine')
          }else{
              axios({
                url:url.addProduct,
                method:'post',
                data:{
                  userId:this.userInfo._id,
                  productId:this.productDetail._id
                }
              }).then(res=>{
                if(res.data.code==200){
                  this.$toast.success('加入购物车成功')
                }else{
                  this.$toast.fail('加入购物车失败')
                }
              }).catch(err=>{
                  this.$toast.fail('加入购物车失败')
                
              })
          }
      }
  },
  computed:{
      ...mapState(['userInfo'])
  }
};
</script>

<style lang="scss" scoped>
.detail {
  img {
    width: 100%;
    height: 5rem;
  }
  &-price {
    color: #ff7300;
    font-size: 0.4rem;
  }
  &-name {
    margin-top:0.2rem;
    color: #333;
    font-weight: bolder;
  }
}
</style>
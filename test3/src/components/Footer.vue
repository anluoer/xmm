<template>
    <van-tabbar v-model="active" @change="change">
      <!-- 切换标签的时候触发@change 参数是active-->
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="records" to="/records">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
      created(){
        this.active=parseInt(localStorage.getItem('active'))
      },
      methods:{
        change(active){
          //把active的值存在localStorage中
          localStorage.setItem('active',active)//localStorage是window下的方法
      },
      },
      
      data(){
      return {
        active:0
      }
    }
    }
</script>

<style lang="scss" scoped>

</style>
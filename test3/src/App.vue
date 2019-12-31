<template>
  <div id="app">
    <!-- 一定要写占位，不然无法呈现内容 -->
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    <!-- v-if判断是否显示 -->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 标签栏 -->
    <!-- <Footer></Footer> -->
    <router-view name="Footer"></router-view>
    
  </div>
</template>
<script>
  // import Footer from '@/components/Footer.vue'
  export default{
    // components:{
    //   Footer
    // },
    data(){
      return {
        active:0
      }
    }
  }

</script>
<style lang="scss">

</style>

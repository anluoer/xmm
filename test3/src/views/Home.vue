<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" id="title">
      <van-icon name="search" slot="left" />
      <van-icon @click="$router.push('/mine')" slot="right" >{{JSON.stringify(userInfo)==='{}'?'未登录':userInfo.userName}}</van-icon>
    </van-nav-bar>
      <!-- 轮播图 -->
      <div id="carousel">
        <van-swipe  :autoplay="3000" indicator-color="white">
          <van-swipe-item  v-for="(obj,index) in ImageList" :key="index">
            <img id="carousel-img" v-lazy="obj.path" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      
    
    <div id="hot">
      <p id="hot-head">热门商品</p>
      <div id="hot-produce">
        <swiper id="hot-produce-box" :options="swiperOption">
          <swiper-slide id="hot-produce-box-content" v-for="(item,index) in hotProduceList" :key="index">
            <img :src="item.img" alt="">
            <div>
              <p>{{item.name}}</p>
              <p>{{item.date}}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 推荐商品 -->
    <div id="varietyItem">
      <p id="varietyItem-title">商品推荐</p>
      <ul id="varietyItem-content">
        <li v-for="(item,index) in varietyList" :key="index" id="varietyItem-content-item">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
          <p>{{item.owner}}</p>
          <p>{{item.price}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//用的是Vue-Awesome-Swiper组件库
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import url from '@/service.config.js'
  import axios from 'axios'
  import {mapState} from 'vuex'
  // import { mapState } from "vuex";
  export default {
    data(){
      return{
      ImageList:[
        {
          path:'./images/1.jpg'
        },{
          path:'./images/2.jpg'
        },{
          path:'./images/3.jpg'
        }      
      ],
      hotProduceList:[
        {
          name:'四轮车1',
          date:'2019.2.3',
          img:'./images/1.jpg'
        },
        {
          name:'四轮车2',
          date:'2019.2.3',
          img:'./images/2.jpg'
        },
        {
          name:'四轮车3',
          date:'2019.2.3',
          img:'./images/3.jpg'
        },{
          name:'四轮车4',
          date:'2019.2.3',
          img:'./images/1.jpg'
        },{
          name:'四轮车5',
          date:'2019.2.3',
          img:'./images/1.jpg'
        },{
          name:'四轮车6',
          date:'2019.2.3',
          img:'./images/1.jpg'
        }
      ],
      varietyList:[],
      swiperOption:{
        slidesPerView:3
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
created(){
  //多加引号引发的惨案
  let url5=url.getVarietyItem;
  axios.get(url5).then(res=>{
    console.log(res);
    this.varietyList=res.data;
  }) .catch(()=>{
    console.log('no')
  });
},
computed:{
    ...mapState(['userInfo'])
  }
};
  
</script>
<style lang="scss" scoped>
.home{
  background-color:  #eee;
}
#title{
  height:1rem;
  line-height: 1rem;
  //设置元素的堆叠顺序
  z-index:1
}

#carousel{
  height:3rem;
  &-img{
    width: 100%;
    height: 3rem;
  }
}

#hot{
  background-color: #fff;
  margin-top: 0.2rem;
  overflow: hidden;
  &-head{
    height:0.5rem;
    line-height: 0.5rem;
  }
  &-produce{
    height:2rem;
    &-box{
      &-content{
      width:2rem;
      text-align: center;
      img{
      height:2rem;
      width:2rem;
    }
    }
    }
    
    
    
  }
}

#varietyItem{
  margin-top: 0.2rem;
  background-color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  &-content{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    &-item{
      flex-basis: 45%;
      img{
        width:2rem;
        height:2rem
      }
    }
  }
}



  

</style>
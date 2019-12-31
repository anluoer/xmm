import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// import Cart from '../views/Cart.vue';
// import Mine from '../views/Mine.vue';
// import Records from '../views/Records.vue';
const Home=()=>import('../views/Home.vue')
const Cart=()=>import('../views/Cart.vue')
const Mine=()=>import('../views/Mine.vue')
const Records=()=>import('../views/Records.vue')
//路由文件懒加载，将路由写成函数，因而只有在调用的时候才加载

import Detail from '../views/Detail.vue';
import Footerbar from '../components/Footer.vue';
import Error from '../views/Error.vue';



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home,
    components:{
      default:Home,
      'Footer':Footerbar
    },
    meta:{
      keepAlive:true
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    // component: Cart,
    components:{
      default:Cart,
      'Footer':Footerbar
    },
    meta:{
      keepAlive:false
    },
  },
  {
    path: '/mine',
    name: 'Mine',
    // component: Mine,
    components:{
      default:Mine,
      'Footer':Footerbar
    },
    meta:{
      keepAlive:false
    },
  },
  {
    path: '/records',
    name: 'Records',
    // component: Records,
    components:{
      default:Records,
      'Footer':Footerbar
    },
    meta:{
      keepAlive:true
    },
  }, 
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  }, 
  {
    path: '*',
    name:'error',
    component: Error,
  }, 
];

const router = new VueRouter({
  routes,
});

export default router;

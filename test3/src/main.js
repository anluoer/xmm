import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import '@/assets/js/rem.js';
import '@/assets/css/reset.css';

axios.defaults.withCredentials = true    // 请求携带cookie信息  
Vue.prototype.axios=axios;

Vue.config.productionTip = false
// Vue.config.productionTip = false
import {
  SubmitBar,
  Card,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,PullRefresh,List,Row, Col,Toast,CellGroup,Field,Tab, Tabs ,Button,NavBar,Icon,Tabbar, TabbarItem,Swipe, SwipeItem,Lazyload } from 'vant'
Vue.use(SubmitBar).use(Card).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(PullRefresh).use(List).use(Row).use(Col).use(Toast).use(Field).use(CellGroup).use(Tab).use(Tabs).use(Button).use(NavBar).use(Icon).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem ).use(Lazyload )

import '@/mock/mock.js';
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="登录">
        <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="loginUser" />
          <van-field
            label="密码"
            type="password"
            required
            clearable
            placeholder="请输入密码"
            v-model="loginPassword"
          />
        </van-cell-group>
        <div>
          <van-button @click="loginHandler"  type="primary" size="large">登录</van-button>
        </div>
      </van-tab>
      <van-tab title="注册">
        <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="regUser" />
          <van-field
            label="密码"
            type="password"
            required
            clearable
            placeholder="请输入密码"
            v-model="regPassword"
          />
        </van-cell-group>
        <div>
          <van-button @click="regHandler"  type="primary" size="large">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
import {mapActions} from "vuex"
export default {
  data() {
    return {
      active: 2,
      loginUser: "",
      loginPassword: "",
      regUser: "",
      regPassword: "",
      // isloading:loading
    };
  },
  methods: {
    ...mapActions(['loginAction']),
    regHandler() {
      axios({
        url: url.regUser,
        method: "post",
        data: {
          userName: this.regUser,
          password: this.regPassword
        }
      })
        .then(res => {
          console.log("hello");
          console.log(res);
          if (res.data.code == 200) {
            this.$toast.success("注册成功");
            this.regUser = this.regPassword = "";
          } else {
            this.$toast.fail("注册失败11");
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("注册失败22");
        });
    },
    loginHandler(){
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.loginUser,
          password: this.loginPassword
        }
      })
        .then(res => {
          console.log(res.data);
          
          if (res.data.code == 200) {
            this.$toast.success("登录成功");
            //登录成功后修改状态池中的state
            this.loginAction(res.data.userInfo)
            this.regUser = this.regPassword = "";
            this.$router.go(-1)
          } else {
            this.$toast.fail("登录失败");
            // this.isloading=!isloading
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("登录失败");
          // this.isloading=!isloading
        });
    }
  }
};
//cookies 是存在客户端的，session是存在服务器端的
//sessionid存在cookies中
</script>

<style lang="scss" scoped>
</style>
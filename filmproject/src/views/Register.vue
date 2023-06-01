<template>
  <div class="styler0">

    <form @submit.prevent="getregister">
      <div class="styler1">
        <div class="styler2">
          <h3>用户注册</h3>
          <div>
            <label>账号:</label>
            <input type="text" v-model="account" placeholder="请输入账号">
          </div>

          <div>
            <label>密码:</label>
            <input type="password" v-model="password" placeholder="请输入密码">
          </div>
          <button type="submit">注册</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      account: '',
      password: '',
    }
  },
  methods: {
    async getregister() {
      axios({
        url: 'http://localhost:8080/register',
        //   get请求放在url参数中，post请求放在body中
        method: 'get',
        params: { account: this.account, password: this.password }
      }).then(
        response => {
          //   console.log(response)
          alert(response.data);

          // 跳转到登录页面路由， 即redirecttwo,redirecttwo组件会自动跳转到select路由组件，
          this.$router.push({
            path: 'login',
            // query:{
            // data:this.selectmovies,
            // }
          })

        },
        error => {
          console.log('请求失败', error.message);
        }
      );
    }
  }
  // beforeMount(){

  // }
}
</script>
<style>
.styler0 {
  font-size: 20px;
  width: 100%;
  height: 500px;
  display: flex;
  /* 让该div里面的所有元素都按照主轴居中排列 */
  justify-content: center;
  /* 让该div里面的所有元素都按照辅轴居中排列 */
  align-items: center;
}
.styler1{
    width:500px;
    height: 300px;
 
    background-color: rgb(234, 242, 242);
    display: flex;
    /* 让该div里面的所有元素都按照主轴居中排列 */
    justify-content: center;
    /* 让该div里面的所有元素都按照辅轴居中排列 */
    align-items: center;
    
}
</style>
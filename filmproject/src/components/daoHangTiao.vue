<template>
  <div class="style1">
    <!-- 导航条所在div -->

    <div class="style2">
      <!-- 导航条 中的首页、动漫电影搜索框个人中心都写在这里，并给他们都绑定单击事件，点击后就会展示不同的路由页面，首页里面有 -->
      <!-- 网站名 -->
      <div class="style6">LiSir电影网</div>
      <!-- 首页 -->
      <div class="style3">
        <div>
          <router-link class="list-group-item" active-class="active" to="/home">首页</router-link>
        </div>

        <div>
          <router-link class="list-group-item" active-class="active" :to="{
            path: '/Redirectthree',
            query: {
              data: '美食',
            }
          }">美食</router-link>
        </div>

        <div>
          <router-link class="list-group-item" active-class="active" :to="{
            path: '/Redirectthree',
            query: {
              data: '科技',
            }
          }">科技</router-link>
        </div>

        <div>
          <router-link class="list-group-item" active-class="active" :to="{
            path: '/Redirectthree',
            query: {
              data: '游戏',
            }
          }">游戏</router-link>
        </div>

        <div>
          <router-link class="list-group-item" active-class="active" :to="{
            path: '/Redirectthree',
            query: {
              data: '动画',
            }
          }">动画</router-link>
        </div>

        <!-- <div>
          <a>首页2</a>
        </div> -->
      </div>

      <!-- 搜索框 -->
      <div class="style4">
        <form @submit.prevent="getUser">
          <input type="text" v-model="keywords" placeholder="请输入关键字">
          <button type="submit">搜索</button>
        </form>

      </div>

      <!-- 用户中心，鼠标移入会出现下拉框，或者点击直接跳转登录页面 -->
      <div class="style5" v-show="!getshowelements()">
        <button @click="$router.push({ path: 'register' })">
          注册
        </button>
        <button @click="$router.push({ path: 'login' })">
          登录
        </button>
      </div>

      <!-- 登录成功后，注册登录按键消失，欢迎用户001出现 -->
      <div class="location">
        <div class="father" v-show="getshowelements()">
          <div>用户</div>
        </div>
        <div class="son" @click="changeshare()">退出登录</div>
      </div>






      <!-- 登录成功后出现添加电影按钮 -->
      <div class="style8" v-show="getshowelements()">
        <button @click="publishvideo">发布视频</button>
      </div>
    </div>


    <!-- 展示区所在div -->
    <div class="style7">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios'


export default {
  name: "daoHangTiao",
  data() {
    return {
      keywords: '',
      selectmovies: [],
      showelements: false

    };
  },
  methods: {

    //在配置项中， 只有函数能切割作用域，所以像下面两个方法axios与push方法的形参即{}对象里面写的this就是指vm。
    async getUser() {
      // console.log(this.keywords);
      axios({
        url: 'http://localhost:8080/select',
        method: 'GET',
        params: { keywords: this.keywords }
      }).then(
        response => {
          // console.log(response)
          this.selectmovies = response.data;
          //  console.log(this.selectmovies)
          this.$router.push({
            path: 'redirecttwo',
            query: {
              data: this.selectmovies,
            }
          })
          //  console.log(this.category);
        },
        error => {
          console.log('请求失败', error.message);
        }
      );


    },
    publishvideo() {
      this.$router.push({
        path: 'publicvideo',
      })

    },
    getshowelements() {
      this.showelements = this.$store.state.showelement;
      return this.showelements;
    },
    // 点击退出登录后，改变vuex中的共享数据showelement的值，从而出现登录注册按键,并跳转到首页
    changeshare(){
      this.$store.commit('CHANGE',false);
      // console.log(this.$store.state.showelement)
      this.$router.push({
      path:'home',
      })
     }
  },
  components: { router }
}
</script>

<style>
.style1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1；
}

.style2 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(240, 232, 232);
  display: inline-flex;
  flex-shrink: 1;



}

.style3 {
  width: 30%;
  display: flex;
  flex-shrink: 1;
  justify-content: space-around;
}

.style4 {
  width: 30%;
  display: flex;
  justify-content: center;
}

.style5 {
  width: 10%;
  display: flex;
  justify-content: center;
}

.style6 {
  width: 20%;
  color: aqua;
  font-size: 40px;
}

/* 展示区样式 */
.style7 {
  width: 100%;
  height: 100%;
}

.style8 {
  padding-left: 20px;
}

.location .son {
  display: none;
  position: absolute;
  background-color: rgb(219, 24, 70);
}

.location:hover .son {
  display: block;

}
</style>

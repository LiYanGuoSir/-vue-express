<template>
  <div class="typeh0">
    <!-- 轮播图 -->
    <div class="lbtstyle">
      <LunBoTu></LunBoTu>
    </div>

    <!-- 刷新推荐视频按钮，点击后重新执行fasongqingqiu函数， -->
    <div class="typeh6">
      <button @click="getHomeData()" style="width;">刷新推荐视频</button>
    </div>
    <!-- 推荐视频 -->
    <div class="typeh01">
      <div class="typeh1">
        <div class="typeh2" v-for="a in category" :key="a.id" @click="getid(a)">
          <!-- img标签里面width属性的值写成百分比就相当于跟着父元素的百分比大小了 -->
          <img :src="a.picture" alt="" width="100%">
          <div class="typeh3">{{ a.name }}</div>
           <div class="typeh4">
            <div class="typeh5" v-for="tags in a.tags">
              <div>{{ tags }}</div>
            </div>
           </div>
        </div>
       </div>
    </div>


  </div>
</template>

<script>
import LunBoTu from './LunBoTu.vue';

import axios from 'axios';
export default {
  name: "Home",
  data() {
    return {
      category: [],

    };
  },
  methods: {
    async getHomeData() {
      // 向代理服务器发送请求，避免违背同源策略
      axios.get('http://localhost:8080/movie').then(
        response => {
          this.category = response.data.splice(0,10);
          //  console.log(this.category);
        },
        error => {
          console.log('请求失败', error.message);
        }
      )
    },
    // 跳转到播放页面
    getid(a) {
      // console.log(a)
      this.$router.push({
        path: 'details',
        query: {
          data: a,
          // 跳转到播放页面前先判断用户此时是否已经登录
          select: this.getshowelement
        }
      })
    }
  },
  computed: {
    //  每当该计算属性被读取值时，都会执行并获取vuex中的共享数据showelement的值
    getshowelement() {
      // console.log(this.$store.state)
      return this.$store.state.showelement;
    }
  },
  components: { LunBoTu },
  beforeMount() {
    this.getHomeData();

  }

}
</script>

<style>
.typeh0 {
  width: 100%;
  height: 100%;
  display: flex;
  /* 弹性容器里面的元素沿着y轴排列 */
  flex-direction: column;
  /* 空白放两边 */
  /* justify-content: center; */
}

.typeh01{
  width: 100%;
  height: 100%;
  display: flex;
  /* 空白放两边 */
  justify-content: center;
}
.typeh1 {
  width: 1000px;
  height: 400px;
  display: flex;
  /* 弹性容器里面的元素沿着x轴排列，并且自动换行 */
  flex-flow: row wrap;
  /* 空白放两边 */
  justify-content: center;
}

.typeh2 {
  width: 150px;
  height: 150px;
  margin: 10px;
  /* 边框样式为实线solid */
  border: 1px #9b9898 solid;
  display: flex;
  flex-direction: column;

}

.typeh4 {
  width: 100px;
  display: flex;
  /* 让该包裹了导航条中所有的东西(指首页搜索等)的div里面的空白区域在这些东西的两侧*/
  justify-content: space-around;
}

/* 视频类型的样式 */
.typeh5 {
  font-size: 5px;
  padding: 5px;
  color: #7672fb;
  background-color: #f5d7d7;
  /* 调整轮廓四个角的弯曲度，从正方形变成椭圆形 */
  border-radius: 2.778vw;
}

.typeh3 {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  /* 设置文字不换行 */
  white-space: nowrap;
  /* 设置父元素里面的子元素溢出时，设置成溢出的部分裁剪掉不显示 */
  overflow: hidden;
  /* 让多余文字显示成省略号 */
  text-overflow: ellipsis;
}

.typeh6 {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
}

.lbtstyle {
  width: 700px;
  height: 200px;
  /* 轮播图居中 */
  margin: 0 auto;


}
</style>
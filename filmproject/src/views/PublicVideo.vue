<template>
  <div class="stylep0">
    <div>
      <h2>新增电影</h2>
      <form @submit.prevent="publicVideo">
        <div class="styler1">
          <div class="styler2">
            <div>
              <label>视频名称:</label>
              <input type="text" v-model="userdata.name" placeholder="请输入视频名称">
            </div>

            <div>
              <label>视频路径:</label>
              <input type="text" v-model="userdata.baseurl" placeholder="请输入视频路径">
            </div>
            <div>
              <label>封面路径:</label>
              <input type="text" v-model="userdata.picture" placeholder="请输入视频路径">
            </div>
            <div>
              <label>视频类型:</label>
              <input type="text" v-model="userdata.type" placeholder="请输入视频路径">
            </div>
            <div>
              <label>视频标签:</label>
              <input type="text" v-model="userdata.tags" placeholder="请输入视频路径">
            </div>
            <div>
              <label>视频简介:</label>
              <input type="text" v-model="userdata.jianjie" placeholder="请输入视频路径">
            </div>


            <button type="submit">发布视频</button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userdata: {
        name: '',
        type: '',
        tags: '',
        picture: '',
        baseurl: '',
        jianjie: '',
      }
    }
  },
  methods: {
    async publicVideo() {
      axios({
        url: 'http://localhost:8080/addmovie',
        //   get请求放在url参数中，post请求放在body中
        method: 'get',
        params: { userdata: this.userdata }
      }).then(
        response => {
          //   console.log(response)
          alert(response.data);

          // 跳转到登录页面路由， 即redirecttwo,redirecttwo组件会自动跳转到select路由组件，
          //    this.$router.push({
          //         path:'home',
          //         // query:{
          //         // data:this.selectmovies,
          //         // }
          //    })

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
.stylep0 {
  font-size: 20px;
  width: 100%;
  height: 500px;
  display: flex;
  /* 让该div里面的所有元素都按照主轴居中排列 */
  justify-content: center;
  /* 让该div里面的所有元素都按照辅轴居中排列 */
  align-items: center;
}

.stylep1 {
  width: 500px;
  height: 300px;

  background-color: rgb(234, 242, 242);
  display: flex;
  /* 让该div里面的所有元素都按照主轴居中排列 */
  justify-content: center;
  /* 让该div里面的所有元素都按照辅轴居中排列 */
  align-items: center;

}
</style>
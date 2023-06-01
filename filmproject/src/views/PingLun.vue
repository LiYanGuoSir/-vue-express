<template>
  <div>
    <!-- 发布评论的表单 -->
    <div class="style4">
      <form @submit.prevent="postComments">
        <input type="text" v-model="keywords" placeholder="说点什么吧">
        <button type="submit">发布</button>
      </form>

    </div>

    <!-- 遍历接收到的数据并展示评论 -->
    <div class="typepl1" v-for="c of a.pinglun" >
      <div class="typepl2">
        <div class="typepl3">
          <img src="../assets/user.png" alt="" width="100%">
        </div>
        <!-- 上面是图片，下面是图片右边的空间div，该div里面有两个div，分别放用户名称和用户发布的评论 -->
        <div>
          <div class="typepl4">
            <p>
              <span>管理员01</span>
            </p>
          </div>
          <div class="typepl5">
            {{c}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // 保存从后端接收到的该视频的所有评论
      comments:[],
      keywords:'',
    }
  },
  props: ['a'],
  methods: {
    // 用户点击发布评论按钮后，执行该方法，将用户发布的评论发送给后端
    async postComments() {
      // console.log(this.keywords,this.a.id);
      // 除了空字符串转成布尔值为false，其余都转成true。
      if (this.keywords) {     
        axios({
          url: 'http://localhost:8080/pinglun',
          method: 'GET',
          params: { keywords: this.keywords, moviesid: this.a.id }
        }).then(
          response => {
            // console.log(response.data)
            this.comments=response.data[0];
            // console.log( this.comments)
            this.$router.push({
            path: 'redirect',
            query: {
              data: this.comments,
              select: this.getshowelement
            }
            })
          },
          error => {
            console.log('请求失败', error.message);
          }
        );
      } else {
        alert("评论不能为空！请重新输入！")
      }
    },
  },
  computed: {
    //  每当该计算属性被读取值时，都会执行并获取vuex中的共享数据showelement的值
    getshowelement() {
      // console.log(this.$store.state)
      return this.$store.state.showelement;
    }
  },
  beforeMount() {
    // 拿到父组件details当前展示的视频信息，即b
    // console.log(this.a)
  }
}


</script>
<style>
.typepl1 {
  padding: 10px 10px;
  border: #e01313;
}

.typepl2 {

  display: flex;
  /* 每个评论的边框样式 */

  padding: 10px 0;
}

/* 头像样式 */
.typepl3 {
  width: 35px;
  height: 35px;
  /* 左外边距 */
  margin-right: 10px;
}

/* 头像右边的矩形内又开启了flex布局 */
.typepl4 {
  font-size: 13px;
  color: #555;
  display: flex;
  /* 相邻元素之间才会均匀分布空白区域 */
  justify-content: space-between;
  /* 用户名称与用户发布的评论之间的垂直距离 */
  margin-bottom: 5px;
}

.typepl5 {
  font-size: 15px;
}
</style>
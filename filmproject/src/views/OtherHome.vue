<template>
    <div class="typeoo1"> 
        <div class="typeoo2" v-for="a in otherdata" :key="a.id" @click="getid(a)">
            <!-- img标签里面width属性的值写成百分比就相当于跟着父元素的百分比大小了 -->
            <img :src="a.picture" alt="" width="100%">
            <div class="typeoo3">{{a.name}}</div>
            <div class="typeoo4">
              <div class="typeoo5" v-for="tags in a.tags"  >
                  <div>{{ tags }}</div>
            </div>
          </div> 
        </div>
    </div>
  
</template>

<script>

import axios from 'axios';
export default {
    name: "otherhome",
    data() {
      return{
        otherdata:[],
        homes:this.$route.query.data
       };
    },
    methods: {
    async getOtherData(){
        // 向代理服务器发送请求，避免违背同源策略
        axios({
              url:'http://localhost:8080/othermovie',
            //   get请求放在url参数中，post请求放在body中
              method:'get',
              params:{data:this.homes}
         }).then(
            response=>{
                //  console.log(response);
               this.otherdata=response.data;
              //  console.log(this.category);
            },
            error=>{
                console.log('请求失败',error.message);
            }
        )
    },
    
      getid(a){
        // console.log(a)
         this.$router.push({
          path:'details',
          query:{
            data:a,
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
    beforeMount(){
        this.getOtherData();
        
    }
   
}
</script>

<style>
  .typeoo1{
    width:1000px;
    height: 1000px;
  
    display: flex;
        /* 弹性容器里面的元素沿着x轴排列，并且自动换行 */
    flex-flow: row wrap;
    justify-content: center;
  }
  .typeoo2{
    width:150px;
    height: 150px;
    /* 边框样式为实线solid */
    border:1px #9b9898 solid;
    margin:10px;
    /* outline:10px #060606; */
    display: flex;
    flex-direction: column;
    
  }
  .typeoo4{
      width:100px;
      display: flex;
      /* 让该包裹了导航条中所有的东西(指首页搜索等)的div里面的空白区域发布在这些东西的两侧*/
      justify-content: space-around;
    }

    /* 视频类型的样式 */
    .typeoo5{
      font-size: 5px;
      padding: 5px;
          color:#7672fb;
          background-color: #f5d7d7;
          /* 调整轮廓四个角的弯曲度，从正方形变成椭圆形 */
          border-radius: 2.778vw;  
    }
    .typeoo3{
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
</style>
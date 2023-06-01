<template>
     <div class="styleb0">
        <!-- 播放页样式 -->
        <div class="styleb1">     

          <!-- 视频 -->
          <video id ="video" :src = "b.baseurl" controls width="100%"></video>  

          <!--标题 -->
          <div class="styleb2">
              <span class="styleb3">{{b.type}}</span>
              <span class="styleb4">{{b.name}}</span>
          </div>       

          <!-- 类型-->
          <div class="styleb5">
            <div class="styleb6" v-for="tags in tags"  >
                  <div>{{ tags }}</div>
            </div>
          </div> 
          
          <!-- 简介 -->
          <div class="styleb7" @click=" isShow=!isShow">
              <div  v-show="!isShow" style="font-size: 10px;">查看简介</div>
              <h2 v-show="isShow" class="styleb8">{{b.jianjie  }}</h2>
          </div>
          
          <!-- 评论 -->
          <div class="pinglun">
            <div>
              <p>
                <span>评论</span>
                <span>(4070)</span>
              </p>
            </div>
          <PingLun :a="b"></PingLun>
          </div>
        </div>
       
       
        <!--更多推荐  -->
        <div class="tuij0">
            <div>更多推荐</div>
            <div class="moretype" v-for="a in moredata" :key="a.id"  >
            <!-- img标签里面width属性的值写成百分比就相当于跟着父元素的百分比大小了 -->
              <img :src="a.picture"  width="50%" @click="getid2(a)">
              <div class="moretype1">{{a.name }}</div>
           </div>
        </div>
     </div>
</template>

 <script>
import axios from 'axios';
import PingLun from './PingLun.vue';

    export default {
        name:'Details',
        components: { PingLun },
        data() {
          return{
            // home组件第三行div标签中的方法getid执行后会执行push方法，会带着数据a传给details组件并跳转到该组件页面。数据具体在$route里面的query属性里面，
            b:this.$route.query.data,
            tags:this.$route.query.data.tags,
            isShow:false,
            moredata:[]
          };
        },
        //  home组件第三行div标签中的方法getid执行后会执行push方法里面是用query传的数据a给details，所以不能用props配置项，该配置项只会理会用push方法里面用params传的数据！
    // props:['a'],
    methods:{ 
      async moredatad(){

        // 向代理服务器发送请求，避免违背同源策略
        axios.get('http://localhost:8080/moremovie').then(
            response=>{
               this.moredata=response.data;
              //  console.log(this.category);
            },
            error=>{
                console.log('请求失败',error.message);
            }
        )
     },
     //该方法执行后会跳转到一个空白路由组件redirect.vue，该组件在创建时执行生命周期函数created时会再次执行跳转到details。vue路由组件的方法，即$route.push()
     getid2(a){
        // console.log(a)
         this.$router.push({
          path:'redirect',
          query:{
            data:a,
                // 跳转到播放页面前先判断用户此时是否已经登录
            select:this.getshowelement
          }
         })
      }

    },
    computed:{
      //  每当该计算属性被读取值时，都会执行并获取vuex中的共享数据showelement的值
      getshowelement(){
        // console.log(this.$store.state)
        return this.$store.state.showelement;
      }

    },
    beforeMount(){
      // 设置一次性定时器，0.5秒后再执行 向后台获取更多推荐视频的数据，防止后台在将评论数据写入data。json文件过程中写入过慢，还没写入完就访问moremovies路由，导致数据缺失。
      setTimeout(()=>{
        this.moredatad();
      },500)
       
    },
    // 加上组件内路由守卫，跳转到该播放路由前都会执行该方法，判断用户有没有登录，如果没有则提示用户登录
    beforeRouteEnter(to,from,next){
      // console.log(JSON.parse(to.query.select));
      if(JSON.parse(to.query.select)){
        next();
      }else{
        alert("您目前未登录，请登录后查看");
      }
    },
    beforeRouteLeave(to,from,next){
      next()
    }

 }
</script>

<style scope>
    .styleb0{
      width:100%;
      display: flex;
      /* 让该div里面的所有子元素按照x轴从左往右排列，即左边70%宽度的视频页的div，右边 30%的更多推荐的div*/
      justify-content: flex-start;
    }
    .styleb1{
      width:60%;
      margin-top: 50px;
      margin-left: 50px;
      /* 让该包裹了两个div容器的div中所有的弹性元素（即这俩div，一个导航条div，另一个内容区div）都纵向排列 */
      flex-direction: column;
    }
    /* 播放视频下面的标题前面的东西，标题，简介的样式，分别对应styleb2这个div下面的两个span标签 */
    .styleb2{
      /* 内边距padding，盒子与边框之间的距离 */
      padding:5px;
    }
    .styleb3 {
          font-size: 15px;
          padding:0 10px;
          color:#fb7299;
          background-color: #f4f4f4;
          /* 调整轮廓四个角的弯曲度，从正方形变成椭圆形 */
          border-radius: 2.778vw;
        }

    /* 视频类型的父元素的样式 */
    .styleb5{
      width:100px;
      display: flex;
      /* 让该包裹了导航条中所有的东西(指首页搜索等)的div里面的空白区域发布在这些东西的两侧*/
      justify-content: space-around;
    }

    /* 视频类型的样式 */
    .styleb6{
      font-size: 5px;
          padding: 10px;
          color:#7672fb;
          background-color: #f4f4f4;
          /* 调整轮廓四个角的弯曲度，从正方形变成椭圆形 */
          border-radius: 2.778vw;  
    }
    .styleb7{ 
          width:100%;
          font-size: 5px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
    }
    .styleb8{
      font-size: 20px;
      padding: 20px;
    }

    .tuij0{
      width: 40%;
      margin-top: 50px;
      margin-left: 50px;
      display: flex;
      flex-direction: column;
    }
    .moretype{
      width: 100%;
      padding: 10px;
      display: flex;
    }
    .moretype1{
      padding: 10px;
      width:100%;
      display: flex;
      flex-wrap: wrap;
    }

    /* 让评论与评论框沿y轴排列 */
    .pinglun{
      display: flex;
  /* 弹性容器里面的元素沿着y轴排列 */
  flex-direction: column;
    }
</style>
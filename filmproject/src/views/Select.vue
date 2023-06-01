<template>
    <div>
      <!-- 展示用户搜索到的内容界面（由导航条组件中搜索按钮绑定的响应函数被触发后跳转到空白2组件再跳转到该select展示页面） -->
      <div class="types1">
        <div class="types2" v-for="a in cate" :key="a.id" @click="getid(a)">
            <!-- img标签里面width属性的值写成百分比就相当于跟着父元素的百分比大小了 -->
            <img :src="a.picture" alt="" width="100%">
            <div class="types3">{{a.name}}</div>
            <div class="types4">
              <div class="types5" v-for="tags in a.tags"  >
                  <div>{{ tags }}</div>
            </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
 export default{
    data(){
        return {
            // data的值是一个数组，它里面只有一个值为数对象的元素
            cate:this.$route.query.data,
   
        }
    },
    methods:{
        getid(a){ 
        // console.log(a)
         this.$router.push({
          path:'details',
          query:{
            data:a,
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
      
        if(this.cate.length==0){
           alert("您搜索的内容不存在!请重新输入");
           this.$router.push({
           path:'home',
         })
  
        }else{
            // console.log(this.$route)
        }
   
    }
 }
</script>
<style>
  .types1{
    width:100%;
    height: 100%;
    display: flex;
    /* 弹性容器里面的元素沿着x轴排列，并且自动换行 */
    flex-flow: row wrap;
  }
  .types2{
    width:150px;
    height: 150px;
    margin:10px;
    /* 边框样式为实线solid */
    border:1px #9b9898 solid;
    display: flex;
    flex-direction: column;
    
  }
  .types4{
      width:100px;
      display: flex;
      /* 让该包裹了导航条中所有的东西(指首页搜索等)的div里面的空白区域在这些东西的两侧*/
      justify-content: space-around;
    }

    /* 视频类型的样式 */
    .types5{
      font-size: 5px;
          padding: 5px;
          color:#7672fb;
          background-color: #f5d7d7;
          /* 调整轮廓四个角的弯曲度，从正方形变成椭圆形 */
          border-radius: 2.778vw;  
    }
    .types3{
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
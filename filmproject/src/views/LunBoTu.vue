<template>
    <div>
        <div class="block">
            <el-carousel height="200px">
                <el-carousel-item v-for="item in imgdatas" :key="item.id">
                  <img :src="item.picture"  width="100%" height="100%">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            imgdatas:[]
        }
    },
    methods:{
        async getimgs(){
        // 向代理服务器发送请求，避免违背同源策略,获取轮播图中的四张图片
        axios.get('http://localhost:8080/moremovie').then(
            response=>{
               this.imgdatas=response.data;
            //    console.log(this.imgdatas);
            },
            error=>{
                console.log('请求失败',error.message);
            }
        )
     },
    },
    beforeMount(){
        this.getimgs();
    }

}
</script>
<style>

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
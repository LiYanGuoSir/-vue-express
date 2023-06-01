<template>
  <div class="style0">
    
   <!-- 导航条组件 -->
   <DaoHangTiao></DaoHangTiao>
  </div>
</template>

<script>
import DaoHangTiao from './components/daoHangTiao.vue';

  export default {
    name:"App",
    data() {
      return{ };
    },
    components: { DaoHangTiao }
}
</script>

<style>
   .style0{
    width: 100%;
    height: 100%;
    display: flex;
  
    /* 让空白区域分布在两侧*/
    justify-content: center;
   }
   
</style>

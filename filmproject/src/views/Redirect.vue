<template>
    <div></div>
</template>

<script>
 export default{
    data(){
        return {
           
        }
    },
    beforeMount(){
        this.$router.push({
          path:'details',
          query:{
            data:this.$route.query.data,
            select:this.$route.query.select
          }
         })
    }
 }
</script>
<style>

</style>
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
        // console.log(this.$route)
        this.$router.push({
          path:'select',
          query:{
            data:this.$route.query.data,
          }
         })
    }
 }
</script>
<style>

</style>
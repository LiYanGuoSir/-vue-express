<template>
    <div class="stylel0">


        <form @submit.prevent="getlogin">
            <div class="stylel1">
                <div class="stylel2">
                <h3>用户登录</h3>
                <div>
                    <label>账号:</label>
                    <input type="text" v-model="account" placeholder="请输入账号">
                </div>

                <div>
                    <label>密码:</label>
                    <input type="password" v-model="password" placeholder="请输入密码">
                </div>
                <button type="submit">登录</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            account: '',
            password: '',
            IsShow: true,
        }
    },
    methods: {
        async getlogin() {
            axios({
                url: 'http://localhost:8080/login',
                //   get请求放在url参数中，post请求放在body中
                method: 'get',
                params: { account: this.account, password: this.password }
            }).then(
                response => {
                    //   console.log(response)

                    if (response.data) {
                        alert("登录成功！");
                        // console.log(this.$store.state)
                        //改变vuex中共享数据showelement的值为true，让组件daohangtiao中的isshow的值变成true，显示出登录按钮。this.$store.state.showelement
                        this.$store.commit('CHANGE',true);
                        // console.log(this.$store.state)
                        this.$router.push({
                            path: 'home',
                        })
                    } else {
                        alert("登录失败！请重新登录")
                    }
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
.stylel0 {
    font-size: 20px;
    width: 100%;
    height: 500px;
    display: flex;
    /* 让该div里面的所有元素都按照主轴居中排列 */
    justify-content: center;
    /* 让该div里面的所有元素都按照辅轴居中排列 */
    align-items: center;
}
.stylel1{
    width:500px;
    height: 300px;
 
    background-color: rgb(234, 242, 242);
    display: flex;
    /* 让该div里面的所有元素都按照主轴居中排列 */
    justify-content: center;
    /* 让该div里面的所有元素都按照辅轴居中排列 */
    align-items: center;
    
}

</style>
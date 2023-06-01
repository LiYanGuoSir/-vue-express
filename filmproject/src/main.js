// 引入vue
import Vue from 'vue'
import App from './App.vue'

// 关闭vue的生产提示
Vue.config.productionTip=false 

// 引入组件element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)

// 引入路由组件
import VueRouter from "vue-router";
import router from "./router";
// 使用路由插件
Vue.use(VueRouter)

// 引入store
import store from './store'


// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el:'#app',
  render: h =>h(App),
  store,
  router:router
})
import VueRouter from "vue-router";

import Details from '../views/Details.vue';
import Home from '../views/Home.vue';
import Redirect from '../views/Redirect.vue';
import Select from '../views/Select.vue';
import Redirecttwo from '../views/Redirecttwo.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import PublicVideo from '../views/PublicVideo.vue';
import OtherHome from '../views/OtherHome.vue';
import Redirectthree from '../views/RedirectThree.vue';

export default new VueRouter({
  routes:[
   // 默认路由为home
   {
      path:'/',
      component:Home,

   },
     {
        path:'/details',
        component:Details,
     },
     {
      path:'/redirect',
      component:Redirect,
     },
     {
      path:'/select',
      component:Select,
     },
     {
      path:'/redirecttwo',
      component:Redirecttwo,
     },
     {
      path:'/login',
      component:Login,
     },
     {
      path:'/register',
      component:Register,
     },

     {
      path:'/publicvideo',
      component:PublicVideo,
     },
     {
      path:'/redirectthree',
      component:Redirectthree,
     },
   //   其他首页路由
   {
      path:'/otherhome',
      component:OtherHome,
     },
     
   //   首页路由
     {
        path:'/home',
        component:Home,
        // children:[
        //   {
        //     name:'shouye',
        //     path:'detail/:id/:title',
        //     component:Details,
        //     props:true,
        //   }
        // ]
     }
  ] 
})
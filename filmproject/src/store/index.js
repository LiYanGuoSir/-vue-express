import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 准备actions
const actions={}

const mutations={
    CHANGE(state,value){
        state.showelement=value;
    }
}

const state={
    // 两个共享数据由于判断是否显示标签
    showelement:false,
}


// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})
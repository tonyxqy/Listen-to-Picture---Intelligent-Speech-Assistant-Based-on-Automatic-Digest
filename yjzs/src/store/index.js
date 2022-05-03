import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uploadId:{
      id:''
    }
  },
  mutations: {
    updateUploadId(state,id){
      // if(localStorage.getItem('upload')){
        state.uploadId = id
      // }
    }
  },
  actions: {
  },
  modules: {
  }
})

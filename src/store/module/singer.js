import {getSingerDetail} from '@/api/singer'

const state={
  singer:{}
}
const getters={
  singer(state){return state.singer},
}
//同步修改放在mutations里
const mutations={
  getSinger(state,payload){
    state.singer=payload.singer;
  }
}
//异步修改放在actions里
const actions={
  getSingerDetailById({commit},{singerid}){
    return getSingerDetail(singerid).then((res)=>{
      commit('getSinger',{singer:res.data});
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

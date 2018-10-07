import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // vuex插件,可以查看mutations修改state的日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // vuex的调试debug开启，检测state的修改是否来自mutations

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
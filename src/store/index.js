import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import db from './modules/db'
import structure from './modules/structure'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    structure,
    db
  }
})

import axios from 'axios'
import api from '@/config/api'

const state = {
  profile: '',
  status: '',
}

const getters = {
  profile: state => JSON.parse(localStorage.getItem('user-profile')),
  status: state => state.status,
}

const actions = {
  userInfo: ({commit, dispatch}) => {
    commit('loading')
    axios({url: api.token_user_info, method: 'GET' })
      .then(resp => {
        if (resp.data.status == 'ok') {
          commit('success', resp.data.data)
          console.log('userInfo end');
        }
      })
    .catch(err => {
      console.log(err);
      // commit('error', err)
      // localStorage.removeItem('user-token')
    })
  },
}

const mutations = {
  loading: (state) => {
    state.status = 'loading'
  },
  success: (state, resp) => {
    state.status = 'success'
    localStorage.setItem('user-profile', JSON.stringify(resp))
    // Vue.set(state, 'profile', resp)
  },
  error: (state) => {
    state.status = 'error'
  },
  logout: (state) => {
    state.profile = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

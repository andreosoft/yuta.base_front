import axios from 'axios'
import api from '@/config/api'

const state = {
  token: localStorage.getItem('user-token') || '',
  profile: localStorage.getItem('user-profile') || '',
  status: '',
  error: '',
}

const getters = {
  isAuthenticated: state => !!state.token,
  profile: state => JSON.parse(state.profile),
  role: state => state.profile ? JSON.parse(state.profile).role : 0,
  status: state => state.status,
  error: state => state.error,
}

const actions = {
  login: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit('authLoading')
      axios({url: api.token_login, data: user, method: 'POST' })
        .then(resp => {
          if (resp.data.status == 'ok') {
            commit('authSuccess', resp.data.token)
            commit('updateProfile', resp.data.profile)
          } else {
            commit('authError', resp.data.error)
          }
          resolve(resp)
        })
      })
  },
  logout: ({commit, dispatch}) => {
        commit('authLogout')
    }
}

const mutations = {
  authLoading: (state) => {
    state.status = 'loading'
  },
  authSuccess: (state, token) => {
    state.status = 'success'
    state.token = token
    localStorage.setItem('user-token',token)
    axios.defaults.headers.common['Authorization'] = token
  },
  authError: (state, error) => {
    state.status = 'error'
    state.error = error
    localStorage.removeItem('user-token')
  },
  authLogout: (state) => {
    state.token = ''
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-profile')
    delete axios.defaults.headers.common['Authorization']
  },
  updateProfile: (state, data) => {
    state.profile = JSON.stringify(data)
    localStorage.setItem('user-profile', JSON.stringify(data))
  },
  updateStore: (state, val) => {
    var p = JSON.parse(state.profile)
    p.store = val
    state.profile = JSON.stringify(p)
    localStorage.setItem('user-profile', state.profile)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

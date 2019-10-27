import axios from 'axios'
import api from '@/config/api'

const state = {
  structure: '',
  status: '',
}

const getters = {
  structure: () => JSON.parse(localStorage.getItem('structure')),
  status: state => state.status,
}

const actions = {
  structure: ({commit, dispatch}) => {
    commit('loading')
    axios({url: api.structure, method: 'GET' })
      .then(resp => {
        if (resp.data.status == 'ok') {
          commit('success', resp.data.data)
        }
      })
    .catch(err => {
      console.log(err);
    })
  },
}

const mutations = {
  loading: (state) => {
    state.status = 'loading'
  },
  success: (state, resp) => {
    state.status = 'success'
    localStorage.setItem('structure', JSON.stringify(resp))
    // Vue.set(state, 'profile', resp)
  },
  error: (state) => {
    state.status = 'error'
  },
  logout: (state) => {
    state.structure = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

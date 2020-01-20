import axios from 'axios'
import api from '@/config/api'

const state = {
  options: {},
  status: '',
}

const getters = {
  getall: state => state.options,
  status: state => state.status
}

const actions = {
  getall: ({ commit, dispatch }) => {
    commit('loading')
    axios({ url: api.options_data, method: 'GET' })
      .then(resp => {
        if (resp.data.status == 'ok') {
          commit('success', resp.data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  update: ({ commit, state }, data) => {
    if (data.i != undefined) {
      let el = state.options;
      el[data.i] = data.v;
      axios({ url: api.options, method: 'PUT', params: { name: data.i }, data: { value: data.v } });
      commit('success', el);
    }
  },
  create: ({ state, commit }, data) => {
    let el = state.options;
    el[data.i] = data.v;
    axios({ url: api.options, method: 'POST', data: { name: data.i, value: data.v } })
    commit('success', el);
  },
  remove: ({ commit, state }, index) => {
    let el = state.options;
    delete el[index];
    axios({ url: api.options, method: 'delete', data: { name: index } })
    commit('success', el);
  },
}

const mutations = {

  loading: (state) => {
    state.status = 'loading'
  },
  success: (state, resp) => {
    state.status = 'success'
    state.options = resp;
  },
  error: (state) => {
    state.status = 'error'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import axios from 'axios'
import api from '@/config/api'

const state = {
  structure: {},
  status: '',
}

const getters = {
  structure: state => state.structure,
  fields: state => table => { 
    let res = {};
    for (let el of state.structure[table]) {
      res[el.field_name] = null;
    }
    return res;
  } ,
  status: state => state.status,
  width: state => (table, el) => {
    if (Array.isArray(state.structure[table])) {
      let count = state.structure[table].length + 1;
      return 100 / count;
    }

  }
}

const actions = {
  structure: ({commit, dispatch}) => {
    commit('loading')
    axios({url: api.structure_data, method: 'GET' })
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
    state.structure = resp
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

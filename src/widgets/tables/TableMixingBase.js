import axios from 'axios'
import router from '@/config/router'
import func from '@/libs/func'

export default {
  props: {
    title: String,
    actions: Array,
    fields: Array,
    api: String,
  },
  data: function() {
    return {
      loading: false,
      error: null,
      selected_all: false,
      sort: {
        key: 'id',
        order: 'ASC'
      },
      filters: {},
      data: []
    }
  },
  computed: {

  },
  created () {
    this.updateRoute()
  },
  watch: {
    '$route': 'updateRoute',
    selected_all: function (newVal, oldVal) {
      if (newVal) {
        for (var el of this.data) {
          el.selected = true
        }
      } else {
        for (var el of this.data) {
          el.selected = false
        }
      }
    }
  },
  methods: {
    updateRoute: function() {
      for (var field in this.fields) {
        if (field.filter) {
          this.filters[field.name] = null
        }
      }
      this.fetchData()
      for (var el of this.data) {
        el.selected = false
      }
     },
    onChangeFilter: function() {
      this.push()
    },
    genTopAction(action) {
      switch (action.type) {
        case 'back':
          router.go(-1)
          break;
        case 'group':
          var data = []
          for (var el of this.data) {
            if (el.selected) data.push(el)
          }
          router.push({ name: action.route, params: {ids: data}})
          break;
        case 'create':
          router.push({ name: action.route })
          break;
        case 'remove':
          this.removeSelected(action.api)
          break;

      }
    },
    genAction(action, id) {
      switch (action.type) {
        case 'update':
          router.push({ name: action.path, params: {id: id}})
      }
    },
    removeSelected: function(api) {
      var data = []
      for (var el of this.data) {
        if (el.selected) data.push(el.id)
      }
      if (data.length == 0) {
        alert('Необходимо выбрать элементы')
      } else {
        if (confirm('Вы уверены что хотите удалить выбранные элементы?')) {
              this.sendData(api, data)
        }
      }

    },
    sortBy: function(el) {
      if (this.sort.key == el.name) {
        if (this.sort.order == 'ASC') {
          this.sort.order = 'DESC'
        } else {
          this.sort.order = 'ASC'
        }
      } else {
        this.sort.key = el.name
        this.sort.order = 'ASC'
      }
      this.push()
    },
    push: function() {
      var params = {
        'sort': this.sort,
        'filters': this.filters
      }
      router.push({ query: {q: func.url_encode(params)} })
    },
    sendData(api, data) {
      this.loading = true
      axios
      .post(api, data)
      .then(response => {
        this.loading = false
        if (response.data.status == 'ok') {
          this.updateRoute()
        }
      })
      .catch(e => {console.log(e)})
    },
    fetchData () {
      var params = {}
      if (this.$route.query.q) {
        params = func.url_decode(this.$route.query.q)
        if (params.sort) {
          this.sort = params.sort
        }
        if (params.filters) {
          this.filters = params.filters
        }
      }
      this.error = null
      this.loading = true
      axios
      .get(this.api, {params: params })
      .then(response => {
        this.loading = false
        if (response.data.data == null) {
          this.data = []
        } else {
          this.data = response.data.data
        }
      })
      .catch(error => { console.log(error) })
    }
  }
}

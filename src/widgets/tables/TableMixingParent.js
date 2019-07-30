import axios from 'axios'
import router from '@/config/router'
import func from '@/libs/func'
import TableMixingBase from './TableMixingBase'
export default {
  mixins: [TableMixingBase],
  props: {

  },
  data: function() {
    return {
      parent: {
        id: '',
        parent: '',
        name: ''
      },
    }
  },
  methods: {
    parent_id: function() {return this.$route.params.parent},
    genTopAction(action) {
      switch (action.type) {
        case 'back':
          router.go(-1)
          break;
        case 'up':
          var par = 0
          if (this.parent.parent > 0) {
            par = this.parent.parent
          }
          router.push({ params: {parent: par}, query: this.$route.query})
          break;
        case 'group':
          var data = []
          for (var el of this.data) {
            if (el.selected) data.push(el)
          }
          router.push({ name: action.route, params: {ids: data}})
          break;
        case 'create':
          router.push({ name: action.route, params: {params: func.url_encode({'ret': this.$route.fullPath})}})
          break;
        case 'remove':
          this.removeSelected(action.api)
          break;

      }
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
      params.parent = this.parent_id()
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
        this.parent = response.data.parent
      })
      .catch(error => { console.log(error) })
    }
  }
}

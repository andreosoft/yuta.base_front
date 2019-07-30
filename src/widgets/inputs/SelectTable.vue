<template>
  <div>
    <table class="table table-bordered table-hover" style="text-align: left; vertical-align: middle;">
      <tbody>
        <tr v-for="el in data_group">
          <td style="width: 100%">{{el.name}}</td>
          <td><button title="удалить" class="btn-blank" style="color: red" @click="onRemoveEl(el)"><i class="fas fa-minus-circle"></i></button></td>
        </tr>
        <tr>
          <td>
            <select class="form-control">
              <option v-for="item in options" :value="item.id">{{item.text}}</option>
            </select>
          </td>
          <td><button title="Добавить" class="btn-blank" style="color: green"><i class="fas fa-plus-circle"></i></button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    // api_data: String,
    // api_select: String,
    data_group: Array,
    // model: Object,
    // name: String,
    // options: Object
  },
  data: function() {
    return {
      loading: false,
      options: [
        {id: 1, text: '123'},
        {id: 1, text: '123'},
      ],
      data: [
        {id: '1', text: '123'},
        {id: '2', text: '123'}
      ],
    }
  },
  created() {
    console.log(this.api_data);
    this.fetchData()
    this.fetchOptions()
  },
  methods: {
    fetchData () {
      this.error = null
      this.loading = true
      axios
        .get(this.api_data, {params: {id: 0} })
        .then(response => {
          this.loading = false
          if (response.data.data == null) {
            this.data = []
          } else {
            this.data = response.data.data
          }
        })
        .catch(error => { console.log(error) })
    },
    fetchOptions () {
      this.error = null
      this.loading = true
      axios
        .get(this.api_select)
        .then(response => {
          this.loading = false
          if (response.data.data == null) {
            this.options = []
          } else {
            this.options = response.data.data
          }
        })
        .catch(error => { console.log(error) })
    },
    onRemoveEl: function(el){
      var index = this.data.indexOf(el)
      if (index > -1) {
        this.data.splice(index, 1);
      }
    },
    onChangeModel: function(field) {
      this.model.validator(field)
    }
  }
}
</script>

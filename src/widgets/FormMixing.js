import axios from 'axios'
import router from '@/config/router'
import BaseText from '@/widgets/inputs/BaseText.vue'
import BaseSelect from '@/widgets/inputs/BaseSelect.vue'
import BaseSelectYesNo from '@/widgets/inputs/BaseSelectYesNo.vue'
import BaseSelectApi from '@/widgets/inputs/BaseSelectApi.vue'
import BaseTextarea from '@/widgets/inputs/BaseTextarea.vue'
import BaseDate from '@/widgets/inputs/BaseDate.vue'
import BaseTime from '@/widgets/inputs/BaseTime.vue'
import BasePanel from '@/widgets/panel/BasePanel.vue'
import mixingValidator from '@/libs/validators'

export default {
  data: function() {
    return {
      validators: null,
      labels: null,
      errors: null,
      api: null,
      loading: false,
      hasChanges: false,
      isLoad: false,
      ctrlDown: false
    }
  },
  created () {
    if (this.$route.params.id) {
      this.fetchData(this.$route.params.id)
    } else { this.isLoad = true }

    this.$root.$el.onkeyup = (e) =>   { if (e.keyCode == 17) this.ctrlDown = false }

    this.$root.$el.onkeydown = (e) => {
      switch (e.keyCode) {
        case 17:
          this.ctrlDown = true
          break;
        case 27:
          this.exit()
          break;
        case 83:
          if (this.ctrlDown) {
            this.submitForm()
            return false
          }
        break;
      }
    }

  },
  watch: {
    fields: {
      handler(newValue, oldValue) {
        if (this.isLoad) {
          this.hasChanges = true
        }
        this.isLoad = true
     },
     deep: true
    }
  },
  methods: {
    fetchData (id) {
      this.loading = true
      axios
      .get(this.api, {params: {id: id} })
      .then(response => {
        this.loading = false
        this.fields = response.data.data
      })
      .catch(error => { console.log(error) })
    },
    exit: function() {
      router.go(-1)
    },
    actions: function (event) {
      switch (event) {
        case 'submit':
          this.submitForm()
          break;
        case 'exit':
          this.exit()
          break;
        case 'submitAndExit':
          if (this.submitForm()) { this.exit() }
          break;

      }
    },
    submitForm: function () {
      if (this.validateAll(this.fields)) {
        this.submit(this.fields, this.api)
        return true
      }
      return false
    },
    submit: function(fields, api) {
      this.loading = true
      axios
      .post(api, fields)
      .then(response => {
        this.loading = false
        this.fields = response.data.data
        this.isLoad = false
        this.hasChanges = false
      })
      .catch(e => {console.log(e)})
    },
    validateAll: function(fields) {
      var noerror = true;
      for (var index in fields) {
        if (this.validate(index, fields[index])) {
          noerror = false
        }
      }
      return noerror
    },
    validate: function (field, value) {
      if (this.validators[field]) {
        return this.errors[field] = this.validator(this.validators[field], value)
      }
    }
  },
  mixins: [mixingValidator],
  components: {
    'v-text': BaseText,
    'v-textarea': BaseTextarea,
    'v-select': BaseSelect,
    'v-select-yes-no': BaseSelectYesNo,
    'v-select-api': BaseSelectApi,
    'v-date': BaseDate,
    'v-time': BaseTime,
    'v-panel': BasePanel,
  }
}

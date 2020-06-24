import loader from "@/views/common/loader.vue";
import formApartment from "@/views/buildings/form_apartment.vue";
import axios from 'axios';
import api from "@/config/api";

export default {
  components: {
    formApartment,
    loader
  },
  data: function() {
    return {
      triggerUpdate: false,
      loading: false,
      form_data_apartment: {},
      form_apartment: false
    };
  },
  methods: {
    onClickEl: function(e) {
      this.loading = true;
      axios
        .get(api.apartment, { params: { id: e.id } })
        .then(response => {
          this.loading = false;
          this.form_data_apartment = response.data.data;
          this.form_apartment = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
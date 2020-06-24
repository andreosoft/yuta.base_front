<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-if="fields">
      <div style="text-align: center;">
        <router-link :to="{name: 'contacts_view', params: { id: fields.id}}" class="btn btn-primary">Открыть контакт</router-link>
      </div>
      <widgetInfo :fields="fields" :loading="loading"></widgetInfo>
      <deals
        :fields="{contact_id: fields.id, contact: fields.name}"
        :filters="{ contact_id: fields.id }"
      ></deals>
    </div>
    <div v-else-if="!loading">
      <div style="text-align: center;">
        <button @click="form_contact = true" class="btn btn-primary">
          <i class="far fa-plus"></i> Создать новый контакт
        </button>
      </div>
    </div>
    <transition name="slide-fade">
      <form-contact v-if="form_contact" :phone="phone" @close-menu="form_contact = false"></form-contact>
    </transition>
  </div>
</template>

<script>
import loader from "@/views/common/loader.vue";
import axios from "axios";
import api from "@/config/api";
import widgetInfo from "./widget_info";
import deals from "@/views/deals/deals.vue";
import formContact from "./form_contact.vue";

export default {
  components: {
    loader,
    formContact,
    widgetInfo,
    deals
  },
  props: {
    phone: String
  },
  data: function() {
    return {
      form_contact: false,
      loading: false,
      fields: null
    };
  },
  mounted() {
    this.fitch();
  },
  methods: {
    fitch: function() {
      if (this.phone.length > 8) {
        this.loading = true;
        axios
          .get(api.contact, { params: { filters: { phone: this.phone } } })
          .then(response => {
            this.loading = false;
            if (response.data.data.length > 0) {
              let id = response.data.data[0].id;
              this.fitchOne(id);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    fitchOne: function(id) {
      this.loading = true;
      axios
        .get(api.contact, { params: { id: id } })
        .then(response => {
          this.loading = false;
          this.fields = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
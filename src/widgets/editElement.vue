<template>
  <div>
    <div v-if="el.type == 'string' || el.type == 'int' || el.type == 'money'">
      <input-text :label="el.name" v-model="val" @change="onChange" :error="error"></input-text>
    </div>
    <div v-else-if="el.type == 'text'">
      <input-textarea :label="el.name" @change="onChange" v-model="val" :error="error"></input-textarea>
    </div>
    <div v-else-if="el.type == 'select' || el.type == 'status'">
      <input-select
        :label="el.name"
        :options="el.data.options"
        @change="onChange"
        v-model="val"
        :error="error"
      ></input-select>
    </div>
    <div v-else-if="el.type == 'select_api'">
      <input-select-api
        :label="el.name"
        :api="el.data.api"
        @change="onChange"
        v-model="val"
        :error="error"
      ></input-select-api>
    </div>
    <div v-else-if="el.type == 'date'">
      <input-select-date
        :label="el.name"
        @change="onChange"
        v-model="val"
        :error="error"
      ></input-select-date>
    </div>
    <div v-else-if="el.type == 'ref' && el.data.field_view == 'contact'">
      <div class="form-group">
        <label>{{el.name}}</label>
        <div class="form-control" @click="select_client=true" >{{view}}</div>
          <select-client v-if="select_client" @change="onChangeClient" @close-menu="select_client=false" ></select-client>
      </div>
    </div>
    <div v-else-if="el.type == 'ref' && el.data.field_view == 'user'">
      <div class="form-group">
        <label>{{el.name}}</label>
        <div class="form-control" @click="select_user=true" >{{view}}</div>
          <select-user v-if="select_user" @change="onChangeUser" @close-menu="select_user=false" ></select-user>
      </div>
    </div>
    <div v-else-if="el.type == 'ref' && el.data.field_view == 'deal'">
      <div class="form-group">
        <label>{{el.name}}</label>
        <div class="form-control" @click="select_deal=true" >{{view}}</div>
          <select-deal v-if="select_deal" @change="onChangeDeal" @close-menu="select_deal=false" ></select-deal>
      </div>
    </div>
    <div v-else-if="el.type == 'ref' && el.data.field_view == 'apartment'">
      <div class="form-group">
        <label>{{el.name}}</label>
        <div class="form-control" @click="select_apart=true" >{{view}}</div>
          <select-apartment v-if="select_apart" @change="onChangeApart" @close-menu="select_apart=false" ></select-apartment>
      </div>
    </div>
  </div>
</template>

<script>
import base_input_modal1 from "@/mixings/base_input_modal1.js";
import selectClient from "@/widgets/select/selectClient.vue"
import selectDeal from "@/widgets/select/selectDeal.vue"
import selectUser from "@/widgets/select/selectUser.vue"
import selectApartment from "@/widgets/select/selectApartment.vue"

export default {
  mixins: [base_input_modal1],
  components: {
    selectClient,
    selectApartment,
    selectDeal,
    selectUser
  },
  props: {
    el: Object,
    value: String,
    error: String,
    view: {
      String,
      default: ""
    }
  },
  data: function() {
    return {
      select_client: false,
      select_apart: false,
      select_user: false,
      select_deal: false
    }
  },
  computed: {
    val: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {
    onChange: function(v) {
      this.$emit("change", v);
    },
    onChangeClient: function(v) {
      this.select_client = false;
      this.$emit("input", v.id);
      this.$emit('change-view', v.view);
      this.onChange(v.id);
    },
    onChangeUser: function(v) {
      this.select_user = false;
      this.$emit("input", v.id);
      this.$emit('change-view', v.view);
      this.onChange(v.id);
    },
    onChangeDeal: function(v) {
      this.select_deal = false;
      this.$emit("input", v.id);
      this.$emit('change-view', v.view);
      this.onChange(v.id);
    },
    onChangeApart: function(v) {
      this.select_apart = false;
      this.$emit("input", v.id);
      this.$emit('change-view', v.view);
      this.onChange(v.id);
    }
  }
};
</script>
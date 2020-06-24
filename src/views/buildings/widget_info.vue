<template>
  <div class="my-3 p-3 bg-white rounded shadow">
    <h4 class="pb-2 mb-0">Информация об помещении</h4>
    <loader v-if="loading"></loader>
    <div class="media text-muted">
      <div class="row">
        <div v-if="fields.type_id == 2">
          <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
            Номер места:
            <b>{{fields.number}}</b>
          </div>
        </div>
        <div v-if="fields.type_id == 3">
          <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
            Номер помещения:
            <b>{{fields.number}}</b>
          </div>
        </div>
        <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
          Тип помещения:
          <b>
            {{apartment_model.type.find(x => x.value == fields.type_id)
            ? apartment_model.type.find(x => x.value == fields.type_id).text : "не задано"}}
          </b>
        </div>
        <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
          Номер помещения:
          <b>{{fields.number}}</b>
        </div>
        <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
          Количество комнат:
          <b>{{fields.rooms}}</b>
        </div>
        <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
          Общая площадь m2:
          <b>{{fields.square}}</b>
        </div>
        <div
          class="col-md-12 border-top border-gray pb-2 pt-2 mb-0"
          v-for="(el, key) in $store.getters['db/structure'].crm_apartments"
          :key="key"
        >
          {{el.name}}:
          <b>
            <view-element :el="el" :fields="fields"></view-element>
          </b>
        </div>
        <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
          Стоимость:
          <b>{{fields.price}}</b>
        </div>
        <div class="col-md-12 border-top border-gray pb-2 pt-2 mb-0">
          Студия:
          <b>{{fields.is_studio == 1 ? 'да' : 'нет'}}</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";
import apartment_model from "@/models/apartment";

export default {
  components: { loader, viewElement },
  props: {
    fields: Object,
    loading: Boolean
  },
  data: function() {
    return {
      apartment_model: apartment_model
    };
  }
};
</script>
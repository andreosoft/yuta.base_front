<template>
  <transition name="right-modal">
    <div class="r-modal">
      <div class="r-header">
        <div class="r-header-title">
          <div v-if="fields.id == null">Добавить новое помещение</div>
          <div v-else>Обновить помещение</div>
        </div>
        <div class="r-header-close">
          <button @click="$emit('close-menu')" title="Закрыть окно">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="r-body">
        <loader v-if="loading"></loader>
        <div>
          <div class="form-group">
            <label>Тип помещения</label>
            <select class="form-control" v-model="fields.type_id">
              <option
                v-for="(el, key) in apartment_model.type"
                :key="key"
                :value="el.value"
              >{{el.text}}</option>
            </select>
          </div>
          <div v-if="fields.type_id == 1">
            <div class="form-group">
              <label>Номер помещения</label>
              <input
                class="form-control"
                @change="validate('floor', fields.number)"
                v-model="fields.number"
                :class="{'is-invalid': errors.number}"
                type="text"
              />
              <div v-if="errors.number" class="invalid-feedback">{{errors.number}}</div>
            </div>
            <div class="form-group">
              <label>Количество комнат</label>
              <input
                class="form-control"
                @change="validate('rooms', fields.rooms)"
                v-model="fields.rooms"
                :class="{'is-invalid': errors.rooms}"
                type="text"
              />
              <div v-if="errors.rooms" class="invalid-feedback">{{errors.rooms}}</div>
            </div>
            <div class="form-group">
              <label>Общая площадь m2</label>
              <input
                class="form-control"
                @change="validate('square', fields.square)"
                v-model="fields.square"
                :class="{'is-invalid': errors.square}"
                type="text"
              />
              <div v-if="errors.square" class="invalid-feedback">{{errors.square}}</div>
            </div>
            <div>
              <div v-for="(el, key) in $store.getters['db/structure'].crm_apartments" :key="key">
                <edit-element
                  :el="el"
                  v-model="fields[el.field_name]"
                  :error="errors[el.field_name]"
                ></edit-element>
              </div>
            </div>
            <!-- <div class="form-group">
              <label>Статус</label>
              <select class="form-control" v-model="fields.status">
                <option
                  v-for="(el, key) in config.apartment.status"
                  :key="key"
                  :value="el.value"
                >{{el.text}}</option>
              </select>
            </div>-->
            <div class="form-group">
              <label>Стоимость</label>
              <input
                class="form-control"
                @change="validate('price', fields.price)"
                v-model="fields.price"
                :class="{'is-invalid': errors.price}"
                type="text"
              />
              <div v-if="errors.price" class="invalid-feedback">{{errors.price}}</div>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkbox_is_studio"
                v-model="is_studio"
              />
              <label class="form-check-label" for="checkbox_is_studio">Студия</label>
            </div>
          </div>
          <div v-if="fields.type_id == 2">
            <div class="form-group">
              <label>Номер места</label>
              <input
                class="form-control"
                @change="validate('floor', fields.number)"
                v-model="fields.number"
                :class="{'is-invalid': errors.number}"
                type="text"
              />
              <div v-if="errors.number" class="invalid-feedback">{{errors.number}}</div>
            </div>
          </div>
          <div v-if="fields.type_id == 3">
            <div class="form-group">
              <label>Номер помещения</label>
              <input
                class="form-control"
                @change="validate('floor', fields.number)"
                v-model="fields.number"
                :class="{'is-invalid': errors.number}"
                type="text"
              />
              <div v-if="errors.number" class="invalid-feedback">{{errors.number}}</div>
            </div>
          </div>
          <div>
            <button @click="submitForm()" class="btn btn-primary" style="width: 100%">Записать</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
    
<script>
import api from "@/config/api";
import axios from "axios";
import mixingValidator from "@/mixings/validators";
import submit_and_validate from "@/mixings/modal_submit_and_validate";
import loader from "@/views/common/loader.vue";
import apartment_model from "@/models/apartment";
import editElement from "@/widgets/editElement.vue";

export default {
  components: {
    loader,
    editElement
  },
  mixins: [mixingValidator, submit_and_validate],
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          type_id: 1,
          rooms: null,
          number: null,
          square: null,
          status: 1,
          is_studio: 0
        };
      }
    }
  },
  data: function() {
    return {
      api: api.apartment,
      apartment_model: apartment_model,
      fields: this.data,
      is_studio: this.data.is_studio == 1 ? true : false,
      validators: {
        number: ["req"]
      },
      errors: {
        number: null,
        rooms: null,
        square: null
      },
      config: config
    };
  },
  watch: {
    is_studio: function(newValue, oldValue) {
      if (newValue) {
        this.data.is_studio = 1;
      } else {
        this.data.is_studio = 0;
      }
    }
  },
  methods: {}
};
</script>
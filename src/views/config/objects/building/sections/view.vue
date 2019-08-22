<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Шахматка</h1>
          <breadcrumb
            v-bind:data="[{url: '#/', title: 'Домой'},
              {url: '#/config/objects', title: 'Настройки'},
              {url: '#/config/objects', title: 'Мои объекты'},
              {url: '#/config/objects/' + fields.object_id, title: fields.object.name},
              {url: '#/config/building/' + fields.id, title: fields.name},
              {url: '', title: 'Шахматка'} ]"
          ></breadcrumb>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div>
      <div>
        <button class="btn btn-primary" title="Добавить подъезд" @click="addNewSection()">
          <i class="far fa-plus"></i> Добавить подъезд
        </button>
      </div>
    </div>
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(el, key) of data_sections" :key="key">
          <div
            class="nav-link"
            :class="{active: tab_active_sections == key}"
            @click="set_active_tab_sections(el, key)"
          >
            Подъезд {{el.name}}
            <span style="margin: 0 0 0 20px">
              <span>
                <button class="btn" title="Редактировать подъезд" @click="editSection(el, key)">
                  <i class="far fa-pencil-alt color-primary"></i>
                </button>
              </span>
              <span>
                <button class="btn" title="Удалить подъезд" @click="removeSection(el, key)">
                  <i class="far fa-trash-alt color-danger"></i>
                </button>
              </span>
            </span>
          </div>
        </li>
      </ul>
      <view-floors v-if="tad_active_section_id" :section_id="tad_active_section_id"></view-floors>
    </div>
    <form-section
      v-if="form_section"
      :data="form_data_section"
      @close-menu="form_section = false"
      @data-update="updateRoute()"
    ></form-section>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import fitch_one_1 from "@/libs/mixings/fitch_one_1.js";
import router from "@/config/router";
import formSection from "./form_section.vue";
import viewFloors from "./view_floors.vue";
import axios from "axios";

export default {
  mixins: [fitch_one_1],
  components: {
    loader,
    breadcrumb,
    formSection,
    viewFloors
  },
  data: function() {
    return {
      api: api.building,
      loading: false,
      fields: {
        name: null,
        object: {
          name: null
        }
      },
      data_sections: [],
      tab_active_sections: 0,
      tad_active_section_id: null,
      form_data_section: {},
      form_section: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    set_active_tab_sections: function(el, key) {
      this.tab_active_sections = key;
      this.tad_active_section_id = el.id;
    },
    addNewSection: function() {
      this.form_data_section = { building_id: this.$route.params.id };
      this.form_section = true;
    },
    editSection: function(el, key) {
      this.form_data_section = el;
      this.form_section = true;
    },
    updateRoute: function() {
      this.fetchData();
      this.fitchSections();
    },
    removeSection: function(el, key) {
      if (confirm("Вы уверены, что хотите удалить подъезд " + el.name)) {
        this.loading = true;
        axios({
          method: "delete",
          url: api.section,
          data: { ids: [el.id] },
          params: {}
        })
          .then(response => {
            this.loading = false;
            this.$root.$emit("show-info", {
              text: "подъезд " + el.name + " удален",
              class: "alert"
            });
            this.updateRoute();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    fitchSections: function() {
      this.loading = true;
      axios
        .get(api.section, { params: { parent_id: this.$route.params.id } })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data_sections = [];
          } else {
            this.data_sections = response.data.data;
            this.set_active_tab_sections(
              this.data_sections[this.tab_active_sections],
              this.tab_active_sections
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
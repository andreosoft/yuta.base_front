<template>
  <div>
    <h5 class="pt-3 pb-2 mb-0 border-bottom text-center">Список задач</h5>
    <div class="comments-body">
      <loader v-if="loading"></loader>
      <div v-if="data && data.length > 0" class="pb-2">
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-sm">
            <thead class>
              <tr>
                <th scope="row">#</th>
                <th
                  v-for="(el, key) in $store.getters['db/structure'].crm_tasks"
                  :key="key"
                >{{el.name}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(fields, k) in data"
                :key="k"
                style="cursor: pointer;"
                @click="$router.push({ name: 'tasks_view', params: { id: fields.id }})"
              >
                <td>{{k+1}}</td>
                <td v-for="(el, key) in $store.getters['db/structure'].crm_tasks" :key="key">
                  <view-element :el="el" :fields="fields"></view-element>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <p class="mb-0 text-center">Нет задач!</p>
        <p class="text-center">Тут вы можете создать задачу для данного контакта</p>
      </div>
      <button class="btn btn-primary btn-block" title="Добавить сделку" @click="form_deal = true">
        <i class="far fa-plus"></i> Добавить задачу
      </button>
      <form-deal
        v-if="form_deal"
        @close-menu="form_deal = false"
        @data-update="fetchData()"
        :data="{contact_id: fields.contact_id, contact: fields.contact}"
      ></form-deal>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import axios from "axios";
import viewElement from "@/widgets/viewElement.vue";
import formDeal from "@/views/tasks/form_task.vue";

export default {
  components: { loader, viewElement, formDeal },
  props: {
    filters: Object,
    sort: {
      type: Object,
      default: () => {}
    },
    fields: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      form_deal: false,
      data: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios
        .get(api.tasks, {
          params: {
            sort: this.sort,
            filters: this.filters
          }
        })
        .then(response => {
          this.loading = false;
          this.data = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.comments-body {
  max-height: 350px;
  overflow-y: scroll;
}
</style>
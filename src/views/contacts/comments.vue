<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-if="data && data.length > 0">
      <div v-for="(el, key) in data" :key="key">
        <div class="media text-muted pt-3">
          <img
            class="bd-placeholder-img mr-2 rounded"
            src="/img/icon-user-default.png"
            width="32"
            height="auto"
            alt
          />
          <p class="media-body pb-3 mb-0 lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">{{el.createdon}} @{{el.users_login}}</strong>
            {{el.content}}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="mb-0 text-center">Нет комментриев!</p>
      <p class="text-center">Тут вы можете создать комментрии для данного контакта</p>
    </div>
    <form class="input-group mb-3" @submit.prevent="add_comment">
      <input
        v-model="comment.content"
        type="text"
        class="form-control"
        placeholder="Напишите комментарий к контакту"
        aria-label="Напишите комментарий к контакту"
        aria-describedby="button-addon2"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >Написать</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import formDeal from "@/views/deals/form_deal.vue";
import axios from "axios";

export default {
  mixins: [],
  components: {
    loader,
    formDeal
  },
  data: function() {
    return {
      comment: {
        content: ""
      },
      loading: false,
      data: [],
      form_deal: false
    };
  },
  created() {
    this.updateRoute();
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute() {
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      axios
        .get(api.contact_get_comments, {
          params: {
            contact_id: this.$route.params.id
          }
        })
        .then(response => {
          this.loading = false;
          if (response.data.data == null) {
            this.data = [];
          } else {
            this.data = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    add_comment() {
      this.loading = true;
      axios
        .post(api.contact_add_comments, this.comment, {
          params: {
            contact_id: this.$route.params.id
          }
        })
        .then(response => {
          this.loading = false;
          this.comment.content = "";
          this.updateRoute();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
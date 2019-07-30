<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div class="clearfix">
      <div class="float-left">
        <template v-if="this.fields.id">
          <h1>
            Обновить
            <b>{{this.fields.login }}</b>
            ({{ this.fields.id }})
          </h1>
        </template>
        <template v-else>
          <h1>Создать нового пользователя</h1>
        </template>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-round btn-primary" title="Сохранить" @click="actions('submit')">
            <i class="fas fa-save"></i>
          </button>
          <div
            class="btn-info-alert"
            title="У вас есть несохраненные изменения"
            v-if="this.hasChanges"
          ></div>
        </span>
        <span style="padding-left: 4px;">
          <button
            class="btn btn-round btn-danger"
            title="Сохранить и закрыть"
            @click="actions('submitAndExit')"
          >
            <i class="fas fa-save"></i>
          </button>
        </span>
        <span style="padding-left: 4px;">
          <button class="btn btn-round btn-danger" title="Закрыть" @click="actions('exit')">
            <i class="fas fa-times-circle"></i>
          </button>
        </span>
      </div>
    </div>
    <hr />
    <v-panel :title="'Основные'">
      <template v-if="!this.fields.id">
        <v-text
          v-model="fields.login"
          :label="labels.login"
          v-on:change-model="validate('login', fields.login)"
          :error="errors.login"
        ></v-text>
      </template>
      <v-text
        v-model="fields.name"
        :label="labels.name"
        v-on:change-model="validate('name', fields.name)"
        :error="errors.name"
      ></v-text>
      <v-text
        v-model="fields.surname"
        :label="labels.surname"
        v-on:change-model="validate('surname', fields.surname)"
        :error="errors.surname"
      ></v-text>
      <v-select
        v-model="fields.status"
        :options="model.status"
        :label="labels.status"
        :error="errors.status"
      ></v-select>
      <v-select
        v-model="fields.role"
        :options="model.role"
        :label="labels.role"
        :error="errors.role"
      ></v-select>
      <v-text
        v-model="fields.password"
        :label="labels.password"
        v-on:change-model="validate('password', fields.password)"
        :error="errors.password"
      ></v-text>
    </v-panel>
  </div>
</template>

<script>
import FormMixing from "@/widgets/FormMixing";
import model from "@/models/user.js";
import api from "@/config/api.js";

export default {
  mixins: [FormMixing],
  data: function() {
    return {
      model: model,
      validators: model.validators,
      labels: model.labels,
      fields: new model.Fields().fields,
      errors: new model.Fields().fields,
      api: api.users
    };
  }
};
</script>

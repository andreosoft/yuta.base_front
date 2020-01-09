<template>
  <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
    <template v-slot:title>{{title}}</template>
    <template v-slot:right>
      <div class="btn-block">
        <router-link :to="{ name: 'finance_create'}" class="btn btn-primary">
          <i class="far fa-plus"></i> Создать
        </router-link>
      </div>
    </template>
    <template v-slot:body>
      <div>
        <div class="row" style="margin-top: 10px;">
          <div class="col">Показано: {{data.length}} из {{pager.count}}</div>
          <div class="col text-right">
            <div style="margin:-13px 0px 0px 0px; white-space: nowrap;">
              <button class="btn btn-secondary btn-round" style="margin: 2px;" @click="setPage(0)">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button
                v-for="(item, key) in pages.page"
                :key="key"
                @click="setPage(item)"
                class="btn btn-round"
                :class="item == pages.current ? 'btn-primary' : 'btn-secondary'"
                style="margin: 2px;"
              >{{item + 1}}</button>
              <button
                class="btn btn-secondary btn-round"
                style="margin: 2px;"
                @click="setPage(maxPage())"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          class="flex-table fixed style-1"
          style="top:100px; left:15px; right: 15px; min-width: 500px;"
        >
          <div class="flex-table-header">
            <div class="flex-table-row">
              <div class="flex-table-col sortable" :style="{width: $store.getters['db/width']('crm_finance')+'%'}" @click="sortBy('id')">
                #
                <span v-if="sort.key != 'id'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else class="arrow">
                  <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                </span>
              </div>
              <div
                v-for="(el, key) in $store.getters['db/structure'].crm_finance"
                :key="key"
                class="flex-table-col sortable"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
                @click="sortBy(el.field_name)"
              >
                {{el.name}}
                <span v-if="sort.key != el.field_name">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else class="arrow">
                  <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                </span>
              </div>
            </div>
            <div class="flex-table-row" style="height: 44px;">
              <div class="flex-table-col" :style="{width: $store.getters['db/width']('crm_finance')+'%'}">
                <input
                  class="form-control"
                  type="text"
                  @change="onChangeFilter('id')"
                  v-model="filters.id"
                />
              </div>

              <div
                v-for="(el, key) in $store.getters['db/structure'].crm_finance"
                :key="key"
                class="flex-table-col"
                :style="{width: $store.getters['db/width']('crm_finance')+'%'}"
              >
                <div v-if="el.type == 'select'">
                  <select
                    v-model="filters[el.field_name]"
                    @change="onChangeFilter(el.field_name)"
                    class="form-control"
                  >
                    <option value>Все</option>
                    <option
                      v-for="(o_el, o_key) in el.data.options"
                      :key="o_key"
                      :value="o_el.value"
                    >{{o_el.text}}</option>
                  </select>
                </div>
                <div v-else>
                  <input
                    class="form-control"
                    type="text"
                    @change="onChangeFilter(el.field_name)"
                    v-model="filters[el.field_name]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-table-body" style="top: 68px;">
            <div
              style="cursor: pointer;"
              @click="$router.push({ name: 'contacts_comments', params: { id: fields.id }})"
              title="Открыть контакт"
              v-for="(fields, k) in data"
              :key="k"
              class="flex-table-row"
            >
              <div
                class="flex-table-col"
                :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
              >{{fields.id}}</div>
              <div
                v-for="(el, key) in $store.getters['db/structure'].crm_contacts"
                :key="key"
                :style="{width: $store.getters['db/width']('crm_contacts')+'%'}"
                class="flex-table-col"
              >
                <view-element :el="el" :fields="fields"></view-element>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </form1>
</template>

<script>
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    viewElement
  },
  data: function() {
    return {
      api: api.finance,
      loading: false,
      title: "Платежи",
      data: []
    };
  }
};

/*
<template>
  <div>
    <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
      <template v-slot:title>{{title}}</template>
    </form1>
    <h4 class="pb-2 mb-0">Платежи</h4>
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-sm">
        <thead class>
          <tr>
            <th width="4%" scope="col">
              id
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </th>
            <th width="100px" scope="col">
              Сумма
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </th>
            <th scope="col">
              Статус
              <div class="input-group input-group-sm">
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Все</option>
                  <option value="1">Оплачен</option>
                  <option value="2">Ожидается</option>
                  <option value="3">Просрочен</option>
                </select>
              </div>
            </th>
            <th scope="col">
              Тип
              <div class="input-group input-group-sm">
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Все</option>
                  <option value="1">Предоплата</option>
                  <option value="2">Платеж по рассрочке</option>
                  <option value="3">Оплата</option>
                </select>
              </div>
            </th>
            <th scope="col">
              Контакт
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </th>
            <th scope="col">
              Сделка
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </th>
            <th scope="col">
              Дата оплаты
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </th>
            <th scope="col">
              Ответственный
              <div class="input-group input-group-sm">
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Все</option>
                  <option value="1">Денис Поважный</option>
                  <option value="2">Андрей Загорец</option>
                </select>
              </div>
            </th>
            <th scope="col">
              Задачи
              <div class="input-group input-group-sm">
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Все</option>
                  <option value="1">Нет задач</option>
                  <option value="2">Просрочены</option>
                  <option value="3">Выполняются</option>
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td nowrap>1000 $</td>
            <td>
              <span class="badge badge-success">Оплачен</span>
            </td>
            <td nowrap scope="col">Предоплата</td>
            <td nowrap scope="col">
              <a href="#/contacts/10/finance">Иванов Иван</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">1 кв от 12/10/19</a>
            </td>
            <td nowrap scope="col">2019-12-24 17:32:27</td>
            <td nowrap scope="col">Денис Поважный</td>
            <td nowrap scope="col">
              <span class="badge badge-success">Выполняются:1</span>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td nowrap>4000 $</td>
            <td>
              <span class="badge badge-secondary">Ожидается</span>
            </td>
            <td nowrap scope="col">Платеж по рассрочке</td>
            <td nowrap scope="col">
              <a href="#/contacts/12/finance">Харламов Дмитрий</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">2 кв от 1/10/19</a>
            </td>
            <td nowrap scope="col">2019-11-14 10:22:27</td>
            <td nowrap scope="col">Денис Поважный</td>
            <td nowrap scope="col">
              <span class="badge badge-secondary">Нет задач</span>
            </td>
          </tr>
          <tr class="table-danger">
            <th scope="row">3</th>
            <td nowrap>700 $</td>
            <td>
              <span class="badge badge-danger">Просрочен</span>
            </td>
            <td nowrap scope="col">Оплата</td>
            <td nowrap scope="col">
              <a href="#/contacts/11/finance">Иванчук Мария</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">4 кв от 12/7/19</a>
            </td>
            <td nowrap scope="col">2019-12-24 17:32:27</td>
            <td nowrap scope="col">Андрей Загорец</td>
            <td nowrap scope="col">
              <span class="badge badge-danger">Просрочены:2</span>
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td nowrap>1000 $</td>
            <td>
              <span class="badge badge-success">Оплачен</span>
            </td>
            <td nowrap scope="col">Предоплата</td>
            <td nowrap scope="col">
              <a href="#/contacts/10/finance">Иванов Иван</a>
            </td>
            <td nowrap scope="col">
              <a href="#/contacts/9/finance">1 кв от 12/10/19</a>
            </td>
            <td nowrap scope="col">2019-12-24 17:32:27</td>
            <td nowrap scope="col">Денис Поважный</td>
            <td nowrap scope="col">
              <span class="badge badge-success">Выполняются:1</span>
            </td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td nowrap>4000 $</td>
            <td>
              <span class="badge badge-secondary">Ожидается</span>
            </td>
            <td nowrap scope="col">Платеж по рассрочке</td>
            <td nowrap scope="col">
              <a href="#/contacts/12/finance">Харламов Дмитрий</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">2 кв от 1/10/19</a>
            </td>
            <td nowrap scope="col">2019-11-14 10:22:27</td>
            <td nowrap scope="col">Денис Поважный</td>
            <td nowrap scope="col">
              <span class="badge badge-secondary">Нет задач</span>
            </td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td nowrap>700 $</td>
            <td>
              <span class="badge badge-danger">Просрочен</span>
            </td>
            <td nowrap scope="col">Оплата</td>
            <td nowrap scope="col">
              <a href="#/contacts/11/finance">Иванчук Мария</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">4 кв от 12/7/19</a>
            </td>
            <td nowrap scope="col">2019-12-24 17:32:27</td>
            <td nowrap scope="col">Андрей Загорец</td>
            <td nowrap scope="col">
              <span class="badge badge-danger">Просрочены:2</span>
            </td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td nowrap>1000 $</td>
            <td>
              <span class="badge badge-success">Оплачен</span>
            </td>
            <td nowrap scope="col">Предоплата</td>
            <td nowrap scope="col">
              <a href="#/contacts/10/finance">Иванов Иван</a>
            </td>
            <td nowrap scope="col">
              <a href="#/contacts/9/finance">1 кв от 12/10/19</a>
            </td>
            <td nowrap scope="col">2019-12-24 17:32:27</td>
            <td nowrap scope="col">Денис Поважный</td>
            <td nowrap scope="col">
              <span class="badge badge-success">Выполняются:1</span>
            </td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td nowrap>4000 $</td>
            <td>
              <span class="badge badge-secondary">Ожидается</span>
            </td>
            <td nowrap scope="col">Платеж по рассрочке</td>
            <td nowrap scope="col">
              <a href="#/contacts/12/finance">Харламов Дмитрий</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">2 кв от 1/10/19</a>
            </td>
            <td nowrap scope="col">2019-11-14 10:22:27</td>
            <td nowrap scope="col">Денис Поважный</td>
            <td nowrap scope="col">
              <span class="badge badge-secondary">Нет задач</span>
            </td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td nowrap>700 $</td>
            <td>
              <span class="badge badge-danger">Просрочен</span>
            </td>
            <td nowrap scope="col">Оплата</td>
            <td nowrap scope="col">
              <a href="#/contacts/11/finance">Иванчук Мария</a>
            </td>
            <td nowrap scope="col">
              <a href="#/deals/13">4 кв от 12/7/19</a>
            </td>
            <td nowrap scope="col">2019-12-24 17:32:27</td>
            <td nowrap scope="col">Андрей Загорец</td>
            <td nowrap scope="col">
              <span class="badge badge-danger">Просрочены:2</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import base_input_1 from "@/mixings/base_input_1.js";
import router from "@/config/router";
import fitch_all_1 from "@/mixings/fitch_all_1";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";

export default {
  mixins: [base_input_1, fitch_all_1],
  components: {
    loader,
    viewElement
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.contact,
      loading: false,
      title: "Финансы",
      form_contact: false,
      data: []
    };
  }
};
*/
</script>
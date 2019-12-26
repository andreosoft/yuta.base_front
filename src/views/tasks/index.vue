<template>
  <div>
    <form1 :breadcrumbs="[{url: '#/', title: 'Домой'}, {url: '', title: title}]" :loading="loading">
      <template v-slot:title>{{title}}</template>
    </form1>
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
      title: "Задачи",
      form_contact: false,
      data: []
    };
  }
};
</script>
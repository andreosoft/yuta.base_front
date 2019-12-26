<template>
  <div>
    <h5 class="pt-3 pb-2 mb-0 border-bottom text-center">Список платежей</h5>
    <div class="comments-body">
      <div class="table-responsive">
        <table class="table table-bordered table-hover table-sm">
          <thead class>
            <tr>
              <th width="4%" scope="col">id</th>
              <th width="100px" scope="col">Сумма</th>
              <th scope="col">Статус</th>
              <th scope="col">Тип</th>

              <th scope="col">Сделка</th>
              <th scope="col">Дата оплаты</th>
              <th scope="col">Ответственный</th>
              <th scope="col">Задачи</th>
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
                <a href="#/deals/13">1 кв от 12/10/19</a>
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
                <a href="#/deals/13">2 кв от 1/10/19</a>
              </td>
              <td nowrap scope="col">2019-11-14 10:22:27</td>
              <td nowrap scope="col">Денис Поважный</td>
              <td nowrap scope="col">
                <span class="badge badge-secondary">Нет задач</span>
              </td>
            </tr>
            <tr class="table-danger">
              <th scope="row">6</th>
              <td nowrap>700 $</td>
              <td>
                <span class="badge badge-danger">Просрочен</span>
              </td>
              <td nowrap scope="col">Оплата</td>

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
              <th scope="row">6</th>
              <td nowrap>1000 $</td>
              <td>
                <span class="badge badge-success">Оплачен</span>
              </td>
              <td nowrap scope="col">Предоплата</td>

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
              <th scope="row">8</th>
              <td nowrap>4000 $</td>
              <td>
                <span class="badge badge-secondary">Ожидается</span>
              </td>
              <td nowrap scope="col">Платеж по рассрочке</td>

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
              <th scope="row">9</th>
              <td nowrap>700 $</td>
              <td>
                <span class="badge badge-danger">Просрочен</span>
              </td>
              <td nowrap scope="col">Оплата</td>

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
              <th scope="row">10</th>
              <td nowrap>1000 $</td>
              <td>
                <span class="badge badge-success">Оплачен</span>
              </td>
              <td nowrap scope="col">Предоплата</td>

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
              <th scope="row">11</th>
              <td nowrap>4000 $</td>
              <td>
                <span class="badge badge-secondary">Ожидается</span>
              </td>
              <td nowrap scope="col">Платеж по рассрочке</td>

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
              <th scope="row">12</th>
              <td nowrap>700 $</td>
              <td>
                <span class="badge badge-danger">Просрочен</span>
              </td>
              <td nowrap scope="col">Оплата</td>

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
              <th scope="row">13</th>
              <td nowrap>1000 $</td>
              <td>
                <span class="badge badge-success">Оплачен</span>
              </td>
              <td nowrap scope="col">Предоплата</td>

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
              <th scope="row">14</th>
              <td nowrap>4000 $</td>
              <td>
                <span class="badge badge-secondary">Ожидается</span>
              </td>
              <td nowrap scope="col">Платеж по рассрочке</td>

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
              <th scope="row">15</th>
              <td nowrap>700 $</td>
              <td>
                <span class="badge badge-danger">Просрочен</span>
              </td>
              <td nowrap scope="col">Оплата</td>

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
    <button class="btn btn-primary btn-block" title="Добавить сделку">
      <i class="far fa-plus"></i> Добавить платеж
    </button>
  </div>
</template>
<script>
</script>
<style lang="scss">
.comments-body {
  max-height: 350px;
  overflow-y: scroll;
}
</style>
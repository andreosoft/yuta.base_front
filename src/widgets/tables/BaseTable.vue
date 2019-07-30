<template>
  <div>
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
      <div v-if="data">
        <div class="row" style="margin-bottom: 3px;">
          <div class="col"><b>{{title}}</b></div>
          <div class="col">Показано: {{data.length}}</div>
          <div class="col text-right">
            <span v-for="action in actions" style="padding-left: 4px;">
              <template v-if="action.view == 'button'">
                <button @click="genTopAction(action)" class="btn-round" :class="action.class" v-html="action.html" :title="action.title"></button>
              </template>
            </span>
          </div>
        </div>
        <table class="table table-hover" style="text-align: center; vertical-align: middle;">
          <thead>
            <tr>
              <template v-for="el in fields">
                <template v-if="el.name == 'checkbox'">
                  <th><input type="checkbox" v-model="selected_all"></th>
                </template>
                <template v-else>
                  <th
                    @click="sortBy(el)"
                    :class="el.sort ? 'sortable' : '' "
                    >

                    {{el.title}}
                    <template v-if="el.sort">
                      <span v-if="sort.key != el.name">
                        <i class="fas fa-sort"></i>
                      </span>
                      <span v-else class="arrow" >
                        <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
                      </span>
                    </template>
                  </th>
                </template>
            </template>
          </tr>
          <tr>
            <th v-for="el in fields">
              <template v-if="el.filter">
                <template v-if="el.filter.type == 'input'">
                  <input class="form-control" type="text" @change="onChangeFilter(el)" v-model="filters[el.name]">
                </template>
                <template v-if="el.filter.type == 'select'">
                  <select class="form-control" @change="onChangeFilter(el)" v-model="filters[el.name]">
                    <option value="">Все</option>
                    <option v-for="el in el.filter.options" :value="el.value">{{el.text}}</option>
                  </select>
                </template>
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="el in data">
            <td v-for="attr in fields"
            :style="attr.style ? attr.style : '' ">
            <template v-if="attr.name == 'checkbox'">
              <input type="checkbox" v-model="el.selected" >
            </template>
            <template v-if="attr.name == 'actions'">
              <div v-for="action in attr.actions">
                <button class="btn btn-round" :class="action.class" :title="action.title" @click="genAction(action, el.id)"><i class="fas" :class="action.icon"></i></button>
              </div>
            </template>
              <template v-if="attr.render">
                <span v-html="attr.render(el, attr.name)"></span>
              </template>
              <template v-else>
                {{el[attr.name]}}
              </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
</template>

<script>
import TableMixing from './TableMixingBase'

export default {
  mixins: [TableMixing]
}
</script>

<style scoped lang="less">
</style>

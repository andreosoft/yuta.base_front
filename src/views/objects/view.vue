<template>
  <div class="" >
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>ЖК Ботанический сад</h1>

          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Настройки</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#/objects">Мои Объекты</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Мои Объекты</li>
          </ol>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Сохранить" @click="actions('submit')"><i class="far fa-save"></i> Сохранить</button>
          <div class="btn-info-alert" title="У вас есть несохраненные изменения" v-if="this.hasChanges"></div>
        </span>
        <span style="padding-left: 4px;">
          <button class="btn btn-danger" title="Сохранить и закрыть" @click="actions('submitAndExit')"><i class="far fa-save"></i></button>
        </span>
        <span style="padding-left: 4px;">
         <button class="btn btn-danger" title="Закрыть" @click="actions('exit')"><i class="far fa-times-circle"></i></button>
        </span>
      </div>
    </div>
    <div class="separator"></div>
</div>
    
</template>

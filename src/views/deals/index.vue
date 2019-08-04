<template>
  <div class="" >
    <div v-if="loading" class="loading-block">
      <div class="loader"></div>
    </div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Сделки</h1>
        </div>
      </div>
      <div class="float-right">
        <span style="padding-left: 4px; position: relative; display: inline-block;">
          <button class="btn btn-primary" title="Сохранить" @click="actions('submit')"><i class="fal fa-plus"></i> Создать</button>
        </span>
      </div>
    </div>
    <div class="separator"></div>
</div>
    
</template>

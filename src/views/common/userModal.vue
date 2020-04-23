<template>
  <transition name="modal">
    <div class="user-modal">
      <div class="modal-header">
        <div @click="$emit('close')">
          <router-link :to="{ name: 'profile'}" class="btn-blank"><i class="fal fa-cog" title="Профиль"></i></router-link>
        </div>
        <div>
          <button class="btn-blank" @click="$emit('close')" title="Закрыть"><i class="fal fa-times"></i></button>
        </div>
      </div>
      <div class="modal-body" @click="$emit('close')">
        <div class="text-center">
          <img src="/img/icon-user-default.png" class="full-rounded" style="width: 100px;">
          <div style="padding-top: 20px;">
            <p><b>{{$store.getters['auth/profile'].login}}</b><br>
            <b>ID: {{$store.getters['auth/profile'].id}}</b><br>
            <b>{{$store.getters['auth/profile'].name}}</b></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

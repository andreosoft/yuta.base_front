<template>
  <div class="">
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>Мои Объекты</h1>

          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Настройки</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Мои Объекты</li>
          </ol>
        </div>
      </div>
      <div class="float-right">
        <button
          title="Выберите дату когда перезвонить"
          class="btn btn-primary"
          style="margin: 4px 0px 0px 4px;"
        >Добавить объект</button>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <img src="img/1-1.jpg" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title text-center">ЖК Ботанический сад</h5>

            <a href="#/objects/view" class="btn btn-primary btn-block">Редактировать</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <img src="img/1-2.jpg" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title text-center">ЖК Прага</h5>

            <a href="#/objects/view" class="btn btn-primary btn-block">Редактировать</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <img src="img/1-3.jpg" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title text-center">ЖК Будапешт</h5>

            <a href="#/objects/view" class="btn btn-primary btn-block">Редактировать</a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

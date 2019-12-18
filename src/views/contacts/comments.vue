<template>
  <div class=""><loader v-if="loading"></loader>
          <div class="media text-muted pt-3">
            <svg
              class="bd-placeholder-img mr-2 rounded"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
              aria-label="Placeholder: 32x32"
            >
              <title>@d.povazhnyy</title>
              <rect fill="#007bff" width="100%" height="100%" />
            </svg>
            <p class="media-body pb-3 mb-0 lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">2019/08/10 11:12 @d.povazhnyy</strong>
              Интересует однокомнатная квартира в микрорайонах под самоотделку
            </p>
          </div>
          <div class="media text-muted pt-3">
            <svg
              class="bd-placeholder-img mr-2 rounded"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
              aria-label="Placeholder: 32x32"
            >
              <title>@username</title>
              <rect fill="#e83e8c" width="100%" height="100%" />
            </svg>
            <p class="media-body pb-3 mb-0 lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">2019/08/10 11:12 @username</strong>
              Передумала, ищет квартиру с ремонтом
            </p>
          </div>
          <div class="media text-muted pt-3">
            <svg
              class="bd-placeholder-img mr-2 rounded"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
              aria-label="Placeholder: 32x32"
            >
              <title>@admin</title>
              <rect fill="#6f42c1" width="100%" height="100%" />
            </svg>
            <p class="media-body pb-3 mb-0 lh-125 border-bottom border-gray">
              <strong class="d-block text-gray-dark">2019/08/10 11:12 @admin</strong>
              В понедельник прийдет в офис к 16:00
            </p>
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Напишите комментарий к контакту"
              aria-label="Напишите комментарий к контакту"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">Написать</button>
            </div>
          </div>
        </div>
</template>

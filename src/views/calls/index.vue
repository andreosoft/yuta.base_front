<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <div class="row mar-0">
          <h1>{{title}}</h1>
          <breadcrumb v-bind:data="[{url: '#/', title: 'Домой'}, {url: '', title: title}]"></breadcrumb>
        </div>
      </div>
      <div class="float-right"></div>
      <form-deal v-if="form_deal" @close-menu="form_deal = false" @data-update="fetchData()"></form-deal>
    </div>
    <div class="separator"></div>
    <div>
      <div class="row" style="margin-top: 10px;">
        <div class="col">Показано: 4 из 4</div>
        
      </div>
      <div
        class="flex-table fixed style-1"
        style="top: 100px; left: 15px; right: 15px; min-width: 500px;"
      >
        <div class="flex-table-header">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1 sortable">
                Время Звонка
                <span>
                <i class="fas fa-sort"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-1 sortable">
              Статус
              <span>
                <i class="fas fa-sort"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2 sortable">
              Ответственный
              <span>
                <i class="fas fa-sort"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2 sortable">
              Клиент
              <span>
                <i class="fas fa-sort"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-2 sortable">
                Номер телефона
                <span>
                <i class="fas fa-sort"></i>
              </span>
            </div>
            <div class="flex-table-col flex-table-col-3 sortable">
                Запись разговора
            </div>
            
          </div>
          
        </div>
        <!---->
        <div class="flex-table-body">
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-danger"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-danger"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-danger"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-danger"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-danger"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-down"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">18:32 21.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-success"><i class="fas fa-arrow-up"></i> Завершен</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Иванов Дмитрий Сергеевич</div>
            <div class="flex-table-col flex-table-col-2">0 555 333333</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">12:43 19.07.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-danger"><i class="fas fa-arrow-down"></i> Нет Ответа</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Воронова Наталья Дмитриевна</div>
            <div class="flex-table-col flex-table-col-2">0 220 700220</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls2.mp3" type="audio/mpeg"></audio></div>
          </div>
          <div class="flex-table-row">
            <div class="flex-table-col flex-table-col-1">11:05 18.06.2019</div>
            <div class="flex-table-col flex-table-col-1"><span class="status-label badge-pill badge-warning"><i class="fas fa-arrow-up"></i> Занято</span></div>
            <div class="flex-table-col flex-table-col-2">Поважный Денис</div>
            <div class="flex-table-col flex-table-col-2">Жаныбек Нурбаев Эсенович</div>
            <div class="flex-table-col flex-table-col-2">+996 558 096866</div>
            <div class="flex-table-col flex-table-col-3"><audio style="calls-audio" controls><source src="calls1.mp3" type="audio/mpeg"></audio></div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import loader from "@/views/common/loader.vue";
import breadcrumb from "@/views/common/breadcrumb.vue";
import router from "@/config/router";
import fitch_all_1 from "@/libs/mixings/fitch_all_1";

export default {
  mixins: [fitch_all_1],
  components: {
    loader,
    breadcrumb
  },
  data: function() {
    return {
      url_upload: api.url_upload,
      api: api.deal,
      loading: false,
      title: "Звонки",
      form_deal: false,
      data: []
    };
  }
};
</script>
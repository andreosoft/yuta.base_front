<template>
  <div>
    <div style="text-center">
      <div class="phone">
        <div class="phone-el">{{status}}</div>
        <div class="phone-el">
          <input
            id="caller-phone_number"
            type="text"
            v-model="phone_number"
            class="form-control form-phone"
            style="width: 190px"
          />
        </div>
        <div class="phone-el">
          <button
            class="btn btn-default call-btn call-btn-i"
            @click="canRing = !canRing"
            :title="canRing ? 'Выключить звонок' : 'Включить звонок'"
          >
            <i class="fa" :class="canRing ? 'fa-bell' : 'fa-bell-slash'"></i>
          </button>
          <button
            class="btn btn-default call-btn call-btn-i"
            :disabled="!session"
            @click="muted = !muted"
            :title="muted ? 'Включить звук' : 'Выключить звук'"
          >
            <i class="fa" :class="muted ? 'fa-microphone-slash' : 'fa-microphone'"></i>
          </button>
          <button
            v-if="canCall"
            class="btn btn-default call-btn call-btn-start"
            @click="startCall()"
            title="Позвонить"
          >
            <i class="fas fa-phone"></i>
          </button>
          <button
            v-else
            class="btn btn-default call-btn call-btn-stop"
            @click="endCall()"
            title="Положить трубку"
          >
            <i class="fas fa-phone"></i>
          </button>
        </div>
      </div>
      <audio id="audio_remote" autoplay="autoplay"></audio>
      <audio id="audio_ringtone" loop src="/rington.mp3"></audio>
    </div>
    <transition name="slide-fade">
      <form-modal v-if="showInbox" @close-menu="showInbox=false">
        <template v-slot:title>
          <div>Входящий звонок</div>
        </template>
        <template v-slot:body>
          <div>
            <div style="text-align: center;font-size: 18px;margin: 0 0 15px 0;">Входящий номер: {{remoteNumber}}</div>
            <div>
              <div class="btn-block" style="text-align: center;">
                <button v-if="canCall" class="btn btn-primary" @click="onAnswer()"><i class="fas fa-phone"></i> Ответить</button>
                <button class="btn btn-danger" @click="endCall()"><i class="fas fa-phone"></i> Отклонить</button>
              </div>
            </div>
            <div>
              <userInfoByPhone :phone="remoteNumber"></userInfoByPhone>
            </div>
          </div>
        </template>
      </form-modal>
    </transition>
  </div>
</template>
      
<script>
import FormModal from "@/widgets/form_modal1/FormModal.vue";
import loader from "@/views/common/loader.vue";
import viewElement from "@/widgets/viewElement.vue";
import userInfoByPhone from "@/views/contacts/userInfoByPhone.vue";

export default {
  components: {
    loader,
    FormModal,
    viewElement,
    userInfoByPhone
  },
  props: {
    server: String,
    password: String,
    user: String,
    ws: String
  },
  data: function() {
    return {
      showInbox: false,
      remoteNumber: "",
      phone_number: "",
      status: "",
      muted: false,
      ua: null,
      uri: null,
      canCall: true,
      canRing: true,
      session: null,
      sipCallTimer: null,
      sipRingTone: null,
      options: null
    };
  },
  mounted() {
    let app = this;
    this.$root.$on("global-call", e => {
      this.phone_number = e.phone_number;
      this.startCall();
    });
    this.sipRingTone = document.getElementById("audio_ringtone");
    this.uri = "sip:" + this.user + "@" + this.server;
    var self = this;
    var socket = new JsSIP.WebSocketInterface(this.ws);
    socket.via_transport = "wss";

    var configuration = {
      session_timers: false,
      use_preloaded_route: false,
      sockets: [socket],
      uri: this.uri,
      password: this.password,
      realm: this.server
    };

    var eventHandlers = {
      progress: e => {
        this.status = "Соединяем";
      },
      failed: e => {
        this.endCall();
      },
      ended: e => {
        this.endCall();
      },
      confirmed: e => {
        this.startTimer();
      },
      muted: e => {
        this.muted = true;
      },
      unmuted: e => {
        this.muted = false;
      }
    };
    var pcConfig = {
      rtcpMuxPolicy: "negotiate",
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302"
          ]
        }
      ]
    };
    this.options = {
      eventHandlers: eventHandlers,
      pcConfig: pcConfig,
      mediaConstraints: { audio: true, video: false },
      rtcOfferConstraints: { offerToReceiveAudio: 1 }
    };

    this.ua = new JsSIP.UA(configuration);

    this.ua.on("connected", e => {
      app.status = "Готов";
    });
    this.ua.on("disconnected", e => {
      app.status = "Нет соединения";
    });
    this.ua.on("registered", e => {});
    this.ua.on("unregistered", e => {
      app.status = "Не зарегистрирован";
    });
    this.ua.on("registrationFailed", e => {
      app.status = "Ошибка регистрации";
    });
    this.ua.on("newRTCSession", function(ev) {
      if (ev.originator === "local") {
        var peerconnection = ev.session.connection;
        peerconnection.addEventListener("addstream", function(e) {
          document.getElementById("audio_remote").srcObject = e.stream;
        });
        return;
      }

      if (!self.canCall) {
        ev.session.terminate(self.options);
        return;
      }
      if (!self.canRing) {
        ev.session.terminate(self.options);
        return;
      }
      var s = ev.session;
      self.session = s;
      app.remoteNumber = ev.request.from.display_name;
      app.startRingTone();
      app.showInbox = true;

      s.on("peerconnection", p => {
        p.peerconnection.addEventListener("addstream", function(e) {
          document.getElementById("audio_remote").srcObject = e.stream;
        });
      });
      s.on("failed", e => {
        app.stopRingTone();
        app.showInbox = false;
      });
      s.on("accepted", e => {
        app.stopRingTone();
      });
      s.on("ended", e => {
        this.endCall();
      });
    });
    this.ua.start();
  },
  watch: {
    muted: function() {
      if (this.muted) {
        this.session.mute();
      } else {
        this.session.unmute();
      }
    }
  },
  methods: {
    n: function(n) {
      return n > 9 ? "" + n : "0" + n;
    },

    closeMenu: function() {
      this.showInbox = false;
    },
    endCall: function() {
      this.canCall = true;
      clearInterval(this.sipCallTimer);
      this.ua.terminateSessions();
      this.session = null;
      this.status = "Готов";
    },

    startTimer: function() {
      this.status = "Разговор 00:00";

      var start = new Date().getTime();
      clearInterval(this.sipCallTimer);
      this.sipCallTimer = setInterval(() => {
        var now = new Date().getTime();
        var distance = now - start;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.status = "Разговор " + this.n(minutes) + ":" + this.n(seconds);
      }, 1000);
    },

    startRingTone: function() {
      try {
        this.sipRingTone.currentTime = 0;
        this.sipRingTone.play();
      } catch (e) {
        console.log(e);
      }
    },

    stopRingTone: function() {
      try {
        this.sipRingTone.pause();
      } catch (e) {
        console.log(e);
      }
    },

    onAnswer: function() {
      this.session.answer(this.options);
      this.canCall = false;
    },

    startCall: function() {
      if (this.phone_number > 0) {
        var sip_num = "sip:" + this.phone_number + "@" + this.server;
        this.session = this.ua.call(sip_num, this.options);
        this.canCall = false;
      }
    }
  }
};
</script>

<style lang="scss" scope>
.phone {
  .form-phone {
    font-size: 20px;
    height: 30px;
    border-radius: 2px;
  }
  .phone-el {
    display: inline-block;
    margin: 0 5px;
  }
  .btn {
    display: inline-block;
  }
  .call-btn-start {
    background: #02b302;
  }
  .call-btn-stop {
    background: #dc3545;
  }
  .call-btn {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin: 2px;
    padding: 0;
  }
  .call-btn-i {
    background: #aaa;
  }
}
</style>

<template>
  <div style="text-center">
    <div class="phone">
      <div class="phone-el">{{status}}</div>
      <div class="phone-el"><input type="text" v-model="$root.phone_number" class="form-control form-phone" style="width: 190px"></div>
      <div class="phone-el">
        <button class="btn btn-default call-btn call-btn-i" @click="canRing = !canRing" :title="canRing ? 'Выключить звонок' : 'Включить звонок'"><i class="fa" :class="canRing ? 'fa-bell' : 'fa-bell-slash'"></i></button>
        <button class="btn btn-default call-btn call-btn-i" :disabled="!session" @click="muted = !muted" :title="muted ? 'Включить звук' : 'Выключить звук'"><i class="fa" :class="muted ? 'fa-microphone-slash' : 'fa-microphone'"></i></button>
        <button v-if="canCall" class="btn btn-default call-btn call-btn-start" @click="startCall()" title="Позвонить"><i class="fas fa-phone"></i></button>
        <button v-else class="btn btn-default call-btn call-btn-stop" @click="endCall()" title="Положить трубку"><i class="fas fa-phone"></i></button>

      </div>
    </div>
    <audio id="audio_remote" autoplay="autoplay"></audio>
    <audio id="sip-ringtone" loop src="/sounds/ringtone.mp3"></audio>
  </div>
</template>
      
<script> 


export default {
  props: {
    server: String,
    password: String,
    user: String,
    ws: String
  },
  data: function() {
    return {
      status: '',
      muted: false,
      ua: null,
      uri: null,
      canCall: true,
      canRing: true,
      session: null,
      sipCallTimer: null,
      sipRingTone: null,
      options: null
    }
  },
  created () {
    this.$root.$on('global-call', () => {
      this.startCall()
    })
    this.sipRingTone = document.getElementById('sip-ringtone');
    this.uri = 'sip:'+this.user+'@'+this.server
    var self = this
    var socket = new JsSIP.WebSocketInterface(this.ws)
    socket.via_transport = "wss";

    var configuration = {
        session_timers: false,
        use_preloaded_route: false,
        sockets  : [ socket ],
        uri      : this.uri,
        password : this.password,
        realm    : this.server,
      }

    var eventHandlers = {
        progress: (e) => { this.status = "Соединяем" },     
        failed: (e) => { this.endCall() },
        ended: (e) => { this.endCall() },      
        confirmed: (e) => { this.startTimer() },
        muted: (e) => { this.muted = true },
        unmuted: (e) => { this.muted = false},                  
      }
      var pcConfig = {
        rtcpMuxPolicy : 'negotiate',
        iceServers: [
            { urls : [
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
              'stun:stun3.l.google.com:19302',
              'stun:stun4.l.google.com:19302',
              ]
            }
        ]
      }
      this.options = {
        eventHandlers: eventHandlers,
        pcConfig : pcConfig,
        mediaConstraints : { audio: true, video: false },
        rtcOfferConstraints : { offerToReceiveAudio : 1 }
      }
    
    this.ua = new JsSIP.UA(configuration);
                
    this.ua.on('connected', (e) => { this.status = "Готов" })
    this.ua.on('disconnected', (e) => { this.status = "Нет соединения" })
    this.ua.on('registered', (e) => { })
    this.ua.on('unregistered', (e) => { this.status = "Не зарегистрирован" })
    this.ua.on('registrationFailed', (e) => { this.status = "Ошибка регистрации" })
    this.ua.on('newRTCSession', function (ev) {
    
    if (ev.originator === 'local') {
        var peerconnection = ev.session.connection;
        peerconnection.addEventListener('addstream', function (e) {
                document.getElementById("audio_remote").srcObject = e.stream
        });
	    return;
    }
  
    if (!self.canCall) { ev.session.terminate(self.options); return; }
    if (!self.canRing) { ev.session.terminate(self.options); return; }  
    //   var s = ev.session;
    //   self.session = s;       
    //   redirectURL = '';
    //   var remoteNumber = ev.request.from.display_name;
    //   console.log(remoteNumber);
    //   // $.get('https://crmroyalmotors.ru/index.php?r=auto/manager/get-info&p=' + remoteNumber, function (data) {
    //   //     redirectURL = data.url;
    //   //     $('#modal-answer .modal-body').html(data.html);
    //   // }, 'json');
    //   this.startRingTone();
    //   // modalWindow.modal('show');
                    
    //   s.on('peerconnection', (p) => {
    //       p.peerconnection.addEventListener('addstream', function (e) {
    //           document.getElementById("audio_remote").srcObject = e.stream
    //       });
              
    //   })
    //   s.on('failed', (e) => {
    //           this.stopRingTone();
    //           // modalWindow.modal('hide');
    //   });
    //   s.on('accepted', (e) => {
    //           this.stopRingTone();
    //           // modalWindow.modal('hide');


    //   }); 
    //   s.on('ended', (e) => {
    //           this.endCall();
    //   });        
          
    });
    this.ua.start();
  },
  watch: {
    muted: function() {
      if (this.muted) {
        this.session.mute()
      } else {
        this.session.unmute()
      }
    }
  },
  methods: {
    n: function (n) {
        return n > 9 ? "" + n : "0" + n;
    },

    endCall: function() {
      this.canCall = true
      clearInterval(this.sipCallTimer)
      this.ua.terminateSessions()
      this.session = null
      this.status = "Готов"
    },

    startTimer: function() {
      this.status = "Разговор 00:00"
              
      var start = new Date().getTime()
      clearInterval(this.sipCallTimer)
      this.sipCallTimer = setInterval(() => {
          var now = new Date().getTime()
          var distance = now - start
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          var seconds = Math.floor((distance % (1000 * 60)) / 1000)
          this.status = "Разговор "+ this.n(minutes) + ':' + this.n(seconds)
        }, 1000);
    },

    startRingTone: function() {
      try { this.sipRingTone.play() } catch (e) { }
    },

    stopRingTone :function() {
      try { this.sipRingTone.pause() } catch (e) { }
    },

    startCall: function() {
      if (this.$root.phone_number > 0) {
        var sip_num = 'sip:'+this.$root.phone_number+'@'+this.server
        this.session = this.ua.call(sip_num, this.options)
        this.canCall = false
      }
    }
  }
}

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

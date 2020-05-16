<template>
  <div class="session flex-spread">
    <i class="fas fa-times close-page" @click="$router.push('/')"></i>
    <!-- Searching list -->
    <section class="session-wrapper-l">
      <div class="session-title">
        <h2>Nearby Listeners</h2>
      </div>
      <!-- List -->
      <div v-if="scanning">
        <ul class="session-list" v-if="uninvitedListeners.length > 0">
          <li v-for="(listener, i) in uninvitedListeners" :key="i" class="flex-spread" @click="$store.dispatch('inviteToSession', findListenerIndex(listener.ip))">
            <p>
              <!-- <i class="fas fa-user" style="margin-right: 1vh;"></i> -->
              {{listener.name}}
            </p>
            <i class="fas fa-plus"></i>
            </li>
        </ul>
        <div v-else style="padding-top: 2vh">
          <Loader/>
          <h3 style="padding: 4vh 0 2vh; opactiy: .3; font-weight: 300;">Searching network for users</h3>
          <span style=" opactiy: .3; font-weight: 300;">users must be connected to the same wifi network as you to join this session</span>
        </div>
      </div>

      <div v-else class="flex" style="height:70%;width: 100%;">
        <button class="invitation-btn accept" @click="scanForUsers"
        style="width: 80%; padding: 2vh; font-size: 3vh;">Search for nearby listeners</button>
      </div>
    </section>

    <!-- Invited list -->
    <section class="session-wrapper-r">
      <div class="session-title">
        <h2>Your Listeners</h2>
      </div>
      <!-- List -->
      <div>
        <ul class="session-list" v-if="$store.getters.invitedListeners.length > 0">
          <li v-for="(listener, i) in $store.getters.invitedListeners" :key="i" class="flex-spread">
            <p :style="'opacity:'+( listener.accepted ? '1' : '.3')">
              <i v-if="listener.accepted" class="fas fa-headphones" style="margin-right: 1vh; color:#ff7e5f"></i>
              <i v-else class="far fa-envelope" style="margin-right: 1vh; opacity: .3"></i>
              {{listener.name}} <i v-if="!listener.accepted"> - invited</i>  
            </p>
            <i class="fas fa-times" @click="$store.commit('removeFromSession', findListenerIndex(listener.ip))"></i>
            </li>
        </ul>
        <h3 v-else style="padding-top: 4vh; opactiy: .3; font-weight: 300;">No listeners added to your session yet.</h3>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue"
export default {
  components:{Loader},
  computed:{
    uninvitedListeners(){
      let allListeners = this.$store.state.session.foundListeners;
      return allListeners.filter(listener => !listener.invited)
    }
  },
  methods:{
    scanForUsers(){
      if(window.navigator.onLine){
        window.native.scanForUsers();
        this.scanning = true;
      }else{

      }
    },
    findListenerIndex(ip){
      for (var i =0; i < this.$store.state.session.foundListeners.length; i++){
          if(this.$store.state.session.foundListeners[i].ip === ip){
              return i;
          }
      }
      return -1
    }
  },
  data(){
    return {
      scanning: false
    }
  }
}
</script>

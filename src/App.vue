<template>
  <div id="app">
    <router-view/>
    <Invitation v-if="$store.state.session.isIncomingInvitation" />
    <Notification v-if="$store.state.view.isNotifyActive" />
  </div>
</template>

<script>
import Updater from '@/scripts/dataUpdate'
import Invitation from '@/components/Invitation.vue'
import Notification from "@/components/Notification.vue"
export default {
  components:{Invitation,Notification},
  mounted(){
    let $this = this;
    setTimeout(()=>{
      $this.$store.dispatch('initUser');
    },200)
  },
  methods:{
    dataUpdate(update){
      Updater(update);
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

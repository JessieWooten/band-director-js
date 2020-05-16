<template>
  <div class="home">
    <i class="fas fa-bars menu-launcher" @click="setPanel(true)"></i>
    <receiver-display @leaveSession="isLeavingSession = true"/>
    <sender-display />
    <div v-if="$store.state.view.selectedNote != null" class="overlay"></div>
    <side-panel :isOpened="isPanelOpened" @close="isPanelOpened=false"/>
    <Rename v-if="$store.state.view.isRenaming"/>
    <div v-if="isPanelOpened" class="panel-overlay fadeIn" @click="setPanel(false)"></div>
    <Confirm v-if="isLeavingSession" @close="isLeavingSession=false"/>
  </div>
</template>
  
<script>
import ReceiverDisplay from '@/components/ReceiverDisplay.vue'
import SidePanel from '@/components/SidePanel.vue'
import Rename from '@/components/Rename.vue'
import Confirm from '@/components/Confirmation.vue'
import SenderDisplay from '@/components/SenderDisplay.vue'
export default {
  name: 'home',
  components: {
    ReceiverDisplay,
    SenderDisplay,
    SidePanel,
    Confirm,
    Rename
  },
  methods:{
    setPanel(isOpened){
      this.isPanelOpened = isOpened;
    }
  },
  data(){
    return {
      isPanelOpened: false,
      isLeavingSession: false
    }
  }
}
</script>

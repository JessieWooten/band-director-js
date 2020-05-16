<template>
    <div class="command-receiver-session">
        <h2 class="flex-spread">
            Session 
            <i class="fas fa-redo-alt" v-if="$store.getters.isMuted || $store.getters.isSoloed" @click="$store.commit('resetSoloMute')"></i>
        </h2>
        <ul class="list" v-if="$store.getters.sessionListeners.length > 0">
            <li class="flex-spread" v-for="(listener, i) in $store.getters.sessionListeners" :key="i">
                <span class=" solo" 
                    :class="{
                        'active': isListenerSoloed(listener.ip),
                        'inactive':($store.getters.isSoloed && !isListenerSoloed(listener.ip))
                    }"
                    @click="$store.commit('solo', listener.ip)"
                >S</span>
                <p :class="{
                    'active-solo': isListenerSoloed(listener.ip),
                    'active-mute': isListenerMuted(listener.ip),
                    'inactive-listener':($store.getters.isSoloed && !isListenerSoloed(listener.ip)) || ($store.getters.isMuted && isListenerMuted(listener.ip))
                }">{{listener.name}}</p>
                <span class=" mute" 
                    :class="{
                        'active': isListenerMuted(listener.ip) ,
                        'inactive':($store.getters.isMuted && !isListenerMuted(listener.ip))
                    }"
                    @click="$store.commit('mute', listener.ip)"
                >M</span>
            </li>
        </ul>
        <div v-else style="text-align: center;">
            <p style="opacity: .7">Your session is empty.</p>
            <button class="start-session-btn" @click="$router.push('/session')"><i class="fas fa-headphones"></i>Start a Session</button>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        isListenerSoloed(ip){
            return this.$store.getters.isSoloed && this.$store.state.session.soloList.indexOf(ip) != -1;
        },
        isListenerMuted(ip){
            return this.$store.getters.isMuted && this.$store.state.session.muteList.indexOf(ip) != -1;
        }
    }
}
</script>

<style>

</style>

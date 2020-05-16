<template>
    <section class="command-sender" :class="{'disabled': !$store.getters.sessionListeners.length === 0}" v-show="!$store.state.session.isListener">
        <div class="flex row">
            <Pad v-for="i in 7" :key="i" 
                :display="$store.state.view.showFlats ? $store.state.view.scale[i]+'♭' : $store.state.view.scale[i-1]+'#'"  
                :note="$store.state.view.showFlats ? $store.state.view.scale[i]+'♭' : $store.state.view.scale[i-1]+'#'" 
                :index="i" :class="{'hidden':shouldBeHidden(i)}"/>
        </div>
        <div class="flex row">
            <Pad v-for="i in 7" :key="i" :display="$store.state.view.scale[i-1]" :note="$store.state.view.scale[i-1]" :index="i-1" />
        </div>

        <div class="flex toggle-flats">
            <span :class="{'active':$store.state.view.showFlats}">♭</span>
            <input type="checkbox" name="show-flats" v-model="!$store.state.view.showFlats">
            <label for="show-flats" @click="$store.commit('toggleSharps')"></label>
            <span :class="{'active':!$store.state.view.showFlats}">#</span>
        </div> 
    </section>
</template>

<script>
import Pad from "@/components/Pad.vue"
export default {
    components:{ Pad },
    methods:{
        shouldBeHidden(i){
            let noShows=['b','e']
            return noShows.indexOf(this.$store.state.view.scale[i-1]) == -1 ? false : true;

        }
    }
}
</script>

<style>

</style>

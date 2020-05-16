<template>
    <div class="pad flex" :class="{'active': isActive,'inactive': !isActive && $store.state.view.selectedNote != null}"
        @touchstart="startTouch($event)"
        @touchmove="touchMove($event)"
        @touchend="$store.dispatch('endTouch')"
    >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 336 386.277" style="enable-background:new 0 0 336 386.277;" xml:space="preserve"
        >
            <polygon class="hexagon" points="1,97.146 168,1.154 335,97.146 
            335,289.132 168,385.124 1,289.132 "/>
        </svg>
        <p v-if="display.length === 2" style="font-size: 4vh;" class="pad-note">
            {{display.split('')[0].toUpperCase()}}
            <span style="font-size: 3vh;margin-top: 2vh">{{display.split('')[1]}}</span>
        </p>
        <p v-else  class="pad-note">{{display}}</p>
        
        <Modifiers v-if="isActive" />
    </div>
</template>

<script>
import Modifiers from '@/components/Modifiers.vue'
export default {
    props:{note:String, index:Number, display:String},
    components:{Modifiers},
    methods:{
        startTouch(e){
            this.$store.dispatch('startTouch', {
                note: this.note, 
                x: e.touches[0].clientX, 
                y: e.touches[0].clientY
            })
        },
        touchMove(e){
            this.$store.dispatch('trackTouch', {
                x: e.touches[0].clientX, 
                y: e.touches[0].clientY
            })
        }
    },
    computed:{
        isActive(){
            return this.$store.state.view.selectedNote === this.note
        }
    }
}
</script>

<style lang="scss">

</style>

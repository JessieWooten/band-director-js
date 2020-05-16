<template>
    <section class="command-receiver flex" :class="{'listener-view': $store.state.session.isListener}">
        <section class="thirds" v-if="!$store.state.session.isListener">
            <h2>Key</h2>
            <!-- <select name="" id="">
                <option value="" ></option>
            </select> -->
        </section>
        <section class="thirds">
            <h2>Current</h2>
            <div class="display-wrapper flex">
                <span class="close" @click="clearDisplay" v-if="!$store.state.session.isListener"><p style="transform:rotate(45deg)">+</p></span>

                <div v-if="$store.state.view.isLoading">
                    <Loader/>
                </div>
                <div class="display flex-start" v-else>
                    <p v-if="$store.state.view.displayMessage.note.length === 2" class="flex-top">{{$store.state.view.displayMessage.note.split('')[0]}}<span style="font-size: 5vh;margin-top: 2vh">{{$store.state.view.displayMessage.note.split('')[1]}}</span></p>
                    <p v-else>{{$store.state.view.displayMessage.note}}</p>
                    <span>{{$store.state.view.displayMessage.modifier}}</span>
                </div>
            </div>

            <!-- recent messages -->
            <div v-if="$store.state.session.isListener" style="padding-top: 5vh; " >
                recents
                <div class="flex" style="width: 100%; text-align:center; margin-top:3vh;">
                    <div v-for="(msg, i) in  $store.getters.recentMessages" :key="i" class="recents-display flex">
                        <p v-if="msg.note.length === 2">{{msg.note.split('')[0]}}<span style="font-size: 3vh;margin-top: 2vh">{{msg.note.split('')[1]}}</span></p>
                        <p v-else>{{msg.note}}</p>
                        <span>{{msg.modifier}}</span>
                    </div>
                </div>
                <button class="leave-session-btn" @click="$emit('leaveSession')">Leave Session</button>
            </div>
        </section>
        <section class="thirds" v-if="!$store.state.session.isListener">
            <session-list />
        </section>
    </section>

</template>

<script>
import SessionList from '@/components/SessionList.vue'
import Loader from '@/components/Loader.vue'
export default {
    components:{ SessionList, Loader },
    methods:{
        clearDisplay(){
            this.$store.dispatch('clearMsg');
        }
    }
}
</script>

<style>

</style>

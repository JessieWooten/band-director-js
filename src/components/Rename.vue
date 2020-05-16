<template>
    <section class="invitation flex">
        <div class="invitation-modal gutter modalSlideIn">
            <div>
                <i class="fas fa-headphones invitation-icon"></i>
                <p class="invitation-msg">What should we call this device?</p>
                <input class="name-input" type="text" name="name-box" :disabled="waiting" v-model="newName"  @keydown.enter="save">
                <div class="flex" v-if="!waiting">
                    <button class="invitation-btn decline flex" @click="cancel">Cancel</button>
                    <button class="invitation-btn accept flex" @click="save">Save</button>
                </div>
                <div v-else>
                    <Loader/>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Loader from "@/components/Loader.vue"
export default {
    components:{Loader},
    methods:{
        cancel(){
            this.$store.commit('setIsRenaming', false);
        },
        save(){
            window.native.saveUsername(this.newName)
            this.waiting = true;
        }
    },
    data(){
        return{
            newName: this.$store.state.user.userName,
            waiting: false
        }
    }
}
</script>

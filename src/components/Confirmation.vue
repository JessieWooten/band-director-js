<template>
    <section class="invitation flex">
        <div class="invitation-modal gutter modalSlideIn">
            <div v-if="!waiting">
                <i class="fas fa-headphones invitation-icon"></i>
                <p class="invitation-msg">Are you sure you want to leave this session?</p>
                <div class="flex">
                    <button class="invitation-btn decline flex" @click="decline">Cancel</button>
                    <button class="invitation-btn accept flex" @click="accept">Leave</button>
                </div>
            </div>
            <div v-else>
                leaving session...
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props:{invitation:Object},
    methods:{
        accept(){
            this.waiting = true;
            this.$store.dispatch('leaveSession',{
                sessionLeadIp: this.$store.state.session.sessionLeadIp,
            })
            this.$emit('close')
        },
        decline(){
            this.$emit('close')
        }
    },data(){
        return{
            waiting: false
        }
    }
}
</script>]\
 
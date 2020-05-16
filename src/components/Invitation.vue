<template>
    <section class="invitation flex">
        <div class="invitation-modal gutter modalSlideIn">
            <div v-if="!waiting">
                <i class="fas fa-headphones invitation-icon"></i>
                <p class="invitation-msg"><span style="font-weight: 700;">{{decodeURIComponent($store.state.session.incomingInvitation.name)}}</span> has invited you to join a session!</p>
                <div class="flex">
                    <button class="invitation-btn decline flex" @click="decline">Decline</button>
                    <button class="invitation-btn accept flex" @click="accept">Accept</button>
                </div>
            </div>
            <div v-else>
                joining session...
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
            this.$store.dispatch('sendInvitationResponse',{
                sessionLeadIp: this.$store.state.session.incomingInvitation.ip,
                response: 1
            })
        },
        decline(){
            this.$store.dispatch('sendInvitationResponse',{
                sessionLeadIp: this.$store.state.session.incomingInvitation.ip,
                response: 0
            })
            this.$store.commit('clearInvitation');
        }
    },data(){
        return{
            waiting: false
        }
    }
}
</script>]\

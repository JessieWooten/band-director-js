<template>
  <div :class="{'notification':true, 'notification__active': isOpened}" @touchstart="closeNotification($event)">
      <div style="position: relative; height: 100%; width: 100%; padding: 10px;">
          <div class="notification-close" @click="closeNotification">
          <span>+</span>
          </div>
      <!-- <div class="top-bar"></div> -->
        <div>
            <i class="fas fa-bell"></i>
        </div>
            <span>{{message}}</span>
        <div class="notification__close">
            <i class="fa fas-times notification__close"></i>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    mounted(){
        let $this = this;
        setTimeout(()=>{$this.notifyUser($this.$store.state.view.notifyMsg)},400)
    },
    beforeDestroy(){
        this.$store.commit('setIsNotifyActive',false);
        this.$store.commit('setNotifyMsg','');
    },
    methods:{
        notifyUser(message){
            this.message = message;
            this.isOpened = true;
            let $this = this;
            this.notifyTimeout = setTimeout(function(){
                $this.isOpened = false;
                let $$this = $this;
                setTimeout(function(){
                $$this.$store.commit('setIsNotifyActive',false)
                },200)
            },4000)
        },
        closeNotification(e){
            e.stopPropagation();
            this.message = '';
            this.isOpened = false;
            clearTimeout(this.notifyTimeout);
            let $this = this;
            setTimeout(()=>{$this.$store.commit('setIsNotifyActive',false)},400)
        }
    },
    data(){
        return{
                message: '',
                isOpened: false,
                notifyTimeout: null
        }
    }
}
</script>
<style lang="scss">
$peach: #F5AB99;
$orange: #FEB47B;
$salmon: #FF7E5F;
$purple: #765285;
$darkpurple: #351C4D;
$bg-purple: #403947;
$white: #ffffff;
$off-white: #fcfcfc;
$black:#1a191b;
$overlay:#59555B;
.notification{
    overflow: hidden;
    position: fixed;
    top: 5vh;
    right: -30vw;
    transition: .2s;
    width: 30vw;
    min-height: 10vh;
    margin: auto;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    background: lighten($bg-purple, 5%);
    display: block;
    z-index: 6000;
    // -webkit-box-shadow: 0px 0px 35px 0px rgba(33,33,30,1);
    // -moz-box-shadow: 0px 0px 35px 0px rgba(33,33,30,1);
    // box-shadow: 0px 0px 35px 0px rgba(33,33,30,1);

    &__active{
        transition: .2s;
        right: 5vh;
        -webkit-box-shadow: 0px 0px 35px 0px rgba(33,33,30,1);
        -moz-box-shadow: 0px 0px 35px 0px rgba(33,33,30,1);
        box-shadow: 0px 0px 35px 0px rgba(33,33,30,1);
    }

    &-close{
        font-size: 14px;
        color: $white;
        padding: 10px;
        position: absolute;
        top: 0;
        right: 0;
        & span{
            display: block;
            transform: rotate(45deg);
        }
    }

    &__message{
        &-wrapper{
        //width: 85%;
        margin-right:26px;
        box-sizing: border-box;
        padding: 5px;
        font-size: 2.5vh;
        }
    }
}
.top-bar{
    background: $orange;
    height: 15px;
    width: calc(100% + 20px);
    position: relative;
    left: -10px;
    margin-bottom: 5px;
}
</style>

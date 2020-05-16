<template>
    <section class="panel-side" :class="{'opened':isOpened}">
        <div class="panel-side-title">
            <h2>Hello, {{$store.state.user.userName}}</h2>
        </div>
        <ul class="panel-list">
            <li class="flex-spread" @click="launchRename">
                <p>Rename Tablet</p>
                <i class="fas fa-chevron-right panel-icon"></i>
            </li>
            <li class="flex-spread" :class="{'disabled': $store.state.session.isListener}" @click="$router.push('/session')">
                <p>Manage Session</p>
                <i class="fas fa-chevron-right panel-icon"></i>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props:{isOpened:Boolean},
    methods:{
        launchRename(){
            this.$emit('close');
            this.$store.commit('setIsRenaming', true);
        }
    }
}
</script>

<style>

</style>

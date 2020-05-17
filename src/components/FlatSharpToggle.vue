<template>
  <div class="flex toggle-flats">
    <span :class="{'active':!$store.state.view.showFlats}">#</span>
    <input type="checkbox" name="show-flats" v-model="$store.state.view.showFlats" />
    <label for="show-flats" @click="$store.commit('toggleSharps')"></label>
    <span :class="{'active': $store.state.view.showFlats}">♭</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>


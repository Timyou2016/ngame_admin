<template>
  <div class="dashboard-container">
<<<<<<< HEAD
    <div class="dashboard-text">NickName: {{ nickname }}</div>
=======
    <div class="dashboard-text">nickname: {{ nickname }}</div>
>>>>>>> 7adeb3e7cc3d63ee369d75da9cba4b1d581200a9
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'nickname'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

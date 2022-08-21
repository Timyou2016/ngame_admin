<template>
  <div class="dashboard-container">
    <component is="adminDashboard" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
export default {
  name: 'Dashboard',
  components: { adminDashboard },
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

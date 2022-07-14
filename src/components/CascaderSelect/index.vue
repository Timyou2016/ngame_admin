<template>
  <el-cascader ref="cascaderSelect" v-model="selectVal" v-bind="$attrs" class="cascader-select" v-on="$listeners">
    <slot />
  </el-cascader>
</template>
<script>

export default {
  name: 'CascaderSelect',
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  computed: {
    selectVal: {
      get() {
        return [...this.value]
      },
      set(val) {
        this.$emit('input', [...val])
        this.$emit('changeSelect', [...val])
      }
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>


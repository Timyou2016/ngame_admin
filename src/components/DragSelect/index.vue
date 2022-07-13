<template>
  <el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" multiple v-on="$listeners">
    <slot />
  </el-select>
</template>

<script>

export default {
  name: 'DragSelect',
  props: {
    value: {
      type: Array
      //required: true
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

<style lang="scss" scoped>
.drag-select {
  ::v-deep {
    .sortable-ghost {
      opacity: .8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
}
</style>

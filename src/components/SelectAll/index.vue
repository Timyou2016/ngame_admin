<template>
  <div class="select-all">
    <div style="margin: 15px 0;"></div>
    <el-tree
      :data="value"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[]"
      :default-checked-keys="[]"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: 'SelectAll',
    props: ['value'],
    data() {
      return {
        defaultProps: {
          children: 'childrens',
          label: 'name'
        }
      };
    }
  };
</script>
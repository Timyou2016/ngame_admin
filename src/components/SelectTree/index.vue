<template>
  <div class="select-tree">
    <div style="margin: 15px 0;"></div>
    <el-tree
      :data="value"
      show-checkbox
      node-key="id"
      ref="refSetPermission"
      :default-expanded-keys="expanded"
      :default-checked-keys="checked"
      :props="defaultProps" v-on="$listeners">
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: 'SelectTree',
    props: ['value','expanded','checked'],
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
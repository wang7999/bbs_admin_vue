<template>
  <el-scrollbar class="side-scrollbar">
    <el-menu :collapse="isCollapse">
      <Submenu
        v-for="menu in menus"
        :key="menu.id"
        :menu="menu"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import store from '@/store'
import Submenu from './Submenu.vue'

const isCollapse = computed(() => !store.state.app.sidebar.opened)

const menus = computed(() => store.getters.menu)

</script>

<style scoped lang="scss">
.side-scrollbar{
  height: 100%;
  // transition: width 3.28s;
  border-right: solid 1px var(--el-menu-border-color);
  .el-scrollbar__view {
    height: 100%;
  }
  .el-menu{
    border: none;
  }
}
</style>

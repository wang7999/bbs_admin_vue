<template>
  <el-container class="container">
    <el-aside
      :width="asideWidth"
    ><Sidebar /></el-aside>
    <el-container class="right-container">
      <Navbar />
      <!-- <TagsView /> -->
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
// import TagsView from './components/TagsView/index.vue'
import store from '@/store'

const asideWidth = computed(() => store.state.app.sidebar.opened ? '200px' : '63px')
</script>

<style scoped lang="scss">
.container{
  height: 100%;
  .right-container{
    transition: width 0.28s;
    flex: 1;
    .layout-main{
      flex-basis: 0%;
    }
  }
}
</style>

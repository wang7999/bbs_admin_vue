<template>
  <div class="navbar">
    <div class="navbar-left">
      <el-icon
        :size="20"
        class="expand-btn"
        :class="{'active': sidebar.opened}"
        @click="toggleSideBar"
      >
        <SvgIcon name="icon-zhedie" />
      </el-icon>
      <Breadcrumbs />
    </div>
    <div class="toolbar">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <img
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          > -->
          <el-icon><i-ep-avatar /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/rcyj-FED/vue3-composition-admin"
            >
              <el-dropdown-item>
                项目地址
              </el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://armour.github.io/vue-typescript-admin-docs/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item
              divided
              @click="logout"
            >
              <span style="display:block;">
                退出登录
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store'
import Breadcrumbs from './Breadcrumbs.vue'

const sidebar = computed(() => store.state.app.sidebar)

const toggleSideBar = () => {
  store.dispatch('ToggleSideBar', false)
  console.log(sidebar.value)
}
const logout = () => {
  console.log(1)
}

</script>

<style scoped lang="scss">
.navbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .navbar-left{
    display: flex;
  align-items: center;
  }
  .expand-btn{
    cursor: pointer;
    &.active{
    transform: rotate(180deg);
    }
  }
}
</style>

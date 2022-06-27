<template>
  <el-menu-item
    v-if="!menu.children?.length"
    :index="menu.path"
    @click="menuChange(menu.path)"
  >
    <el-icon
      v-if="menu.meta.icon"
      class=""
    >
      <SvgIcon :name="menu.meta.icon" />
    </el-icon>
    <span>{{ menu.meta.title }}</span>
  </el-menu-item>

  <el-menu-item
    v-else-if="isOneChild(menu)"
    :index="menu.children[0].path"
    @click="menuChange(menu.children[0].path)"
  >
    <el-icon
      v-if="menu.children[0].meta.icon"
      class=""
    >
      <SvgIcon :name="menu.children[0].meta.icon" />
    </el-icon>
    <span>{{ menu.children[0].meta.title }}</span>
  </el-menu-item>
  <el-sub-menu
    v-else
    :index="menu.path"
  >
    <template #title>
      <el-icon
        v-if="menu.meta.icon"
        class=""
      >
        <SvgIcon :name="menu.meta.icon" />
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template v-if="menu.children?.length">
      <Submenu
        v-for="submenu in menu.children"
        :key="submenu.path"
        :is-nest="true"
        :menu="submenu"
      />
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps({
  menu: {
    type: Object,
    default: null
  }
})
const router = useRouter()
const isOneChild = computed(() => (menu) => menu.children?.length === 1)

const menuChange = (path) => {
  router.push(path)
}
</script>

<style scoped>

</style>

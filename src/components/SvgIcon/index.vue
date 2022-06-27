<template>
  <svg
    class="icon"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  }

})
const symbolId = computed(() => `#${props.name}`)
</script>

<style scoped>

</style>

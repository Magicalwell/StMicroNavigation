<template>
  <RouterView> </RouterView>
  <!-- <keep-alive v-if="openCache" :include="getCaches">
    <component :is="Component" :key="route.fullPath" />
  </keep-alive>
  <component v-else :is="Component" :key="route.fullPath" /> -->
</template>

<script lang="ts">
export default {}
</script>

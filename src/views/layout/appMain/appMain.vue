<template>
  <router-view :key="key">this.$route.path</router-view>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
export default class appmain extends Vue {

}
</script>

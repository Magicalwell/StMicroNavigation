<template>
  <div class="home">
    <component :is="currentRole" />
  </div>
</template>

<script>
// @ is an alias to /src
import workPlace from "@/views/layout/components/workspace/workspace.vue";
export default {
  name: "Home",
  data() {
    return {
      currentRole: "workPlace",
    };
  },
  components: {
    workPlace,
  },
  // computed: {
  //   ...mapGetters(["roles"]),
  // },
  // created() {
  //   if (!this.roles.includes("admin")) {
  //     this.currentRole = "editorDashboard";
  //   }
  // },
};
</script>

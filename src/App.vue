<template>
  <div>
    <Map />
    <ToolTip />
    <!-- <Console /> -->
  </div>
</template>

<script>
import Map from "./components/map.vue";
import ToolTip from "./components/toolTip.vue";
// import Console from "./components/console.vue";

export default {
  name: "App",
  components: {
    Map,
    ToolTip,
    // Console,
  },
  mounted: async function () {
    this.$store.dispatch("setMapAreasData");
    this.$store.dispatch("setUsersData");
  },
};
</script>

<style></style>

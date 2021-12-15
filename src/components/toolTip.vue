<template>
  <div :class="{ shown: tooltipShown }" ref="tooltip" class="tooltip">
    <div class="tooltip-header">
      <h4>{{ getTooltipData.name || "loading" }}</h4>
      <span>{{ getTooltipData.pin_code || "loading" }}</span>
    </div>
    <div class="tooltip-body">
      <div class="row">
        <h4>No of users</h4>
        <span>{{ getTooltipData.noOfUsers }}</span>
      </div>
      <div class="row">
        <h4>No of pro users</h4>
        <span>{{ getTooltipData.noOfProUsers }}</span>
      </div>
      <div class="row">
        <h4>Male users</h4>
        <span>{{ getTooltipData.noOfMaleUsers }}</span>
      </div>
      <div class="row">
        <h4>Female users</h4>
        <span>{{ getTooltipData.noOfFemaleUsers }}</span>
      </div>
      <div class="row">
        <h4>Average Age</h4>
        <span>{{ getTooltipData.averageAge }}</span>
      </div>
      <div class="row">
        <h4>Average Matches</h4>
        <span>{{ getTooltipData.averageMatches }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      window: window,
    };
  },
  mounted: function () {
    this.createToolTip();
  },
  methods: {
    createToolTip() {
      const that = this;
      this.window.onmousemove = function (e) {
        var x = e.clientX,
          y = e.clientY;
        that.$refs.tooltip.style.top = y + 20 + "px";
        that.$refs.tooltip.style.left = x + 20 + "px";
      };
    },
  },
  computed: {
    tooltipShown() {
      return this.$store.state.tooltipShown;
    },
    getHoveredAreaData() {
      return this.$store.state.hoveredAreaData;
    },
    getTooltipData() {
      return {
        name: this.getHoveredAreaData?.areaData?.name || "loading",
        pin_code: this.getHoveredAreaData?.areaData?.pin_code || "loading",
        noOfUsers: this.getHoveredAreaData?.userData?.noOfUsers || "loading",
        noOfProUsers:
          this.getHoveredAreaData?.userData?.noOfProUsers || "loading",
        noOfMaleUsers:
          this.getHoveredAreaData?.userData?.noOfMaleUsers || "loading",
        noOfFemaleUsers:
          this.getHoveredAreaData?.userData?.noOfFemaleUsers || "loading",
        averageAge: this.getHoveredAreaData?.userData?.averageAge || "loading",
        averageMatches:
          this.getHoveredAreaData?.userData?.averageMatches || "loading",
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.tooltip {
  @apply fixed w-60 bg-secondary top-0 left-0 shadow-md rounded-md hidden text-primary p-2;
}
.shown {
  display: block !important;
}
.tooltip-header {
  @apply flex justify-between flex-col text-base font-bold mb-4;
}
.tooltip-body {
  @apply text-xs;
}
.row {
  @apply flex flex-row items-center justify-between p-1 bg-dark;
}
.row:nth-child(odd) {
  @apply bg-darker;
}
</style>

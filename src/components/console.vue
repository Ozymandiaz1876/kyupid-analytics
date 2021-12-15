<template>
  <div class="console">
    <i @click="toggleConsole" class="icon">
      <SettingsIcon />
    </i>
    <div :class="{ active: isConsoleOpen }" class="side-panel panel">
      <div>
        <div class="heading">
          <span>Console</span>
          <i class="close-icon">
            <CloseIcon @click="toggleConsole" />
          </i>
        </div>
        <div class="visualize-option">
          <span class="mb-5">Visualize Via</span>
          <select
            v-model="getSelectedVisualizeOption"
            class="bg-darker w-full"
            name="visualize"
            id="options"
          >
            <option value="users">Users</option>
            <option value="gender">Gender</option>
            <option value="age">Age</option>
            <option value="proUsers">Pro users</option>
            <option value="matches">Matches</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsIcon from "vue-material-design-icons/Cog.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  components: {
    SettingsIcon,
    CloseIcon,
  },
  methods: {
    toggleConsole() {
      this.$store.dispatch("setConsoleOpen", !this.$store.state.consoleOpen);
    },
    visualizeOptionChanged: function (e) {
      console.log(e);
    },
  },
  computed: {
    isConsoleOpen: {
      get: function () {
        return this.$store.state.consoleOpen;
      },
    },
    getSelectedVisualizeOption: {
      get: function () {
        return this.$store.state.visualizeOption;
      },
      set: function (value) {
        this.$store.dispatch("setVisualizeOption", value);
      },
    },
  },
};
</script>

<style lang="postcss">
.icon {
  @apply absolute top-3 left-3;
}
.active {
  @apply transform ease-in-out duration-300 translate-x-0 !important;
}
.side-panel {
  @apply absolute top-3 left-3 z-10 h-94 w-1/4 bg-dark text-primary rounded-lg shadow-md p-5;
}
.panel {
  transform: translateX(-110%);
}
.material-design-icon__svg {
  color: white;
}
.icon :hover {
  color: #ecb365;
}
.close-icon {
  @apply float-right;
}
.heading {
  @apply flex items-center justify-between w-full font-bold text-xl mb-10;
}
.close-icon :hover {
  color: #ecb365;
}
.visualize-option {
  @apply flex flex-col items-center;
}
</style>

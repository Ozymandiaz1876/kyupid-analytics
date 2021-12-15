<template>
  <div class="map-holder">
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import userColorGenrator from "../helper/UserColorGenerator";
// import { getMinValue, getMaxValue } from "../helper/CaculateMinMaxValues";

export default {
  name: "Map",
  data() {
    return {
      min: 0,
      max: 500,
      minColor: "#5e4828",
      maxColor: "#eebb74",
    };
  },
  mounted: function () {
    this.createMap();
  },
  methods: {
    createMap() {
      return new Promise((resolve, reject) => {
        try {
          mapboxgl.accessToken = this.getMapBoxAccessToken;
          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/dark-v10",
            // bengaluru lat long
            center: [77.5946, 12.9716],
            zoom: this.getZoom,
          });
          this.$store.dispatch("setMapObject", map);
          resolve();
        } catch (err) {
          console.log("map error", err);
          reject();
        }
      });
    },
    addMapAreas: function () {
      this.getMapAreas.forEach((area) => {
        // add the source
        this.getMapObject.addSource(`${area.properties.area_id}`, {
          type: "geojson",
          data: {
            type: area.type,
            geometry: area.geometry,
          },
        });
        // use the source to create a polygon
        this.getMapObject.addLayer({
          id: `${area.properties.area_id}`,
          type: "fill",
          source: `${area.properties.area_id}`,
          layout: {},
          paint: {
            "fill-color": userColorGenrator(
              this.min,
              this.max,
              this.filterUserData(area.properties.area_id).noOfUsers,
              this.minColor,
              this.maxColor
            ),
            "fill-opacity": 0.5,
          },
        });

        this.mapUserDataToArea(area.properties.area_id);

        this.getMapObject.on(
          "mouseenter",
          `${area.properties.area_id}`,
          (e) => {
            if (!this.isTooltipShown)
              this.$store.dispatch("setTooltipShown", true);

            const userTooltipData =
              this.getAreaUserMappedData[area.properties.area_id];

            this.$store.dispatch("setHoveredAreaData", {
              areaData: area.properties,
              event: e,
              userData: userTooltipData,
            });
          }
        );
        this.getMapObject.on(
          "mouseleave",
          `${area.properties.area_id}`,
          (e) => {
            if (this.isTooltipShown) {
              this.$store.dispatch("setTooltipShown", false);
            }
            this.$store.dispatch("setHoveredAreaData", {
              areaData: null,
              event: e,
            });
          }
        );
      });
    },
    filterUserData(areaId) {
      const userData = {
        noOfUsers: 0,
        noOfProUsers: 0,
        noOfFemaleUsers: 0,
        averageAge: 0,
        averageMatches: 0,
        noOfMaleUsers: 0,
      };
      const agesArray = [];
      const matchesArray = [];
      this.getUserData.forEach((user) => {
        if (user.area_id === areaId) {
          userData.noOfUsers = userData.noOfUsers + 1;
          if (user.is_pro_user) {
            userData.noOfProUsers = userData.noOfProUsers + 1;
          }
          if (user.gender === "M")
            userData.noOfMaleUsers = userData.noOfMaleUsers + 1;
          if (user.gender === "F")
            userData.noOfFemaleUsers = userData.noOfFemaleUsers + 1;
          agesArray.push(user.age);
          matchesArray.push(user.total_matches);
        }
      });

      const avgAge = agesArray.reduce((a, b) => a + b, 0) / agesArray.length;
      const avgMatches =
        matchesArray.reduce((a, b) => a + b, 0) / matchesArray.length;

      userData.averageAge = Math.floor(avgAge);
      userData.averageMatches = Math.floor(avgMatches);
      return userData;
    },
    mapUserDataToArea: function (areaId) {
      const userMappedData = this.filterUserData(areaId);

      this.$store.dispatch("setAreaUserMappedData", {
        ...this.getAreaUserMappedData,
        [areaId]: userMappedData,
      });
    },
  },
  computed: {
    getMapBoxAccessToken() {
      return this.$store.state.mapBoxAccessToken;
    },
    getZoom() {
      return this.$store.state.mapLoadZoom;
    },
    getMapObject() {
      return this.$store.state.mapObject;
    },
    getMapAreas() {
      return this.$store.state.mapAreasData;
    },
    isTooltipShown() {
      return this.$store.state.tooltipShown;
    },
    getUserData() {
      return this.$store.state.usersData;
    },
    getAreaUserMappedData() {
      return this.$store.state.areaUserMappedData;
    },
  },
  watch: {
    getUserData: {
      handler: function (userData) {
        // return if no areas are present to create polygons
        if (userData.length < 1) return;

        this.addMapAreas();
      },
      deep: true,
    },
  },
};
</script>

<style lang="postcss">
.map-holder {
  @apply h-screen w-screen;
}
.map {
  @apply w-full h-full;
}
</style>

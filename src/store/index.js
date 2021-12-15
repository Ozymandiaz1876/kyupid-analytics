import Vue from "vue";
import Vuex from "vuex";
import { getAreas } from "../apis/getAreas.js";
import { getUsers } from "../apis/getUsers.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapBoxAccessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
    mapObject: {},
    mapLoadZoom: 11,
    mapAreasData: [],
    usersData: [],
    tooltipShown: false,
    hoveredAreaData: {},
    consoleOpen: false,
    visualizeOption: "users",
    areaUserMappedData: [],
  },
  mutations: {
    SET_MAP_AREAS_DATA(state, mapAreasData) {
      state.mapAreasData = mapAreasData;
    },
    SET_MAP_OBJECT(state, mapObject) {
      state.mapObject = mapObject;
    },
    SET_USERS_DATA(state, usersData) {
      state.usersData = usersData;
    },
    SET_TOOLTIP_SHOWN(state, tooltipShown) {
      state.tooltipShown = tooltipShown;
    },
    SET_HOVERED_AREA_DATA(state, hoveredAreaData) {
      state.hoveredAreaData = hoveredAreaData;
    },
    SET_CONSOLE_OPEN(state, consoleOpen) {
      state.consoleOpen = consoleOpen;
    },
    SET_VISUALIZE_OPTION(state, visualizeOption) {
      state.visualizeOption = visualizeOption;
    },
    SET_AREA_USER_MAPPED_DATA(state, areaUserMappedData) {
      state.areaUserMappedData = areaUserMappedData;
    },
  },
  actions: {
    async setMapAreasData({ commit }) {
      const areasData = await getAreas();

      if (areasData.type === "data") {
        commit("SET_MAP_AREAS_DATA", areasData.data.features);
        return;
      }
      console.log("err fetching data", areasData);
    },
    setMapObject({ commit }, mapObject) {
      commit("SET_MAP_OBJECT", mapObject);
    },
    async setUsersData({ commit }) {
      const userData = await getUsers();

      if (userData.type === "data") {
        commit("SET_USERS_DATA", userData.data.users);
        return;
      }
      console.log("err fetching data", userData);
    },
    setTooltipShown({ commit }, tooltipShown) {
      commit("SET_TOOLTIP_SHOWN", tooltipShown);
    },
    setHoveredAreaData({ commit }, hoveredAreaData) {
      commit("SET_HOVERED_AREA_DATA", hoveredAreaData);
    },
    setConsoleOpen({ commit }, consoleOpen) {
      commit("SET_CONSOLE_OPEN", consoleOpen);
    },
    setVisualizeOption({ commit }, visualizeOption) {
      commit("SET_VISUALIZE_OPTION", visualizeOption);
    },
    setAreaUserMappedData({ commit }, areaUserMappedData) {
      commit("SET_AREA_USER_MAPPED_DATA", areaUserMappedData);
    },
  },
});

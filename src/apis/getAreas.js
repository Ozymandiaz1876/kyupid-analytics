const axios = require("axios").default;
import axiosRetry from "axios-retry";

// retry a network error or 5xx error
axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => {
    console.log(`retrying in ${retryCount} sec`);
    return retryCount * 1000;
  },
});

/**
 * make a get request to fetch the areas, to visualize
 * @returns {*} an object with type of the data i.e data or error, and data for data itself
 */
export async function getAreas() {
  try {
    const response = await axios({
      method: "get",
      baseURL: process.env.VUE_APP_API_URI,
      url: `/areas`,
    });

    return { type: "data", data: response.data };
  } catch (error) {
    if (error.message === "Network Error") {
      return { type: "NetworkError" };
    }
    return { type: "error", data: error };
  }
}

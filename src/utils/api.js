import axios from "axios";
import Cookies from "js-cookie";

const host = import.meta.env.VITE_BASE_URL || "";
console.log(host);
// const baseUrl = `${host}/api/`;
const baseUrl = "https://dummyjson.com";

// axios interceptor refresh token
axios.interceptors.response.use(
  async (response) => {
    const authToken = await Cookies.get("auth.token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axios.post(`${host}/api/auth/request-jwt`, {
        token: Cookies.get("auth.refreshToken"),
      });
      if (res.status === 200) {
        Cookies.set("auth.token", res.data.jwt);
        Cookies.set("auth.refreshToken", res.data.refreshToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

class Api {
  host = baseUrl;

  async doGet(url) {
    return await axios
      .get(baseUrl + url)
      .then((res) => res.data)
      .catch((err) => err);
  }

  async doPost(url, params) {
    return await axios
      .post(baseUrl + url, params)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doPut(url, params) {
    return await axios
      .put(baseUrl + url, params)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doPatch(url, params) {
    return await axios
      .patch(baseUrl + url, params)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doDelete(url) {
    return await axios
      .delete(baseUrl + url)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doGetBlob(url, params) {
    return await axios
      .post(baseUrl + url, params, { responseType: "blob" })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doPostMultipart(url, params) {
    return await axios
      .post(baseUrl + url, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default new Api();

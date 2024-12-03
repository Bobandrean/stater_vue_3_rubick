import Api from "@/utils/api.js";

class fetchServices {
  async get(url) {
    const res = await Api.doGet(`/users`);
    console.log("SERVICES FETCH", res);
    return res;
  }
}

export default new fetchServices();

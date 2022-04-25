import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://35.154.149.207:3010/",
});

export default axios;

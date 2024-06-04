// axiosConfig.js

import axios from "axios";
import Cookies from "js-cookie";

const Auth = Cookies.get("accesstoen");

const instance = axios.create({
  baseURL: `${process.env.backend}/api`,
  headers: {
    Authorization: `Beare ${Auth}`,
  },
});

export default instance;

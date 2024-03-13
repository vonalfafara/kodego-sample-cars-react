import axios from "axios";

function http() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API,
  });

  return instance;
}

export default http;

import axios from "axios";

const client = axios.create({
  baseURL: "https://the-isang-api.fly.dev",
});

export default client;

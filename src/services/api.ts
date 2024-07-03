import axios from "axios";

const ApiClient = () => {
  console.log(process.env.API_URL);
  const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export default ApiClient();

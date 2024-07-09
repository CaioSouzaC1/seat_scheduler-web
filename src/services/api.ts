import axios from "axios";
import { getSession } from "next-auth/react";

const ApiClient = () => {
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

export const AuthInterceptor = async () => {
  const session = await getSession();
  return {
    Authorization: `Bearer ${session?.token}`,
  };
};
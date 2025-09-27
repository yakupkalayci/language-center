import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.API_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = (method, url, params, contentType) => {
  try {
    baseApi({
      method,
      url,
      data: method === "GET" ? undefined : params,
      params: method === "GET" ? params : undefined,
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
        Culture: "Tr",
        Authorization: `Basic ${
          localStorage?.getItem("auth-store")?.state?.token || ""
        }`,
      },
    });
  } catch (err) {}
};

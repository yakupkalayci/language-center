import axios from "axios";

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = async (method, url, params, contentType) => {
  try {
    const response = await baseApi({
      method,
      url,
      data: method === "GET" ? undefined : params,
      params: method === "GET" ? params : undefined,
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
        Culture: "Tr",
        Authorization: `Basic ${localStorage?.getItem("auth-store")?.state?.token || ""
          }`,
      },
    });
    return response;
  } catch (err) {
    console.log("Axios error:", err);
    throw err;
  }
};

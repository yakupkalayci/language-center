import axios from "axios";

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

const getToken = () => {
  try {
    const raw = localStorage.getItem("auth-store");
    if (!raw) return "";
    const parsed = JSON.parse(raw);
    return parsed?.state?.token || "";
  } catch (e) {
    return "";
  }
};

// Request interceptor to attach token
baseApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers = config.headers || {};
  config.headers.Culture = "Tr";
  return config;
});

export const api = async (method, url, params, contentType) => {
  try {
    const response = await baseApi({
      method,
      url,
      data: method === "GET" ? undefined : params,
      params: method === "GET" ? params : undefined,
      headers: contentType ? { "Content-Type": contentType } : undefined,
    });
    return response;
  } catch (err) {
    console.log("Axios error:", err);
    throw err;
  }
};

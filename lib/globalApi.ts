import axios, { AxiosResponse } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
console.log("API BASE ", API_BASE);

type ResponseData = any;

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${""}`,
  },
});

const responseBody = (response: AxiosResponse<ResponseData>) => response.data;

const api = {
  get: <T>(url: string) => axiosClient.get<T>(url).then(responseBody),
  post: <T>(url: string, body: any) => axiosClient.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: any) => axiosClient.patch<T>(url, body).then(responseBody),
  put: <T>(url: string, body: any) => axiosClient.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axiosClient.delete<T>(url).then(responseBody),
};

// Request
export const getIntegrationType = () => api.get("/intregrationType");

// Request interceptors
axiosClient.interceptors.request.use(
  function (config) {
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptors
axiosClient.interceptors.response.use(
  (response) => {
    console.log("Handle instance.interceptors.response, ", response);
    return response;
  },
  (error) => {
    console.log("Handle instance.interceptors.response ERROR", error);
    const status = error.response ? error.response.status : null;

    return Promise.reject(error);
  }
);

import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { GenericObject } from "../type/generic";

console.debug("process.env.API_BASE_URL", process.env.API_BASE_URL);
const client = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3001/",
  timeout: 10000, //The request will wait 10 seconds before timing out, we will make it as configuration in env/file
  headers: {
    accept: "application/json",
    // Authorization: 'Bearer [your token]', //when you want to initiate at the beginning and it will be unchangeable.
  },
});
console.debug("client request timeout:", client.defaults.timeout);

/**
 *
 * @param token: string; authenticated Bearer token needs to be set explicitly before calling API
 */
export const setToken = function (token: string | undefined | unknown) {
  // client.defaults.headers['Authorization'] = `Bearer ${token}`;
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export async function callAPINoAuth(
  method: Method,
  route: string,
  params: GenericObject = {},
  body?: GenericObject
): Promise<any> {
  const onSuccess = function (response: AxiosResponse) {
    console.debug("Request Successful:", response);
    return response.data;
  };

  const onError = function (error: AxiosError) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client({
    method,
    url: route,
    params: params,
    data: body,
    // mode: "cors",
  })
    .then(onSuccess)
    .catch(onError);
}

type AxiosAuthHeaders = {
  Authorization: string;
};

async function setupBearer(): Promise<AxiosAuthHeaders> {
  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
}

/**
 *
 * @param method: string; ['GET', 'POST', 'PUT', 'DELETE' and all remaining methods]
 * @param route: string; suffix path of uri endpoint
 * @param params: object; params for GET, PUT, DELETE method or just leave it as {} when using POST
 * @param body: object; body data for POST method
 * @param isBlobType: boolean; specify the response with Blob type
 * @returns  // { [key: string]: any }
 *
 */
export async function callAPI(
  method: Method,
  route: string,
  params: GenericObject = {},
  body?: GenericObject,
  isBlobType?: boolean
): Promise<any> {
  const onSuccess = function (response: AxiosResponse) {
    console.debug("Request Successful:", response);
    return response.data;
  };

  const onError = function (error: AxiosError) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  const headers = await setupBearer();

  return client({
    method,
    headers: headers,
    url: route,
    params: params,
    data: body,
    responseType: isBlobType ? "blob" : "json",
  })
    .then(onSuccess)
    .catch(onError);
}

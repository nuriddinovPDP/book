import * as  axios from "axios";
import CryptoJS from "crypto-js";

export function setAuthData(userKey: string, userSecret: string): void {
  localStorage.setItem("key", userKey);
  localStorage.setItem("secret", userSecret);
}

function generateSign(
  method: string,
  path: string,
  body: any,
  secret: string
): string {
  let bodyStr = "";
  if (body && (method === "POST" || method === "PATCH")) {
    bodyStr = JSON.stringify(body);
  }
  const signStr = method + path + bodyStr + secret;
  return CryptoJS.MD5(signStr).toString();
}

export const API = axios.default.create({
  baseURL: "https://lavina.onrender.com",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config: any) => {
  const method = (config.method || "get").toUpperCase();
  let path = "/";

  try {
    const urlObj = new URL(config.url || "", API.defaults.baseURL);
    path = urlObj.pathname;
  } catch (e) {
    console.error("Invalid URL in Axios config:", config.url);
  }

  const key = localStorage.getItem("key") || "";
  const secret = localStorage.getItem("secret") || "";

  if (!secret) {
    console.warn("Secret key is empty, signature may be invalid.");
  }

  const sign = generateSign(method, path, config.data, secret);

  if (!config.headers) config.headers = {};
  config.headers["Key"] = key;
  config.headers["Sign"] = sign;

  return config;
});

export const API_URL = "https://lavina.onrender.com/";

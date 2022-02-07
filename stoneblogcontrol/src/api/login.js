import serve from "@/utils/require.js";
import { getBaseUrl } from "./index";
export function login(data) {
  return serve({
    url: process.env[getBaseUrl("/userlogin")] + "/userlogin",
    method: "post",
    data,
  });
}
export function getUserInfo(data) {
  return serve({
    url: process.env[getBaseUrl("/getUserInfo")] + "/getUserInfo",
    method: "post",
    data,
  });
}
export function defaultHttp(url, data, type = "post") {
  return serve({
    url: process.env[getBaseUrl(url)] + url,
    method: type,
    data,
  });
}

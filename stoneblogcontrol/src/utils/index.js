export function getToken() {
  return localStorage.getItem("stone");
}
export function setToken(data) {
  return localStorage.setItem("stone", data);
}
export function getMenuList() {
  return localStorage.getItem("stone-menu-list");
}
export function setMenuList(data) {
  return localStorage.setItem("stone-menu-list", data);
}
export function formatRouter(val) {
  console.log(val);
}
export function removeToken() {
  return localStorage.removeItem("stone");
}

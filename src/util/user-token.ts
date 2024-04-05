/**
 * @description 存储/获取user token
 */
const KEY = "USER_TOKEN";
export function setToken(token: string) {
	localStorage.setItem(KEY, token);
}
export function getToken() {
	return localStorage.getItem(KEY) || "";
}
export function removeToken() {
	localStorage.removeItem(KEY);
}

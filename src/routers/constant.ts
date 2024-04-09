//------定义路由常量---------
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";
export const MANAGE_STAR_PATHNAME = "/manage/star";
export const MANAGE_TRASH_PATHNAME = "/manage/trash";
//判断是否是登陆页还是注册页
export function isLoginOrRegister(pathname: string) {
	if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
	return false;
}
//判断是否需要用户信息
export function isNoNeedUserInfo(pathname: string) {
	if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
		return true;
	return false;
}

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import { isLoginOrRegister, isNoNeedUserInfo } from "../routers/constant";
import { MANAGE_INDEX_PATHNAME, LOGIN_PATHNAME } from "../routers/constant";
function useNavPage(waittingState: boolean) {
	const { username } = useGetUserInfo();
	const { pathname } = useLocation();
	const nav = useNavigate();
	useEffect(() => {
		if (waittingState) return;
		if (username) {
			if (isLoginOrRegister(pathname)) {
				nav(MANAGE_INDEX_PATHNAME);
			}
			return;
		} else {
			if (isNoNeedUserInfo(pathname)) {
				nav(LOGIN_PATHNAME);
			}
		}
	}, [username, pathname]);
}
export default useNavPage;

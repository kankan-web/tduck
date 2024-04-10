import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../servers/user";
import { loginReducer } from "../stores/userReducer";
function useLoadUserData() {
	const dispatch = useDispatch();
	const [waitingState, setWaitingState] = useState(true);

	//ajax加载用户信息
	const { run } = useRequest(getUserInfoService, {
		manual: true,
		onSuccess: res => {
			const { username, nickname } = res;
			dispatch(loginReducer({ username, nickname })); //存储到redux store中
		},
		onFinally: () => {
			setWaitingState(false);
		}
	});

	//判断当前redux store是否已经存在用信息
	const { username } = useGetUserInfo(); //redux store
	useEffect(() => {
		if (username) {
			setWaitingState(false); //如果redux store中存在用户信息，则不需要再请求一次
			return;
		}
		run(); //如果redux store中不存在用户信息，则请求一次
	}, [username]);
	return { waitingState };
}
export default useLoadUserData;

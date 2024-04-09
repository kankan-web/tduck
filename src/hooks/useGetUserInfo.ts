import { useSelector } from "react-redux";
import { UserStateType, StateType } from "../stores/type";

function useGetUserInfo() {
	const { username, nickname } = useSelector<StateType>(
		state => state.user
	) as UserStateType;
	return { username, nickname };
}
export default useGetUserInfo;

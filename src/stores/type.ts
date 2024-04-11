import { ComponentsStateType } from "./componentsReducer";
export type StateType = {
	user: UserStateType;
	components: ComponentsStateType;
};
// 用户信息type
export type UserStateType = {
	username: string;
	nickname: string;
};

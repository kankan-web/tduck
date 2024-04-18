import { ComponentsStateType } from "./componentsReducer";
import { PageInfoType } from "./pageInfoReducer";
export type StateType = {
	user: UserStateType;
	components: ComponentsStateType;
	pageInfo: PageInfoType;
};
// 用户信息type
export type UserStateType = {
	username: string;
	nickname: string;
};

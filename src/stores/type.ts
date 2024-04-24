import { ComponentsStateType } from "./componentsReducer";
import { PageInfoType } from "./pageInfoReducer";
import { StateWithHistory } from "redux-undo";
export type StateType = {
	user: UserStateType;
	components: StateWithHistory<ComponentsStateType>; //增加了undo
	pageInfo: PageInfoType;
};
// 用户信息type
export type UserStateType = {
	username: string;
	nickname: string;
};

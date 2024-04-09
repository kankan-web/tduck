import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { StateType } from "./type";
export default configureStore<StateType>({
	reducer: {
		user: userReducer
		//分模块，扩展：问卷信息
	}
});

import { configureStore } from "@reduxjs/toolkit";
import { StateType } from "./type";
import userReducer from "./userReducer";
import componentsReducer from "./componentsReducer";

export default configureStore<StateType>({
	reducer: {
		user: userReducer,
		components: componentsReducer
		//组件列表 （复杂，undo/redo）
		//问卷信息 title desc...
	}
});

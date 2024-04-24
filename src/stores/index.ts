import { configureStore } from "@reduxjs/toolkit";
import { StateType } from "./type";
import userReducer from "./userReducer";
import componentsReducer from "./componentsReducer";
import pageInfoReducer from "./pageInfoReducer";
import undoable, { excludeAction } from "redux-undo";

export default configureStore<StateType>({
	reducer: {
		user: userReducer,
		components: undoable(componentsReducer, {
			limit: 20, //限制undo20步
			filter: excludeAction([
				"components/resetComponent",
				"components/changeSelectedId",
				"components/selectPrevComponent",
				"components/selectNextComponent"
			])
		}),
		pageInfo: pageInfoReducer
	}
});

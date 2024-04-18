import { configureStore } from "@reduxjs/toolkit";
import { StateType } from "./type";
import userReducer from "./userReducer";
import componentsReducer from "./componentsReducer";
import pageInfoReducer from "./pageInfoReducer";

export default configureStore<StateType>({
	reducer: {
		user: userReducer,
		components: componentsReducer,
		pageInfo: pageInfoReducer
	}
});

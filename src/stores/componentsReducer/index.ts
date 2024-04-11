import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponent";

export type ComponentsInfoType = {
	fe_id: string; //TODO
	type: string;
	title: string;
	props: ComponentPropsType;
};
export type ComponentsStateType = {
	componentList: Array<ComponentsInfoType>;
};
const INIT_STATE: ComponentsStateType = {
	componentList: []
};

export const componentsSlice = createSlice({
	name: "components",
	initialState: INIT_STATE,
	reducers: {
		//重置所有组件
		resetComponent: (
			state: ComponentsStateType,
			action: PayloadAction<ComponentsStateType>
		) => {
			return action.payload;
		}
	}
});
export const { resetComponent } = componentsSlice.actions;
export default componentsSlice.reducer;

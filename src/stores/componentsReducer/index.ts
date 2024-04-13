import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ComponentPropsType } from "../../components/QuestionComponent";

export type ComponentsInfoType = {
	fe_id: string; //TODO
	type: string;
	title: string;
	props: ComponentPropsType;
};
export type ComponentsStateType = {
	selectedId: string;
	componentList: Array<ComponentsInfoType>;
};
const INIT_STATE: ComponentsStateType = {
	selectedId: "",
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
		},
		//修改selectedId
		changeSelectedId: produce(
			(draft: ComponentsStateType, action: PayloadAction<string>) => {
				draft.selectedId = action.payload;
			}
		)
	}
});
export const { resetComponent, changeSelectedId } = componentsSlice.actions;
export default componentsSlice.reducer;

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
		),
		//添加组件
		addComponent: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<ComponentsInfoType>
			) => {
				const newComponent = action.payload;
				const { selectedId, componentList } = draft;
				const index = componentList.findIndex(c => c.fe_id === selectedId);
				if (index < 0) {
					//未选中任何组件
					draft.componentList.push(newComponent);
				} else {
					//选中了组件，插入到index后面
					draft.componentList.splice(index + 1, 0, newComponent);
				}
				draft.selectedId = newComponent.fe_id;
			}
		)
	}
});
export const { resetComponent, changeSelectedId, addComponent } =
	componentsSlice.actions;
export default componentsSlice.reducer;

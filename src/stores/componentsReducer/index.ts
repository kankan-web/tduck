import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { ComponentPropsType } from "../../components/QuestionComponent";
import { getNextSelectedId, insertNewComponent } from "./util";
import cloneDeep from "lodash.clonedeep";

export type ComponentsInfoType = {
	//MARK:前端生成的id，服务端Mongodb不认这种格式，所以自定义一个fe_id
	fe_id: string; //TODO
	type: string;
	title: string;
	isHidden?: boolean;
	isLocked?: boolean;
	props: ComponentPropsType;
};
export type ComponentsStateType = {
	selectedId: string;
	componentList: Array<ComponentsInfoType>;
	copiedComponent: ComponentsInfoType | null;
};
const INIT_STATE: ComponentsStateType = {
	selectedId: "",
	componentList: [],
	copiedComponent: null
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
				insertNewComponent(draft, newComponent);
			}
		),

		//修改组件属性
		changeComponentProps: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
			) => {
				const { fe_id, newProps } = action.payload;
				//找到当前要修改属性的这个组件
				const curComp = draft.componentList.find(c => c.fe_id === fe_id);
				if (curComp) {
					curComp.props = {
						...curComp.props,
						...newProps
					};
				}
			}
		),
		//删除组件
		removeSelectedComponent: produce((draft: ComponentsStateType) => {
			const { componentList = [], selectedId: removedId } = draft;
			//重新计算selected
			const newSelectedId = getNextSelectedId(removedId, componentList);
			draft.selectedId = newSelectedId;

			const index = componentList.findIndex(c => c.fe_id === removedId);
			componentList.splice(index, 1);
		}),
		//显示与隐藏属性
		changeComponentHidden: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; isHidden: boolean }>
			) => {
				const { componentList = [] } = draft;
				const { fe_id, isHidden } = action.payload;

				//重新计算selected
				let newSelectedId = "";
				if (isHidden) {
					//要隐藏
					newSelectedId = getNextSelectedId(fe_id, componentList);
				} else {
					//要显示
					newSelectedId = fe_id;
				}
				draft.selectedId = newSelectedId;

				const curComp = componentList.find(c => c.fe_id === fe_id);
				if (curComp) {
					curComp.isHidden = isHidden;
				}
			}
		),
		//锁定/解锁 组件
		toggleComponentLocked: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string }>
			) => {
				const { fe_id } = action.payload;

				const curComp = draft.componentList.find(c => c.fe_id === fe_id);
				if (curComp) {
					curComp.isLocked = !curComp.isLocked;
				}
			}
		),
		//复制组件
		copySelectComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList = [] } = draft;
			const selectedComponent = componentList.find(c => c.fe_id === selectedId);
			if (selectedComponent == null) return;
			draft.copiedComponent = cloneDeep(selectedComponent); //深拷贝
		}),
		//粘贴组件
		pasteCopiedComponent: produce((draft: ComponentsStateType) => {
			const { copiedComponent } = draft;
			if (copiedComponent == null) return;
			//要把fe_id给修改了
			copiedComponent.fe_id = nanoid();
			//插入copiedComponent
			insertNewComponent(draft, copiedComponent);
		}),
		//选中上一个
		selectPrevComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft;
			const selectedIndex = componentList.findIndex(
				c => c.fe_id === selectedId
			);

			// if(selectedIndex<0) return //未选中组件
			if (selectedIndex <= 0) return; //已经选择了第一个无法再向上选

			draft.selectedId = componentList[selectedIndex - 1].fe_id;
		}),
		//选中下一个
		selectNextComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft;
			const selectedIndex = componentList.findIndex(
				c => c.fe_id === selectedId
			);
			if (selectedIndex < 0) return; //未选中组件
			if (selectedIndex + 1 === componentList.length) return; //选中了最后一个
			draft.selectedId = componentList[selectedIndex + 1].fe_id;
		})
	}
});
export const {
	resetComponent,
	changeSelectedId,
	addComponent,
	changeComponentProps,
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLocked,
	copySelectComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent
} = componentsSlice.actions;
export default componentsSlice.reducer;

import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import {
	removeSelectedComponent,
	copySelectComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent
} from "../stores/componentsReducer";
function isActiveElementValid() {
	const activeElement = document.activeElement;
	if (activeElement === document.body) return true; //光标没有focus到input上
	if (activeElement?.matches('div[role="button"]')) return true; //增加了dnd-kit之后
	return false;
}
function useBindCanvasKeyPress() {
	const dispatch = useDispatch();
	//删除组件
	useKeyPress(["backspace", "delete"], () => {
		if (!isActiveElementValid()) return;
		dispatch(removeSelectedComponent());
	});
	//复制组件
	useKeyPress(["ctrl.c", "meta.c"], () => {
		if (!isActiveElementValid()) return;
		dispatch(copySelectComponent());
	});
	//粘贴组件
	useKeyPress(["ctrl.v", "meta.v"], () => {
		if (!isActiveElementValid()) return;
		dispatch(pasteCopiedComponent());
	});
	//选中下一个组件
	useKeyPress("uparrow", () => {
		if (!isActiveElementValid()) return;
		dispatch(selectPrevComponent());
	});
	//选中上一个组件
	useKeyPress("downarrow", () => {
		if (!isActiveElementValid()) return;
		dispatch(selectNextComponent());
	});
	//TODO:撤销，重做
	//撤销
	useKeyPress(
		["ctrl.z", "meta.z"],
		() => {
			if (!isActiveElementValid()) return;
			dispatch(ActionCreators.undo());
		},
		{
			exactMatch: true //严格匹配
		}
	);
	//重做
	useKeyPress(
		["ctrl.shift.z", "meta.shift.z"],
		() => {
			if (!isActiveElementValid()) return;
			dispatch(ActionCreators.redo());
		},
		{
			exactMatch: true //严格匹配
		}
	);
}
export default useBindCanvasKeyPress;

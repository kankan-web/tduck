import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
	removeSelectedComponent,
	copySelectComponent,
	pasteCopiedComponent
} from "../stores/componentsReducer";
function isActiveElementValid() {
	const activeElement = document.activeElement;
	if (activeElement === document.body) return true; //光标没有focus到input上
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
}
export default useBindCanvasKeyPress;

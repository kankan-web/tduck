import { ComponentsInfoType } from "./index";
export function getNextSelectedId(
	fe_id: string,
	componentList: ComponentsInfoType[]
) {
	const visivleComponentList = componentList.filter(c => !c.isHidden);
	const index = visivleComponentList.findIndex(c => c.fe_id === fe_id);
	if (index < 0) return "";
	//重新计算selectedId
	let newSelectedId = "";
	const length = visivleComponentList.length;
	if (length <= 1) {
		//组件长度就一个，被删除后就没有组件了
		newSelectedId = "";
	} else {
		//组件长度>1
		if (index + 1 === length) {
			//要删除最后一个，就要选中上一个
			newSelectedId = visivleComponentList[index - 1].fe_id;
		} else {
			//要删除的不是最后一个，删除之后，就选上一个
			newSelectedId = visivleComponentList[index + 1].fe_id;
		}
	}
	return newSelectedId;
}

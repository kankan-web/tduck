import { useSelector } from "react-redux";
import { StateType } from "../stores/type";
import { ComponentsStateType } from "../stores/componentsReducer";

function useGetComponentInfo() {
	const components = useSelector<StateType>(
		state => state.components.present
	) as ComponentsStateType;

	const { componentList, selectedId, copiedComponent } = components;

	const selectedComponent = componentList.find(c => c.fe_id === selectedId);

	return { componentList, selectedId, selectedComponent, copiedComponent };
}
export default useGetComponentInfo;

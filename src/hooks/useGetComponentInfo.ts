import { useSelector } from "react-redux";
import { StateType } from "../stores/type";
import { ComponentsStateType } from "../stores/componentsReducer";

function useGetComponentInfo() {
	const components = useSelector<StateType>(
		state => state.components
	) as ComponentsStateType;

	const { componentList } = components;
	return { componentList };
}
export default useGetComponentInfo;

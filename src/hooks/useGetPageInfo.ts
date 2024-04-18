import { useSelector } from "react-redux";
import { StateType } from "@/stores/type";
import { PageInfoType } from "@/stores/pageInfoReducer";
function useGetPageInfo() {
	const pageInfo = useSelector<StateType>(
		state => state.pageInfo
	) as PageInfoType;
	return pageInfo;
}
export default useGetPageInfo;

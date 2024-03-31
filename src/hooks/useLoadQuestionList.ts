import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../servers/question";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
import { useRequest } from "ahooks";
type OptionType = {
	isStar: boolean;
	isDeleted: boolean;
};
function useLoadQuestionList(opt: Partial<OptionType> = {}) {
	const { isStar = false, isDeleted = false } = opt;
	const [searchParams] = useSearchParams();
	const { data, loading, error } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
			const data = await getQuestionListService({ keyword, isDeleted, isStar });
			return data;
		},
		{
			refreshDeps: [searchParams] //刷新的依赖项
		}
	);
	return { data, loading, error };
}
export default useLoadQuestionList;

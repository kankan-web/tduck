import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../servers/question";
import {
	LIST_SEARCH_PARAM_KEY,
	LIST_PAGE_PARAM_KEY,
	LIST_PAGE_SIZE_PARAM_KEY,
	LIST_PAGE_SIZE
} from "../constant";
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
			const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
			const pageSize =
				parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
				LIST_PAGE_SIZE;

			const data = await getQuestionListService({
				keyword,
				isDeleted,
				isStar,
				page,
				pageSize
			});
			return data;
		},
		{
			refreshDeps: [searchParams] //刷新的依赖项
		}
	);
	return { data, loading, error };
}
export default useLoadQuestionList;

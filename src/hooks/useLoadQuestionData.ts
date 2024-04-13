import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRequest } from "ahooks";
import { getQuestionService } from "../servers/question";
import { resetComponent } from "../stores/componentsReducer/index";
import { useEffect } from "react";

function useLoadQuestionData() {
	const { id = "" } = useParams();
	const dispatch = useDispatch();

	const { data, loading, error, run } = useRequest(
		async (id: string) => {
			if (!id) throw new Error("没有问卷 id");
			const data = await getQuestionService(id);
			return data;
		},
		{
			manual: true
		}
	);

	//根据获取到data设置redux store
	useEffect(() => {
		if (!data) return;
		const { title = "", componentList = [] } = data;
		//获取默认的selectedId
		let selectedId = "";
		if (componentList.length > 0) {
			selectedId = componentList[0].fe_id; //默认选中第一个组件
		}

		dispatch(resetComponent({ componentList, selectedId }));
	}, [data]);

	//判断id变化，执行ajax加载问卷数据
	useEffect(() => {
		run(id);
	}, [id]);

	return { loading, error };
}
export default useLoadQuestionData;

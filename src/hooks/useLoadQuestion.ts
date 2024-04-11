/**
 * @description 废弃，改用useLoadQuestionData
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../servers/question";

import { useRequest } from "ahooks";
function useLoadQuestion() {
	const { id = "" } = useParams();
	// const [loading, setLoading] = useState(true);
	// const [questionData, setQuestionData] = useState({});
	// //#MARK:在useEffect中不能直接使用异步回调函数
	// useEffect(() => {
	// 	async function fn() {
	// 		const data = await getQuestionService(id);
	// 		setQuestionData(data);
	// 		setLoading(false);
	// 	}
	// 	fn();
	// }, []);
	// return { loading, questionData };
	async function load() {
		const data = await getQuestionService(id);
		return data;
	}
	const { loading, data, error } = useRequest(load);
	return { loading, data, error };
}
export default useLoadQuestion;

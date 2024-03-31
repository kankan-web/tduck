import axios, { ResDataType } from "./axios";
type searchOption = {
	keyword: string;
	isStar: boolean;
	isDeleted: boolean;
	page: number;
	pageSize: number;
};
//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
	const url = `/api/question/${id}`;
	const data = (await axios.get(url)) as ResDataType;
	return data;
}
//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
	const url = "/api/question";
	const data = (await axios.post(url)) as ResDataType;
	return data;
}
//获取（查询）问卷列表
// MARK:Partial表示只需要满足searchOption中的部分字段即可
export async function getQuestionListService(
	opt: Partial<searchOption>
): Promise<ResDataType> {
	const url = "/api/question";
	const data = (await axios.get(url, { params: opt })) as ResDataType;
	return data;
}

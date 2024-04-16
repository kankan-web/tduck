import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionInfoDefaultPropsType } from "./type";

export * from "./type";

//段落组件设置
export default {
	title: "输入框",
	type: "questionInfo",
	Component,
	PropComponent,
	defaultProps: QuestionInfoDefaultPropsType
};
